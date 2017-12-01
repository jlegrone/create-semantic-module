/* eslint-env node */

module.exports = {<% if (commitlintConfig) { %>
  extends: ['<%= commitlintConfig %>'],

  <% } %>// Add your own rules. See http://marionebl.github.io/commitlint
  rules: {
  }
};
