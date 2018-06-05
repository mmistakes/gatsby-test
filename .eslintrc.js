module.exports = {
  "env": {
    "browser": true,
    "es6": true,
  },
  "root": true,
  "extends": ["airbnb", "plugin:prettier/recommended"],
  "settings": {
    "import/core-modules": ["gatsby", "react", "config"]
  },
  "plugins": [
    "react",
  ],
  "globals": {
    "graphql": true,
  },
  "parserOptions": {
    "sourceType": "module",
    "ecmaFeatures": {
      "experimentalObjectRestSpread": true,
      "jsx": true,
    },
  },
  "rules": {
    "linebreak-style": 0,
    "react/prefer-stateless-function": "off",
    "react/jsx-filename-extension": [1, { "extensions": [".js", ".jsx"] }],
    "jsx-a11y/anchor-is-valid": [
      "error",
      {
        "components": ["Link"],
        "specialLink": ["to"],
        "aspects": ["noHref", "invalidHref", "preferButton"]
      }
    ]
  }
}
