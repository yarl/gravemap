export default class Grave {

  id;
  coordinates;
  graveImage;

  image;
  name;
  description;
  birthDate;
  deathDate;

  constructor(grave) {
    this.id = grave.person.value
      .slice(31);

    try {
      const [lng, lat] = grave.coord.value
        .slice(6, -1)
        .split(' ')
        .map(value => parseFloat(value));
      this.coordinates = { lat, lng };
    } catch (err) {
      console.error('Wrong coordinates');
    }

    // images
    ['graveImage', 'image'].forEach((n) => {
      try {
        this[n] = decodeURIComponent(grave[n].value.slice(51));
      } catch (err) { /* safely ignore */ }
    });

    // dates
    ['birthDate', 'deathDate'].forEach((n) => {
      try {
        this[n] = new Date(grave[n].value);
      } catch (err) { /* safely ignore */ }
    });

    try {
      this.name = {
        value: grave.personLabel.value,
        lang: grave.personLabel['xml:lang'],
      };
    } catch (err) { /* safely ignore */ }

    try {
      this.description = {
        value: grave.personDescription.value,
        lang: grave.personDescription['xml:lang'],
      };
    } catch (err) { /* safely ignore */ }
  }

  get imageURL() {
    if (!this.image) { return null; }
    return [
      '//commons.wikimedia.org/w/index.php?title=',
      'Special:Redirect/file/',
      encodeURIComponent(this.image),
      '&width=',
      120,
    ].join('');
  }

  get graveImageURL() {
    if (!this.graveImage) { return null; }
    return [
      '//commons.wikimedia.org/w/index.php?title=',
      'Special:Redirect/file/',
      encodeURIComponent(this.graveImage),
      '&width=',
      640,
    ].join('');
  }
}
