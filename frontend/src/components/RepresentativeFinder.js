import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Container, Row, Col, Input } from 'reactstrap'
import fetch from 'isomorphic-fetch'
import List from './List'
import Details from './Details'
import StatePicker from './StatePicker'
import TypePicker from './TypePicker'

import states from './us-states.json'

class RepresentativeFinder extends Component {
  constructor (props) {
    super(props)

    this.state = {
      type: 'senators',
      state: Object.keys(states)[0],
      people: [],
      selected: null
    }
    this.select = this.select.bind(this)
    this.onChange = this.onChange.bind(this)
  }
  componentWillMount () {
    this.fetchList()
  }

  async fetchList (type = this.state.type, state = this.state.state) {
    if (type && state) {
      this.setState({ loading: true, people: [] })
      const response = await fetch(`/${type}/${state}`)
      if (response.ok) {
        const { results } = await response.json()
        const url = `/${this.state.type}/${this.state.state}`
        if (this.props.location.pathname !== url) {
          this.props.history.replace(url)
        }
        this.setState({ people: results || [], type, state, loading: false })
      }
    }
  }

  onChange (field) {
    return (value) => {
      this.setState({ [field]: value, selected: null }, () => {
        this.props.history.replace(`/${this.state.type}/${this.state.state}`)
        this.fetchList()
      })
    }
  }

  select (person) {
    return () => this.setState({ selected: person })
  }

  render () {
    const { people, selected } = this.state
    console.log('people', people)
    return (
      <Container>
        <Row className='mb-3'>
          <Col>
            <TypePicker value={this.state.type} onChange={this.onChange('type')} />
          </Col>
          <Col>
            <StatePicker value={this.state.state} onChange={this.onChange('state')} />
          </Col>
        </Row>
        <Row>
          <Col>
            <List
              type={this.state.type}
              selected={this.state.selected}
              onSelect={this.select}
              loading={this.state.loading}
              people={people}
            />
          </Col>
          <Col>
            <Details type={this.state.type} person={selected} />
          </Col>
        </Row>
      </Container>
    )
  }
}

RepresentativeFinder.propTypes = {
  history: PropTypes.shape({
    replace: PropTypes.func
  }),
  location: PropTypes.shape({
    pathname: PropTypes.string
  })
}

export default RepresentativeFinder
