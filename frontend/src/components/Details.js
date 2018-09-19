import React from 'react'
import PropTypes from 'prop-types'
import { Table } from 'reactstrap'

const Details = ({ type, person }) => {
  if (!person) {
    return (
      <div className='d-flex h-100 justify-content-center align-items-center'>
        <h5>Select a {type.substr(0, type.length - 1)} to learn more</h5>
      </div>
    )
  }
  return (
    <React.Fragment>
      <h4>{person.name}</h4>
      <Table>
        <tr>
          <th>Party</th>
          <td>{person.party}</td>
        </tr>
        <tr>
          <th>Phone</th>
          <td>{person.phone}</td>
        </tr>
        <tr>
          <th>Address</th>
          <td>{person.office}</td>
        </tr>
        <tr>
          <th>Website</th>
          <td><a href={person.link}>{person.link}</a></td>
        </tr>
      </Table>
    </React.Fragment>
  )
}

Details.propTypes = {
  type: PropTypes.string.isRequired,
  person: PropTypes.shape({
    name: PropTypes.string.isRequired,
    party: PropTypes.string.isRequired,
    phone: PropTypes.string.isRequired,
    office: PropTypes.string.isRequired,
    link: PropTypes.string.isRequired
  })
}
export default Details
