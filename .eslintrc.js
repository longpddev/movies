module.exports = {
  extends: ["react-app"],
  rules: {
    "react/jsx-first-prop-new-line": [1, "multiline"],
    "react/jsx-max-props-per-line": [1, { maximum: 1, when: "always" }],
    "react/jsx-indent-props": [2, 2],
    "react/jsx-closing-bracket-location": [2, "tag-aligned"],
  },
}
