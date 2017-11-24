/* eslint-env node */

module.exports = {<% if (commitlintConfig) { %>
  extends: ['<%= commitlintConfig %>'],

  <% } %>// Add your own rules. See http://marionebl.github.io/commitlint
  rules: {
    // Disable language rule
    lang: [0, 'always', 'eng']
  }
};
