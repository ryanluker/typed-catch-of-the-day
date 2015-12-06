interface HelpersInterface {
  formatPrice(cents: number);
  rando(arr: Array<string>);
  slugify(text: string);
  getFunName();
}

class helpers implements HelpersInterface {
  /**
   * Takes cents and returns dollar
   * @param {Number} cents - cents value as a number
   * @returns {String} string of dollars based on cents
   */
  formatPrice(cents: number) {
    return '$' + ( (cents / 100).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") );
  }
  /**
   * Takes an array and returns a random one
   * @param {Array<string>} arr - array of strings
   * @returns {String} one element from the given array of strings
   */
  rando(arr: Array<string>) {
    return arr[Math.floor(Math.random() * arr.length)];
  }

  /**
   * Takes a string and removes human readable bits
   * @param {String} text - text to become simpler
   * @returns {string} slug form of string
   */
  slugify(text: string) {
    return text.toString().toLowerCase()
      .replace(/\s+/g, '-')           // Replace spaces with -
      .replace(/[^\w\-]+/g, '')       // Remove all non-word chars
      .replace(/\-\-+/g, '-')         // Replace multiple - with single -
      .replace(/^-+/, '')             // Trim - from start of text
      .replace(/-+$/, '');            // Trim - from end of text
  }

  /**
   * Uses a library of words to return a 3 word combo
   * @returns {String} A string containing 3 random words
   */
  getFunName() {
    var adjectives = ['adorable', 'beautiful', 'clean', 'drab', 'elegant', 'fancy', 'glamorous', 'handsome', 'long', 'magnificent', 'old-fashioned', 'plain', 'quaint', 'sparkling', 'ugliest', 'unsightly', 'angry', 'bewildered', 'clumsy', 'defeated', 'embarrassed', 'fierce', 'grumpy', 'helpless', 'itchy', 'jealous', 'lazy', 'mysterious', 'nervous', 'obnoxious', 'panicky', 'repulsive', 'scary', 'thoughtless', 'uptight', 'worried'];

    var nouns = ['women', 'men', 'children', 'teeth', 'feet', 'people', 'leaves', 'mice', 'geese', 'halves', 'knives', 'wives', 'lives', 'elves', 'loaves', 'potatoes', 'tomatoes', 'cacti', 'foci', 'fungi', 'nuclei', 'syllabuses', 'analyses', 'diagnoses', 'oases', 'theses', 'crises', 'phenomena', 'criteria', 'data'];

    return `${this.rando(adjectives)}-${this.rando(adjectives)}-${this.rando(nouns)}`;
  }
}

export default helpers;
