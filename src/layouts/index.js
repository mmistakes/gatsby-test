import React from "react";
import PropTypes from "prop-types";
import Link from "gatsby-link";
import Helmet from "react-helmet";

import "syntax-highlighting/assets/css/prism/prism-base16-ateliercave.light.css";

const Header = () => (
  <div>
    <div>
      <h1>
        <Link to="/">Gatsby Test</Link>
      </h1>
    </div>
  </div>
);

const TemplateWrapper = ({ children }) => (
  <div>
    <Helmet
      title="Gatsby Test"
      meta={[{ name: "description", content: "Sample" }]}
    />
    <Header />
    <div>{children()}</div>
  </div>
);

TemplateWrapper.propTypes = {
  children: PropTypes.func
};

export default TemplateWrapper;
