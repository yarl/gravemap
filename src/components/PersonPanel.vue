<template>
  <a class="panel-block">
    <article class="media">
      <div class="media-left">
        <figure class="image is-64x64" layout="row center-center">
          <img :src="person.imageURL" v-if="person.imageURL" alt="Image">
        </figure>
      </div>
      <div class="media-content">
        <div class="content">
          <p>
            <strong>{{ person.name.value }}</strong>
            <small>({{ person.birthDate | moment("YYYY") }}–{{ person.deathDate | moment("YYYY") }})</small>
            <br>
            {{ person.description && person.description.value }}
          </p>
        </div>
      </div>
    </article>
  </a>
</template>

<script>
export default {
  props: ['person'],
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
</style>
