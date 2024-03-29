
// prefer default export if available
const preferDefault = m => (m && m.default) || m


exports.components = {
  "component---src-pages-index-js": preferDefault(require("/Users/ornelastechnologies/Documents/GitHub/crowdsale/src/pages/index.js")),
  "component---src-pages-privacy-policy-js": preferDefault(require("/Users/ornelastechnologies/Documents/GitHub/crowdsale/src/pages/privacy-policy.js")),
  "component---src-pages-thanks-js": preferDefault(require("/Users/ornelastechnologies/Documents/GitHub/crowdsale/src/pages/thanks.js"))
}

