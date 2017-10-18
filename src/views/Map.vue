<template>
  <div class="columns">
    <div class="column map-container">
      <v-map :zoom=16 :center="[38.8817, -77.0706]">
        <v-tilelayer url="http://maps.wikimedia.org/osm-intl/{z}/{x}/{y}.png"></v-tilelayer>
      </v-map>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Map',
  data() {
    return {};
  },
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