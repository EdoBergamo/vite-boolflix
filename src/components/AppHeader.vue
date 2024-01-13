<script>
import axios from "axios";
import { store } from "../store";

export default {
  name: "Header",
  data() {
    return {
      store,
      searchQuery: "",
      movies: [],
      series: [],
      imageBaseUrl: "https://image.tmdb.org/t/p/",
      stars: [1, 2, 3, 4, 5],
    };
  },

  computed: {
    apiKey() {
      return this.store.apiKey;
    },

    getLanguageFlagUrl() {
      return (languageCode) => {
        if (languageCode === "en") {
          return "https://flagcdn.com/24x18/gb.png";
        }
        return `https://flagcdn.com/24x18/${languageCode}.png`;
      };
    },
  },

  methods: {
    async searchMovies() {
      const movieUrl = `${this.store.endpointMovie}api_key=${this.apiKey}&query=${this.searchQuery}`;
      const seriesUrl = `${this.store.endpointSeries}api_key=${this.apiKey}&query=${this.searchQuery}`;

      const movieResponse = await axios.get(movieUrl);
      this.movies = movieResponse.data.results.map((movie) => ({
        ...movie,
        poster_url: this.getImageUrl(movie.poster_path),
      }));

      const seriesResponse = await axios.get(seriesUrl);
      this.series = seriesResponse.data.results.map((serie) => ({
        ...serie,
        poster_url: this.getImageUrl(serie.poster_path),
      }));
    },

    getImageUrl(posterPath) {
      const imageSize = "w342";
      return posterPath
        ? `${this.imageBaseUrl}${imageSize}/${posterPath}`
        : null;
    },

    getStarVote(vote) {
      const averageVote = Math.round(vote / 2);

      const starsArray = Array(5)
        .fill("goldenStar", 0, averageVote)
        .fill("grayStar", averageVote);

      return starsArray;
    },
  },
};
</script>

<template>
  <div>
    <div class="search-bar">
      <input v-model="searchQuery" placeholder="Search..." autocomplete="off" />
      <button @click="searchMovies">Search</button>
    </div>

    <template
      v-for="(mediaList, mediaType) in { movies: movies, series: series }"
      :key="mediaType"
    >
      <ul :class="[`${mediaType}-list`]">
        <li
          v-for="media in mediaList"
          :key="media.id"
          :class="[`${mediaType}-card`]"
        >
          <h2>{{ media.title || media.name }}</h2>
          <img v-if="media.poster_url" :src="media.poster_url" alt="Poster" />
          <p>Titolo: {{ media.original_title || media.original_name }}</p>
          <p>
            Lingua:
            <img
              :src="getLanguageFlagUrl(media.original_language)"
              alt="Flag"
            />
          </p>
          <p>Voto: {{ media.vote_average }}</p>
          <i
            class="bi-star-fill"
            v-for="(star, index) in getStarVote(media.vote_average)"
            :class="star"
            :key="index"
          ></i>
        </li>
      </ul>
    </template>
  </div>
</template>

<style lang="scss" scoped>
@use "../styles/general.scss";
@use "../styles/partials/variables" as *;

* {
  background: #000;
  color: $bg-gray-200;
}

.container {
  .row {
    justify-content: space-between;
    align-items: center;
  }
}

.goldenStar {
  color: #daa520;
}
.grayStar {
  color: #808080;
}
</style>
