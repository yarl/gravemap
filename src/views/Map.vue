<template>
  <div class="columns is-gapless">
    <div class="column map-container">
      <v-map ref="map"
          :zoom=16
          :center="[38.8817, -77.0706]"
          @l-moveend="mapMoved">
        <v-tilelayer url="http://maps.wikimedia.org/osm-intl/{z}/{x}/{y}.png"></v-tilelayer>
        <v-marker-cluster>
          <v-marker v-for="point in graves"
            :key="point.id"
            :options="point"
            :lat-lng="point.coordinates"
            :icon="getIcon(point)"
            @l-mouseover="showPopup(point)"
            @l-mouseout="closePopup(point)"
            @l-click="showModal(point)"
          />
        </v-marker-cluster>
      </v-map>
      <!-- <b-loading :active.sync="isLoading" :canCancel="false"></b-loading> -->
    </div>
    <div class="column is-narrow">
      <gr-person-list :persons="graves"></gr-person-list>
    </div>
    <section>
      <b-modal :active.sync="isModal" :width="640">
        <div class="card" v-if="modalPerson">
          <div class="card-image">
            <figure class="image is-4by3">
              <h2 class="title"
                  v-if="!modalPerson.graveImageURL">
                Grave photo is missing
              </h2>
              <a v-if="modalPerson.graveImageURL"
                  :href="`//commons.wikimedia.org/wiki/File:${modalPerson.graveImage}`"
                  target="_blank">
                <img :src="modalPerson.graveImageURL" alt="Image">
              </a>
            </figure>
          </div>
          <div class="card-content">
            <div class="media">
              <div class="media-left">
                <figure class="image is-48x48">
                  <a class="image is-48x48" layout="row center-center"
                      v-if="modalPerson.imageURL"
                      :href="`//commons.wikimedia.org/wiki/File:${modalPerson.image}`"
                      target="_blank">
                    <img :src="modalPerson.imageURL" alt="Image">
                  </a>
                </figure>
              </div>
              <div class="media-content">
                <div layout="row center-justify">
                  <p class="title is-4">{{ modalPerson.name.value }}</p>
                  <a class="wikidata-link"
                      :href="`//www.wikidata.org/wiki/${modalPerson.id}`"
                      target="_blank">
                    <b-icon icon="link"></b-icon>
                  </a>
                </div>
                <p class="subtitle is-6">({{ modalPerson.birthDate | moment("YYYY") }}–{{ modalPerson.deathDate | moment("YYYY") }})</p>
              </div>
            </div>

            <div class="content">
              {{ modalPerson.description && modalPerson.description.value }}
            </div>
          </div>
        </div>
      </b-modal>
    </section>
  </div>
</template>

<script>
  import L from 'leaflet';

  import Grave from '@/models/Grave';
  import PersonList from '@/components/PersonList';
  import Wikidata from '@/services/wikidata';

  import store from '@/store';
  import redIcon from '@/assets/marker_red.png';
  import greenIcon from '@/assets/marker_green.png';

  let map = null;
  let popup = null;
  let popupTimeout = null;
  let router = null;
  const wikidata = new Wikidata();

  /**
   * Gets data from SPARQL endpoint
   */
  function getData(query) {
    store.commit('load');
    return wikidata
      .runQuery(query)
      .then((response) => {
        store.commit('unload');
        return response.data.results.bindings;
      })
      .catch((err) => {
        store.commit('unload');
        console.error('Error getting data from SPARQL endpoint!', err);
        return [];
      });
  }

  function getIcon(point) {
    const Icon = L.Icon.extend({
      options: {
        iconUrl: point.graveImage ? greenIcon : redIcon,
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
    const center = map.getCenter();
    const zoom = map.getZoom();
    const params = [center.lat.toFixed(6), center.lng.toFixed(6), `${zoom}z`];

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
        this.graves = data
          .filter(
            (element, index, array) =>
            array.findIndex(t => t.person.value === element.person.value) === index)
          .map(grave => new Grave(grave));
        console.info('Graves loaded:', this.graves);
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

  function showModal(point) {
    store.commit('setSelectedPerson', point);
    store.commit('showModal');
  }

  export default {
    components: {
      'gr-person-list': PersonList,
    },
    data() {
      return {
        graves: [],
      };
    },
    computed: {
      isLoading() { return store.state.isLoading; },
      isModal: {
        get: () => store.state.isModal,
        set: value => store.commit('setModal', value),
      },
      modalPerson() { return store.state.selectedPerson; },
    },
    methods: { getIcon, mapMoved, showPopup, closePopup, showModal, initMapPosition },
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


  .modal.is-active {
    z-index: 1000;
    cursor: auto;
  }
  .modal .image {
    background: #ccc;
  }
  .modal .image .title {
    position: absolute;
    top: 25%;
    left: 25%;
    opacity: .75;
  }
  .modal .image img {
    width: auto;
    height: auto;
    max-width: 100%;
    max-height: 100%;
    margin: auto;
  }
  .modal .card .title.is-4 {
    margin-bottom: 0;
  }
</style>
