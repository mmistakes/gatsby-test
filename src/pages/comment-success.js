import { graphql } from 'gatsby'
import React from 'react'
import Helmet from 'react-helmet'
import Layout from '../components/Layout'
import Menu from '../components/Menu'
import config from '../../config/SiteConfig'
import Footer from '../components/Footer'
import Header from '../components/Header'

const CommentSuccess = ({
  data: {
    site: {
      siteMetadata: { title },
    },
  },
}) => (
  <Layout>
    <Menu />
    <Header />
    <Helmet title={`Thank You | ${title}`} />
    <h1>Thanks for the comment</h1>
    <p>Your comment is currently in moderation and will be reviewed soon.</p>
    <Footer />
  </Layout>
)

export default CommentSuccess

export const pageQuery = graphql`
  query CommentSuccessQuery {
    site {
      siteMetadata {
        title
      }
    }
  }
`
