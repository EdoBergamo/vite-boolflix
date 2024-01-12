import { reactive } from "vue";

export const store = reactive({
  endpointMovie: 'https://api.themoviedb.org/3/search/movie?',
  endpointSeries: 'https://api.themoviedb.org/3/search/tv?',
  apiKey: process.env.API_KEY
});