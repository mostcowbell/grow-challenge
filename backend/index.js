const { AssertionError } = require('assert')
const compression = require('compression')
const express = require('express')

const { findPeople } = require('./services/person')
const { findPlanets } = require('./services/planet')

const app = express()

const PORT = process.env.PORT || 3000

const mw = (fn) => async (req, res, next) => {
  try {
    const results = await fn(req)
    res.send(results)
  } catch (ex) { next(ex) }
}

app.use(compression())
app.get('/people', mw(({ query }) => findPeople({ sort: query.sortBy })))
app.get('/planets', mw(() => findPlanets()))

app.use((err, req, res, next) => {
  let { status = 500, message = 'Server Error' } = err
  if (err instanceof AssertionError) status = 400
  res.status(status).send({ status, message })
})

app.listen(PORT, console.info(`Listening on port "${PORT}"`))
