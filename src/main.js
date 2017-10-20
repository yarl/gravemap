import Vue from 'vue';
import Router from 'vue-router';
import Vue2Leaflet from 'vue2-leaflet';
import Buefy from 'buefy';

import About from '@/views/About';
import Home from '@/views/Home';
import Map from '@/views/Map';

import App from './App';

Vue.config.productionTip = false;

Vue.use(Buefy);
Vue.use(Router);

Vue.component('v-map', Vue2Leaflet.Map);
Vue.component('v-tilelayer', Vue2Leaflet.TileLayer);
Vue.component('v-marker', Vue2Leaflet.Marker);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router: new Router({
    routes: [
      { path: '/', name: 'Map', component: Map },
      { path: '/about', name: 'About', component: About },
      { path: '/home', name: 'Home', component: Home },
    ],
  }),
  template: '<App/>',
  components: { App },
});
