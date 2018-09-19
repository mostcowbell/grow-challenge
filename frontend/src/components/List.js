import React from 'react'
import PropTypes from 'prop-types'
import { Table } from 'reactstrap'
import classnames from 'classnames'
import { compose } from 'recompose'
import withLoading from './withLoading'

const List = ({ people, type, selected, onSelect }) => {
  if (!people.length) {
    return (
      <div className='d-flex justify-content-center align-items-center'>
        <h2 className='text-center p-5 m-5'>No {type} found</h2>
      </div>
    )
  }
  return (
    <React.Fragment>
      <h2>List / <a href={`/${type}/`}>{type}</a></h2>
      <Table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Party</th>
          </tr>
        </thead>
        <tbody>
          {
            people.map((person) => (
              <tr
                style={{
                  cursor: 'pointer'
                }}
                className={classnames({
                  'bg-primary': person === selected,
                  'text-white': person === selected
                })}
                onClick={onSelect(person)}>
                <td>{person.name}</td>
                <td>{person.party.substr(0, 1)}</td>
              </tr>
            ))
          }
        </tbody>
      </Table>
    </React.Fragment>
  )
}

const person = PropTypes.shape({
  name: PropTypes.string,
  party: PropTypes.string
})

List.propTypes = {
  people: PropTypes.arrayOf(person),
  selected: person,
  onSelect: PropTypes.func,
  type: PropTypes.oneOf(['senators', 'representatives'])
}

export default compose(
  withLoading()
)(List)
