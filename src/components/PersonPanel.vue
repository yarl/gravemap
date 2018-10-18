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
              <img v-if="person.graveImage" :src="icons.greenIcon" alt="Grave image present">
              <img v-else :src="icons.redIcon" alt="Grave image missing">
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
  import redIcon from '@/assets/marker_red.png';
  import greenIcon from '@/assets/marker_green.png';

  function showModal() {
    console.log(this.person);
    store.commit('setSelectedPerson', this.person);
    store.commit('showModal');
  }

  export default {
    data() {
      return {
        icons: { redIcon, greenIcon },
      };
    },
    props: ['person'],
    methods: { showModal },
  };
</script>

<style scoped>
  .panel-block {
    position: relative;
    border-left: 0;
    border-right: 0;
  }
  .panel-block:first-child {
    border-top: 0;
  }
  .panel-block:hover .wikidata-link {
    display: inline;
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
    display: none;
    position: absolute;
    top: 6px;
    right: 10px;
    width: 30px;
    height: 30px;
    background: whitesmoke;
    border-radius: 50%;
    line-height: 27px;
    text-align: center;
  }
</style>
