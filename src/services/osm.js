import Axios from 'axios';

export default class osm {

  constructor() {
    this.nominatimUrl = 'https://nominatim.openstreetmap.org';
  }

  /**
   *
   */
  search(text, params) {
    return Axios.get(this.nominatimUrl, {
      params: Object.assign({}, {
        q: text,
        dedupe: 1,
        format: 'json',
      }, params),
    });
  }
}
