module.exports = {
  globals: {
    __PATH_PREFIX__: true,
  },
  extends: 'airbnb',
  // Override with project rules
  "rules": {
    "react/jsx-filename-extension": [1, { "extensions": [".js", ".jsx"] }],
    // Indentation
    "react/jsx-indent-props": ["enabled", 2],
    // TODO: implement proptypes for components
    "react/prop-types": 0,
  }
}
