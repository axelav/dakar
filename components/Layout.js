import React from 'react'
import PropTypes from 'prop-types'
import '../style.css'

const Layout = ({ children }) => (
  <div className="Layout sans-serif near-black f5 vh-100-ns overflow-y-hidden-ns">
    <div className="mt4 mh4 mb7">{children}</div>
  </div>
)

Layout.propTypes = {
  children: PropTypes.node.isRequired
}

export default Layout
