import Vue from 'vue';
import Router from 'vue-router';
import Vue2Leaflet from 'vue2-leaflet';
import Vue2LeafletMarkerCluster from 'vue2-leaflet-markercluster';
import VueMoment from 'vue-moment';
import Buefy from 'buefy';

import About from '@/views/About';
import Map from '@/views/Map';

import App from './App';

Vue.config.productionTip = false;

Vue.use(Buefy);
Vue.use(Router);
Vue.use(VueMoment);

Vue.component('v-map', Vue2Leaflet.Map);
Vue.component('v-tilelayer', Vue2Leaflet.TileLayer);
Vue.component('v-marker', Vue2Leaflet.Marker);
Vue.component('v-marker-cluster', Vue2LeafletMarkerCluster);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router: new Router({
    routes: [
      { path: '/', redirect: '/map/@40.401724,-3.728957,16z' },
      { path: '/map', redirect: '/map/@40.401724,-3.728957,16z' },
      { path: '/map/:position', name: 'Map', component: Map },
      { path: '/about', name: 'About', component: About },
    ],
  }),
  template: '<App/>',
  components: { App },
});
