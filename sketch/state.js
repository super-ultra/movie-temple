class State {

  constructor() {
    this.movies = [];
    this.genres = new Map();
  }

  preload() {
    this.rawGenres = loadJSON("data/genres.json");
    this.rawMovies = loadJSON("data/movie-history.json");
  }

  setup() {
    for (const [index, rawGenre] of Object.entries(this.rawGenres)) {
      const genre = new Genre(rawGenre["id"], rawGenre["color"], 0, random(width), random(height));
      this.genres.set(genre.id, genre);
    }

    for (const [index, rawMovie] of Object.entries(this.rawMovies)) {
      const movie = new Movie(rawMovie["title"], rawMovie["genres"], random(width), random(height));
      this.movies.push(movie)

      for (const genreId of rawMovie["genres"]) {
        this.genres.get(genreId).movieCount += 1;
      }
    }
  }
}
