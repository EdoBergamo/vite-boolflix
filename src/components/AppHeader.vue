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
        } else if (languageCode === 'uk') {
          return "https://flagcdn.com/24x18/ua.png";
        } else if (languageCode === 'da') {
          return "https://flagcdn.com/24x18/dk.png";
        } else if (languageCode === 'ja') {
          return "https://flagcdn.com/24x18/jp.png";
        } else if (languageCode === 'ko') {
          return "https://flagcdn.com/24x18/kr.png";
        } else if (languageCode === 'zh') {
          return "https://flagcdn.com/24x18/cn.png";
        } else if (languageCode === 'hi') {
          return "https://flagcdn.com/24x18/in.png";
        } else if (languageCode === 'el') {
          return "https://flagcdn.com/24x18/gr.png";
        } else if (languageCode === 'cs') {
          return "https://flagcdn.com/24x18/pt.png";
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
    <header>
      <div class="container flex items-center gap-2 justify-between">
        <div class="items-center header-first flex gap-2">
          <div class="logo">
            <img src="https://upload.wikimedia.org/wikipedia/commons/7/7a/Logonetflix.png" class="img" alt="">
          </div>

          <ul class="navbar flex gap-2 items-center">
            <li class="link-nav"><a href="https://netflix.com" target="_blank">Home</a></li>
            <li class="link-nav"><a href="https://www.netflix.com/browse/genre/34399" target="_blank">Movies</a></li>
            <li class="link-nav"><a href="https://www.netflix.com/browse/genre/83" target="_blank">Series</a></li>
          </ul>
        </div>

        <div class="flex">
          <label for="search"></label>
          <input v-model="searchQuery" id="search" placeholder="Search..." autocomplete="off" />
          <button @click="searchMovies">Search</button>
        </div>
      </div>
    </header>

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

.container {
  height: 100px;
  background-color: rgb(27, 26, 26);
  padding: 0 40px;
  .logo {
    width: 90px;
  }

  .link-nav {
    line-height: 80px;
    border-bottom: 2px inset transparent;
    text-align: center;
    justify-content: center;
    color: white;

    &:hover {
      border-bottom: 2px inset #ff0000;
      color: rgb(255, 0, 0);
    }
  }
}

.goldenStar {
  color: #daa520;
}
.grayStar {
  color: #808080;
}
</style>
