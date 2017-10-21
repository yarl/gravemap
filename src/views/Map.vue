<template>
  <div class="columns is-gapless">
    <div class="column map-container">
      <v-map ref="map"
          :zoom=16
          :center="[38.8817, -77.0706]"
          @l-moveend="mapMoved">
        <v-tilelayer url="http://maps.wikimedia.org/osm-intl/{z}/{x}/{y}.png"></v-tilelayer>
        <v-marker v-for="point in graves"
          :key="point.id"
          :options="point"
          :lat-lng="point.coordinates"
          :icon="getIcon(point)"
          v-on:l-mouseover="showPopup(point)"
          v-on:l-mouseout="closePopup(point)"
        />
      </v-map>
      <!-- <b-loading :active.sync="isLoading" :canCancel="false"></b-loading> -->
    </div>
    <div class="column is-narrow">
      <gr-person-list :persons="graves"></gr-person-list>
    </div>
  </div>
</template>

<script>
  import L from 'leaflet';
  import Grave from '@/models/Grave';
  import PersonList from '@/components/PersonList';
  import Wikidata from '@/services/wikidata';

  import iconUrl from '@/assets/marker.png';

  let map = null;
  let popup = null;
  let popupTimeout = null;
  let router = null;
  const wikidata = new Wikidata();

  /**
   * Gets data from SPARQL endpoint
   */
  function getData(query) {
    this.isLoading = true;
    return wikidata
      .runQuery(query)
      .then((response) => {
        this.isLoading = false;
        return response.data.results.bindings;
      })
      .catch((err) => {
        this.isLoading = false;
        console.error('Error getting data from SPARQL endpoint!', err);
        return [];
      });
  }

  function getIcon() {
    const Icon = L.Icon.extend({
      options: {
        iconUrl,
        iconSize: [12, 12],
        iconAnchor: [6, 6],
      },
    });
    return new Icon();
  }

  /**
   * Computes SPARQL query based on map corners
   */
  function getQuery() {
    const bbox = map.getBounds();
    const cornerWest = `"Point(${bbox.getSouthWest().lng} ${bbox.getSouthWest().lat})"^^geo:wktLiteral`;
    const cornerEast = `"Point(${bbox.getNorthEast().lng} ${bbox.getNorthEast().lat})"^^geo:wktLiteral`;

    return `SELECT ?person ?personLabel ?personDescription ?coord ?graveImage ?image ?birthDate ?deathDate
      WHERE {
        SERVICE wikibase:box {
          ?statement pq:P625 ?coord.
          bd:serviceParam wikibase:cornerWest ${cornerWest}.
          bd:serviceParam wikibase:cornerEast ${cornerEast}.
        }
        ?person p:P119 ?statement; wdt:P31 wd:Q5.
        OPTIONAL { ?person wdt:P1442 ?graveImage }
        OPTIONAL { ?person wdt:P18 ?image }
        OPTIONAL { ?person wdt:P569 ?birthDate }
        OPTIONAL { ?person wdt:P570 ?deathDate }
        SERVICE wikibase:label { bd:serviceParam wikibase:language "en". }
      }
      ORDER BY ?personLabel`;
  }

  /**
   * Updates URL based on map state
   */
  function updateURL() {
    const params = [
      map.getCenter().lat,
      map.getCenter().lng,
      `${map.getZoom()}z`,
    ];

    router.push({
      name: 'Map',
      params: { position: `@${params.join(',')}` },
    });
  }

  /**
   * Sets map position based on URL address
   */
  function initMapPosition() {
    try {
      const [lat, lng, zoom] = this.$route.params.position
        .slice(1, -1)
        .split(',')
        .map(value => parseFloat(value));
      map.setView({ lat, lng }, zoom);
    } catch (err) {
      this.err = err;
    }
  }

  /**
   * Action fired after map move
   */
  function mapMoved() {
    const query = getQuery();

    updateURL();
    if (map.getZoom() < 10) { return; }

    getData
      .apply(this, [query])
      .then((data) => {
        this.graves = [];
        setTimeout(() => {
          this.graves = data
            .map(grave => new Grave(grave));
          console.info('Graves loaded:', this.graves);
        });
      });
  }

  /**
   * Shows popup
   */
  function showPopup(point) {
    popupTimeout = setTimeout(() => {
      popup = this.$refs.map.$children
        .filter(element => element.mapObject.options.id === point.id)
        .pop()
        .mapObject;

      popup
        .bindPopup(point.name.value)
        .openPopup();
    }, 200);
  }

  function closePopup() {
    if (popup) { popup.closePopup(); }
    if (popupTimeout) { clearTimeout(popupTimeout); }
  }

  export default {
    components: {
      'gr-person-list': PersonList,
    },
    data() {
      return {
        graves: [],
        isLoading: false,
      };
    },
    methods: { getIcon, mapMoved, showPopup, closePopup, initMapPosition },
    mounted: function mounted() {
      map = this.$refs.map.mapObject;
      router = this.$router;

      this.initMapPosition();
    },
  };
</script>

<style scoped>
  .columns.is-gapless {
    margin-bottom: 0;
  }
  .map-container {
    height: calc(100vh - 52px);
    padding-bottom: 0;
  }
</style>
