<template>
  <nav class="panel">
    <gr-person-panel
      v-for="person in persons"
      :key="person.id"
      :person="person">
    </gr-person-panel>
  </nav>
</template>

<script>
import PersonPanel from '@/components/PersonPanel';

export default {
  components: {
    'gr-person-panel': PersonPanel,
  },
  props: ['persons'],
  data() {
    return {};
  },
};
</script>

<style scoped>
  .panel {
    width: 400px;
    height: calc(100vh - 52px);
    overflow: auto;
  }
</style>
