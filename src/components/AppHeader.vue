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

      axios
        .get(movieUrl)
        .then((response) => (this.movies = response.data.results));
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

    <ul class="movie-list" v-if="movies.length > 0">
      <li class="movie-card" v-for="movie in movies" :key="movie.id">
        <h2>{{ movie.title }}</h2>
        <p>Titolo: {{ movie.original_title }}</p>
        <p>
          Lingua:
          <img :src="getLanguageFlagUrl(movie.original_language)" alt="Flag" />
        </p>
        <p>Voto: {{ movie.vote_average }}</p>
      </li>
    </ul>
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
</style>
