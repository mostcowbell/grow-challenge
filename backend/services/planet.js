const { list, getByUrl, getById } = require('./swapi')

exports.getPlanetById = getById('planet')
exports.findPlanets = async (viewer) => {
  return list('planets', async (planet) => {
    const residents = await Promise.all(
      planet.residents.map(async url => {
        const { name } = await getByUrl(url)
        return name
      })
    )
    return { ...planet, residents }
  })
}
