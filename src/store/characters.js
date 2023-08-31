import { defineStore } from 'pinia'
import { getCharacters } from '@/api/index'

export const useCharactersStore = defineStore('characters', {
  state: () => ({
    characters: [],
    page: 1,
    itemsPerPage: 20,
    totalCharacters: 0,

    /* Search parameters */
    charactersAreLoading: false,
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
      this.charactersAreLoading = true

      const requestParams = {
        name: this.name,
        page: this.page,
        itemsPerPage: this.itemsPerPage,
      }
      
      if (this.comics) {
        requestParams.comics = this.comics.id
      }

      if (this.series) {
        requestParams.series = this.series.id
      }
    
      getCharacters(requestParams)
        .then(res => {
          this.characters = res.results
          this.totalCharacters = res.total
        })
        .catch(err => console.log(err))
        .finally(() => { this.charactersAreLoading = false })
    } 
  }
})
