const fetch = require('node-fetch')
const Dataloader = require('dataloader')
const curry = require('lodash.curry')
const QuickLru = require('quick-lru')

const BASE_URL = 'https://swapi.co/api'

const dataloader = new Dataloader(
  ids => Promise.all(ids.map(id => request(id))),
  { cacheMap: new QuickLru({ maxSize: 500 }) }
)

const list = async (resource, transform = (o => o)) => {
  const list = []
  let next = null
  while (true) {
    const { results, next: url } = await request(next || `${BASE_URL}/${resource}`)

    list.push(
      ...results.map(async item => {
        item = await transform(item)
        dataloader.prime(item.url, item)
        return item
      })
    )
    if (url) {
      next = url
      continue
    }
    return Promise.all(list)
  }
}

const getByUrl = dataloader.load.bind(dataloader)
const getById = curry((resource, id) => dataloader.load(`${BASE_URL}/${resource}:${id}`))

async function request (url) {
  const response = await fetch(url)
  if (response.ok) return response.json()
  throw new Error('Invalid request')
}

exports.getById = getById
exports.getByUrl = getByUrl
exports.list = list
exports.request = request
