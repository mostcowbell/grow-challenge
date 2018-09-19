import React from 'react'
import { branch } from 'recompose'

const defaultLoading = () => (
  <div className='d-flex justify-content-center align-content-center p-5'>
    Loading...
  </div>
)
export default (Loading = defaultLoading) => branch(props => props.loading, () => Loading)
