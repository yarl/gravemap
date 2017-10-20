<template>
  <div class="columns">
    <div class="column map-container">
      <v-map ref="map"
          :zoom=16
          :center="[38.8817, -77.0706]"
          @l-moveend="mapMoved">
        <v-tilelayer url="http://maps.wikimedia.org/osm-intl/{z}/{x}/{y}.png"></v-tilelayer>
      </v-map>
    </div>
  </div>
</template>

<script>
  import Wikidata from '@/services/wikidata';

  function mapMoved() {
    const bbox = this.$refs.map.mapObject.getBounds();
    const cornerWest = `"Point(${bbox.getSouthWest().lng} ${bbox.getSouthWest().lat})"^^geo:wktLiteral`;
    const cornerEast = `"Point(${bbox.getNorthEast().lng} ${bbox.getNorthEast().lat})"^^geo:wktLiteral`;

    const request = `SELECT ?person ?personLabel ?image ?coord
      WHERE {
        SERVICE wikibase:box {
          ?statement pq:P625 ?coord.
          bd:serviceParam wikibase:cornerWest ${cornerWest}.
          bd:serviceParam wikibase:cornerEast ${cornerEast}.
        }
        ?person p:P119 ?statement; wdt:P31 wd:Q5.
        OPTIONAL { ?person wdt:P1442 ?image }
        SERVICE wikibase:label { bd:serviceParam wikibase:language "en". }
      }
      ORDER BY ?personLabel`;

    this.wikidata
      .runQuery(request)
      .then((data) => { console.log(data); });
  }

  export default {
    name: 'Map',
    data() {
      return {
        wikidata: new Wikidata(),
      };
    },
    methods: { mapMoved },
  };
</script>

<style scoped>
  .columns {
    margin-bottom: 0;
  }
  .map-container {
    height: calc(100vh - 80px);
    padding-bottom: 0;
  }
</style>
