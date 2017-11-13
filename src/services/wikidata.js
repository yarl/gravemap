import Axios from 'axios';

export default class wikidata {

  constructor() {
    this.wikidataUrl = 'https://www.wikidata.org/w/api.php';
    this.sparqlUrl = 'https://query.wikidata.org/sparql';
  }

  /**
   *
   */
  runQuery(query) {
    return Axios.get(this.sparqlUrl, {
      params: { query },
    });
  }

  runQueries(queries) {
    return Axios.all(queries
      .map(query => Axios.get(this.sparqlUrl, {
        params: { query },
      })));
  }
}
