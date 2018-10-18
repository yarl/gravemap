<template>
  <a class="panel-block">
    <section>
      <article class="media" @click="showModal">
        <div class="media-left">
          <figure class="image is-64x64">
            <a class="image is-64x64" layout="row center-center"
                v-if="person.imageURL"
                :href="`//commons.wikimedia.org/wiki/File:${person.image}`"
                target="_blank">
              <img :src="person.imageURL" alt="Image">
            </a>
          </figure>
        </div>
        <div class="media-content">
          <div class="content">
            <p>
              <a class="wikidata-link"
                  :href="`//www.wikidata.org/wiki/${person.id}`"
                  target="_blank">
                <b-icon icon="link"></b-icon>
              </a>
              <strong>{{ person.name.value }}</strong>
              <small>
                (<span v-if="person.birthDate">{{ person.birthDate | moment("YYYY") }}</span>
                <span v-else>?</span>
                –
                <span v-if="person.deathDate">{{ person.deathDate | moment("YYYY") }}</span>
                <span v-else>?</span>)
              </small>
              <br />
              {{ person.description && person.description.value }}
            </p>
          </div>
        </div>
      </article>
    </section>
  </a>
</template>

<script>
  import store from '@/store';

  function showModal() {
    console.log(this.person);
    store.commit('setSelectedPerson', this.person);
    store.commit('showModal');
  }

  export default {
    props: ['person'],
    methods: { showModal },
  };
</script>

<style scoped>
  .panel-block {
    border-left: 0;
    border-right: 0;
  }
  .panel-block:first-child {
    border-top: 0;
  }
  .image {
    background: #ccc;
  }
  .image .title {
    position: absolute;
    top: 25%;
    left: 25%;
    opacity: .75;
  }
  .image img {
    width: auto;
    height: auto;
    max-width: 100%;
    max-height: 100%;
    margin: auto;
  }
  .wikidata-link {
    vertical-align: text-bottom;
  }
</style>
