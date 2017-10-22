<template>
  <a class="panel-block">
    <section>
      <article class="media" @click="showModal = true">
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
              <small>({{ person.birthDate | moment("YYYY") }}–{{ person.deathDate | moment("YYYY") }})</small>
              <br>
              {{ person.description && person.description.value }}
            </p>
          </div>
        </div>
      </article>
      <b-modal :active.sync="showModal" :width="640">
        <div class="card">
          <div class="card-image">
            <figure class="image is-4by3">
              <h2 v-if="!person.graveImageURL">no grave photo</h2>
              <img :src="person.graveImageURL"
                v-if="person.graveImageURL"
                alt="Image">
            </figure>
          </div>
          <div class="card-content">
            <div class="media">
              <div class="media-left">
                <figure class="image is-48x48">
                  <a class="image is-48x48" layout="row center-center"
                      v-if="person.imageURL"
                      :href="`//commons.wikimedia.org/wiki/File:${person.image}`"
                      target="_blank">
                    <img :src="person.imageURL" alt="Image">
                  </a>
                </figure>
              </div>
              <div class="media-content">
                <div layout="row center-justify">
                  <p class="title is-4">{{ person.name.value }}</p>
                  <a class="wikidata-link"
                      :href="`//www.wikidata.org/wiki/${person.id}`"
                      target="_blank">
                    <b-icon icon="link"></b-icon>
                  </a>
                </div>
                <p class="subtitle is-6">({{ person.birthDate | moment("YYYY") }}–{{ person.deathDate | moment("YYYY") }})</p>
              </div>
            </div>

            <div class="content">
              {{ person.description && person.description.value }}
            </div>
          </div>
        </div>
      </b-modal>
    </section>
  </a>
</template>

<script>
export default {
  props: ['person'],
  data() {
    return {
      showModal: false,
    };
  },
};
</script>

<style scoped>
  .panel-block {
    border-left: 0;
    border-right: 0;
  }
  .image {
    background: #ccc;
  }
  .image img {
    width: auto;
    height: auto;
    max-width: 100%;
    max-height: 100%;
  }
  .wikidata-link {
    vertical-align: text-bottom;
  }

  .modal.is-active {
    z-index: 1000;
    cursor: auto;
  }

  .card .title.is-4 {
    margin-bottom: 0;
  }
</style>
