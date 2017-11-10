<template>
  <div id="gravemap">
    <gr-navbar/>
    <router-view/>
    <!-- <gr-footer/> -->
  </div>
</template>

<script>
  import GrFooter from '@/components/Footer';
  import GrNavbar from '@/components/Navbar';

  export default {
    name: 'gravemap',
    components: { GrFooter, GrNavbar },
  };
</script>

<style>
  @import '~bulma/css/bulma.css';
  @import '~buefy/lib/buefy.css';

  @import "~leaflet/dist/leaflet.css";
  @import "~leaflet.markercluster/dist/MarkerCluster.css";
  @import "~leaflet.markercluster/dist/MarkerCluster.Default.css";
  @import "~flex-layout-attribute/css/flex-layout-attribute.css";
</style>
