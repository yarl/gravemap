<template>
  <nav class="panel">
    <div class="panel-header" v-if="!isLoading">
      {{ persons.length }}
      {{ persons.length === 1 ? 'grave' : 'graves' }}
    </div>
    <div class="panel-header" v-if="isLoading">Loading...</div>
    <div class="panel-list">
      <gr-person-panel
        v-for="person in persons"
        :key="person.id"
        :person="person">
      </gr-person-panel>
      <b-loading :active.sync="isLoading"></b-loading>
    </div>
  </nav>
</template>

<script>
  import PersonPanel from '@/components/PersonPanel';

  import store from '@/store';

  export default {
    components: {
      'gr-person-panel': PersonPanel,
    },
    props: ['persons'],
    computed: {
      isLoading() { return store.state.isLoading; },
    },
  };
</script>

<style scoped>
  .panel {
    width: 400px;
    height: calc(100vh - 52px);
    overflow: auto;
  }

  .panel-header {
    border: 1px solid #dbdbdb;
    border-width: 0 0 2px;
    padding: 1em .75em;
    vertical-align: top;
    font-weight: 600;
  }

  .panel-list {
    position: relative;
  }

  .loading-overlay.is-active {
    position: absolute;
  }
</style>
