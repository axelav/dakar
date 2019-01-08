import React from 'react'
import PropTypes from 'prop-types'
import Head from 'next/head'

const App = ({ Component, pageProps }) => (
  <div>
    <Head>
      <meta name="viewport" content="width=device-width,initial-scale=1" />
      <title key="title">Dakar 2019</title>
    </Head>
    <Component {...pageProps} />
  </div>
)

App.propTypes = {
  Component: PropTypes.node,
  pageProps: PropTypes.object
}

export default App
