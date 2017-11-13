<template>
  <nav class="navbar has-shadow">
    <div class="container is-fluid">
      <div class="navbar-brand">
        <router-link class="navbar-item" to="/">
          <strong>graves.wiki</strong>
        </router-link>
      </div>
      <div class="navbar-brand">
        <b-field>
          <b-autocomplete
              placeholder="Search"
              field="title"
              v-model="name"
              :data="data"
              :loading="isFetching"
              @input="getAsyncData"
              @select="option => selected = option">

            <template slot-scope="props">
              <div class="media">
                <div class="media-content">
                  {{ props.option.display_name }}
                  <br>
                  <small>
                    type {{ props.option.type }}
                  </small>
                </div>
              </div>
            </template>
          </b-autocomplete>
        </b-field>
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

  const OSM = new Osm();

  function getMovies() {
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

  const getAsyncData = debounce(getMovies, 500);

  export default {
    data() {
      return {
        data: [],
        name: '',
        selected: null,
        isFetching: false,
      };
    },
    methods: { getAsyncData },
  };
</script>

<style scoped>
  .navbar {
    z-index: 1000;
  }
</style>
