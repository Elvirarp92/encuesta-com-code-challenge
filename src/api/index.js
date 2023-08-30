import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://gateway.marvel.com/v1/public/',
  params: {
    apikey: import.meta.env.VITE_APP_MARVEL_PUBLIC_KEY
  }
})

const getCharacters = (params) => {
  const { page, itemsPerPage } = { ...params }
  return new Promise((resolve, reject) => {
    axiosInstance.get('characters', {
      params: {
        offset: page - 1,
        limit: itemsPerPage,
      }
    })
      .then(res => resolve(res.data.data))
      .catch(err => reject(err))
  })
}

export {
  getCharacters,
}