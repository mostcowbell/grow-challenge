const assert = require('assert')

const { list, getById } = require('./swapi')

const VALID_SORT_KEYS = ['name', 'height', 'mass']

exports.getPersonById = getById('people')
exports.findPeople = async ({ sort } = {}) => {
  assert(!sort || VALID_SORT_KEYS.includes(sort), `Invalid sort key "${sort}"`)

  const people = await list('people')
  if (!sort) return people
  return people.sort((a, b) => {
    if (a[sort] < b[sort]) return -1
    if (a[sort] > b[sort]) return 1
    return 0
  })
}
