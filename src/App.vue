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
  @import "~flex-layout-attribute/css/flex-layout-attribute.css";

  .marker-cluster div {
    width: 100%;
    height: 100%;
    text-align: center;
    border-radius: 50%;
    align-items: center;
    justify-content: center;
    display: flex;
    font-weight: bold;
    color: white;
    background-color: white;
    opacity: .8;
  }

  .chart {
    margin: 0 auto;
    transform: rotate(-90deg);
    background: radial-gradient(#cc0300 0%, #cc0300 50%, transparent 85%);
    fill: #cc0300;
    border-radius: 50%;
    border: 2px solid white;
    display: block;
  }

  .chart-slice {
    stroke: #51af60;
    stroke-dasharray: 0 158;
    transition: stroke-dasharray .3s ease;
  }

  .chart-count {
    position: absolute;
    z-index: 210;
  }
</style>
