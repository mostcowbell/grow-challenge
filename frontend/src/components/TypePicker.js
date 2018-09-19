import React from 'react'
import PropTypes from 'prop-types'
import { Input } from 'reactstrap'

const defaultValue = 'senators'
const TypePicker = ({ value = defaultValue, onChange }) => (
  <Input type='select' onChange={e => onChange(e.target.value)} value={value}>
    <option value='senators'>Senators</option>
    <option value='representatives'>Representatives</option>
  </Input>
)

TypePicker.propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func.isRequired
}

export default TypePicker
