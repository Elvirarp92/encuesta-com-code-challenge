import { defineStore } from 'pinia'
import { getCharacters } from '@/api/index'

export const useCharactersStore = defineStore('characters', {
  state: () => ({
    characters: [],
    page: 1,
    itemsPerPage: 20,
    totalCharacters: 0,

    /* Search parameters */
    name: '',
    comics: null,
    series: null,
  }),

  getters: {
    pageNumber(state) {
      return Math.ceil(state.totalCharacters / state.itemsPerPage)
    }
  },

  actions: {
    fetchCharacters() {
      const requestParams = {
        name: this.name,
        page: this.page,
        itemsPerPage: this.itemsPerPage,
        comics: this.comics,
        series: this.series,
      }
    
      getCharacters(requestParams)
        .then(res => {
          this.characters = res.results
          this.totalCharacters = res.total
        })
        .catch(err => console.log(err))
    } 
  }
})
