<template>
  <nav class="navbar has-shadow">
    <div class="container is-fluid">
      <div class="navbar-brand">
        <router-link class="navbar-item" to="/">
          <strong>graves.wiki</strong>
        </router-link>
      </div>
      <div class="navbar-brand">
        <b-autocomplete
            placeholder="Search Town or City"
            field="title"
            v-model="name"
            :data="data"
            :loading="isFetching"
            @input="getAsyncData"
            @select="setPlace">

          <template slot-scope="props">
            <div class="media">
              <div class="media-content">
                {{ props.option.display_name }}
                <br>
                <small>
                  {{ props.option.type }}
                </small>
              </div>
            </div>
          </template>
        </b-autocomplete>
      </div>

      <div class="navbar-menu">
        <div class="navbar-end">
          <router-link class="navbar-item" to="/about">
            About
          </router-link>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
  import debounce from 'debounce';

  import Osm from '@/services/osm';

  let router = null;
  const OSM = new Osm();

  function getPlaces() {
    this.data = [];
    this.isFetching = true;

    OSM
      .search(this.name)
      .then(({ data }) => {
        this.data = data;
        this.isFetching = false;
      })
      .catch(() => {
        this.isFetching = false;
      });
  }

  function setPlace(place) {
    if (place) {
      const params = [place.lat, place.lon, '15z'];
      router.push({
        name: 'Map',
        params: { position: `@${params.join(',')}` },
      });
    }
  }

  const getAsyncData = debounce(getPlaces, 500);

  export default {
    data() {
      return {
        data: [],
        name: '',
        selected: null,
        isFetching: false,
      };
    },
    methods: { getAsyncData, setPlace },
    mounted: function mounted() {
      router = this.$router;
    },
  };
</script>

<style scoped>
  .navbar {
    z-index: 1000;
  }
  .autocomplete {
    margin: 8px;
  }
</style>
