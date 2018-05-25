import React from 'react';
import Helmet from 'react-helmet';
import config from '../../config/SiteConfig';
import Footer from '../components/Footer'
import Header from '../components/Header'

const CommentSuccess = () => (
  <div>
    <Header />
    <Helmet title={`Thank You | ${config.title}`} />
    <h1>Thanks for the comment</h1>
    <p>Your comment is currently in moderation and will be reviewed soon.</p>
    <Footer />
  </div>
)

export default CommentSuccess
