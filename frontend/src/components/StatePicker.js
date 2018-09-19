import React from 'react'
import PropTypes from 'prop-types'
import { Input } from 'reactstrap'

import states from './us-states.json'
const defaultValue = Object.keys(states)[0]

const StatePicker = ({ value = defaultValue, onChange }) => (
  <Input type='select' onChange={(e) => onChange(e.target.value)} value={value}>
    {
      Object
        .entries(states)
        .map(([ abbr, state ]) => (
          <option key={abbr} value={abbr}>{state}</option>
        ))
    }
  </Input>
)

StatePicker.propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func.isRequired
}

export default StatePicker
