import { defineStore } from 'pinia'
import { getCharacters } from '@/api/index'

export const useCharactersStore = defineStore('characters', {
  state: () => ({
    characters: [],
    page: 1,
    itemsPerPage: 20,
    totalCharacters: 0,

    /* Search parameters */
    searchName: ''
  }),

  getters: {
    pageNumber(state) {
      return Math.ceil(state.totalCharacters / state.itemsPerPage)
    }
  },

  actions: {
    fetchCharacters() {
      const params = {
        name: this.searchName,
        page: this.page,
        itemsPerPage: this.itemsPerPage
      }
    
      getCharacters(params)
        .then(res => {
          this.characters = res.results
          this.totalCharacters = res.total
        })
        .catch(err => console.log(err))
    } 
  }
})
