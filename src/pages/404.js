import React from 'react'
import Helmet from 'react-helmet'
import Menu from '../components/Menu'
import config from '../../config/SiteConfig'
import Footer from '../components/Footer'
import Header from '../components/Header'

const NotFoundPage = () => (
  <div>
    <Menu />
    <Header />
    <Helmet title={`404 | ${config.title}`} />
    <h1>NOT FOUND</h1>
    <p>You just hit a route that doesn&#39;t exist... the sadness.</p>
    <Footer />
  </div>
)

export default NotFoundPage
