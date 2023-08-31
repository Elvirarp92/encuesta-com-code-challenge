import axios from 'axios';

/* Axios instance */

const axiosInstance = axios.create({
  baseURL: 'https://gateway.marvel.com/v1/public/',
  params: {
    apikey: import.meta.env.VITE_APP_MARVEL_PUBLIC_KEY
  }
})

/* Helper functions */
const calculateOffset = (page, itemsPerPage) => page && itemsPerPage ? (page - 1) * itemsPerPage : 0

/* API calls */

const getCharacters = (params) => {
  const { name, page, itemsPerPage, series, comics } = { ...params }

  const requestParams = {
    offset: calculateOffset(page, itemsPerPage),
    limit: itemsPerPage,
  }

  if (name) {
    requestParams.nameStartsWith = name
  }
  
  if (series) {
    requestParams.series = series
  }

  if (comics) {
    requestParams.comics = comics
  }

  return new Promise((resolve, reject) => {
    axiosInstance.get('characters', {
      params: requestParams
    })
      .then(res => resolve(res.data.data))
      .catch(err => reject(err))
  })
}

const getCharacter = id => {
  return new Promise((resolve, reject) => {
    axiosInstance.get(`characters/${id}`)
      .then(res => resolve(res.data.data.results[0]))
      .catch(err => reject(err))
  })
}

const getCharacterSeries = params => {
  const {characterId, page, itemsPerPage} = {...params}
  return new Promise((resolve, reject) => {
    axiosInstance.get(`characters/${characterId}/series`, {
      params: {
        offset: calculateOffset(page, itemsPerPage),
        limit: itemsPerPage || 20,
      }
    })
      .then(res => resolve(res.data.data))
      .catch(err => reject(err))
  })
}

const getCharacterComics = params => {
  const {characterId, page, itemsPerPage} = {...params}
  return new Promise((resolve, reject) => {
    axiosInstance.get(`characters/${characterId}/comics`, {
      params: {
        offset: calculateOffset(page, itemsPerPage),
        limit: itemsPerPage,
      }
    })
      .then(res => resolve(res.data.data))
      .catch(err => reject(err))
  })
}

const getSeries = params => {
  const { title } = { ...params }

  const requestParams = {}

  if (title) {
    requestParams.titleStartsWith = title
  }

  return new Promise((resolve, reject) => {
    axiosInstance.get('series', {
      params: requestParams
    })
      .then(res => resolve(res.data.data))
      .catch(err => reject(err))
  })
}

const getComics = params => {
  const { title } = { ...params }

  const requestParams = {}

  if (title) {
    requestParams.titleStartsWith = title
  }

  return new Promise((resolve, reject) => {
    axiosInstance.get('comics', {
      params: requestParams
    })
      .then(res => resolve(res.data.data))
      .catch(err => reject(err))
  })
}

export {
  getCharacters,
  getCharacter,
  getCharacterSeries,
  getCharacterComics,
  getSeries,
  getComics,
}