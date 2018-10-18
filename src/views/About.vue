<template>
  <section class="section">
    <div class="container">
      <h1 class="title">About</h1>
      <h2 class="subtitle">
        This web application is using Wikidata data using SPARQL query listed below. You can find source code <a href="http://github.com/yarl/gravemap">on GitHub</a>.
      </h2>
      <code>SELECT ?person ?personLabel ?personDescription ?graveyard ?graveyardLabel ?coord ?graveImage ?image ?birthDate ?deathDate
  WHERE {
    SERVICE wikibase:box {
      ?statement pq:P625 ?coord.
      bd:serviceParam wikibase:cornerWest &lt;coordinates&gt;.
      bd:serviceParam wikibase:cornerEast &lt;coordinates&gt;.
    }
    ?person p:P119 ?statement; wdt:P31 wd:Q5.
    ?person wdt:P119 ?graveyard.
    OPTIONAL { ?person wdt:P1442 ?graveImage }
    OPTIONAL { ?person wdt:P18 ?image }
    OPTIONAL { ?person wdt:P569 ?birthDate }
    OPTIONAL { ?person wdt:P570 ?deathDate }
    SERVICE wikibase:label { bd:serviceParam wikibase:language "en". }
  }
  ORDER BY ?personLabel
</code>
    </div>
  </section>
</template>

<script>
export default {
  name: 'About',
  data() {
    return {};
  },
};
</script>

<style scoped>
  p {
    margin-bottom: .5rem;
  }
  code {
    white-space: pre;
  }
</style>
