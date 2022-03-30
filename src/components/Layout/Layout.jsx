import React from 'react'
import Header from '../Header/Header'

const Layout = ({ isHeader, component: Component }) => {
  return (
    <>
      {isHeader && <Header />}
      <Component />
    </>
  )
}

export default Layout
