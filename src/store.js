import { reactive } from "vue";

export const store = reactive({
  endpointMovie: 'https://api.themoviedb.org/3/search/movie?',
  endpointSeries: 'https://api.themoviedb.org/3/search/tv?',
  apiKey: '6a3ead2c707943703b848ba1f4baa811',
  flags: true,
});