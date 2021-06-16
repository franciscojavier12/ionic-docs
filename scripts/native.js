const fs = require("fs");
const nativeJSON = require("./data/native.json");
const utils = require('./utils.js');

(async function() {
  // console.log(cliJSON);

  nativeJSON.map(writePage);
}());

function writePage(page) {
  const data = [
    renderFrontmatter(page),
    renderImports(page),
    renderIntro(page),
    renderSalesCTA(page),
    // renderProperties(page),
    // renderEvents(page),
    // renderMethods(page),
    // renderParts(page),
    // renderCustomProps(page),
    // renderSlots(page)
  ].join("");
  
  const path = `docs/native/plugins/${page.packageName.replace('@ionic-native/','')}.md`;
  fs.writeFileSync(path, data);
}

function renderFrontmatter({ displayName }) {
  const frontmatter = {
    title: displayName
  };

  return `---
${Object.entries(frontmatter)
  .map(([key, value]) => `${key}: ${value}`)
  .join("\n")}
---

`;
}

function renderImports({}) {
  return `
import DocsCard from '@site/src/components/DocsCard';
`;
}

function renderIntro({ description, displayName, repo }) {
  return `
# ${displayName}

${description}

<p><a href="${repo}" target="_blank" rel="noopener" className="git-link">
  ${utils.gitBranchSVG()} ${repo}
</a></p>
`;
}

function renderSalesCTA({}) {
  return `
<h2>Stuck on a Cordova issue?</h2>
<DocsCard class="cordova-ee-card" header="Don't waste precious time on plugin issues." href="https://ionicframework.com/sales?product_of_interest=Ionic%20Native">
  <div>
    <img src="/docs/icons/native-cordova-bot.png" class="cordova-ee-img" />
    <p>If you're building a serious project, you can't afford to spend hours troubleshooting. Ionic’s experts offer premium advisory services for both community plugins and premier plugins.</p>
    <docs-button class="native-ee-detail">Contact Us Today!</docs-button>
  </div>
</DocsCard>

`;
}

// function renderUsage({ usage }) {
//   const keys = Object.keys(usage);

//   if (keys.length === 0) {
//     return "";
//   }

//   if (keys.length === 1) {
//     return `
// ## Usage

// ${usage[keys[0]]}
// `;
//   }

//   return `
// ## Usage

// <Tabs defaultValue="${keys[0]}" values={[${keys
//     .map(key => `{ value: '${key}', label: '${key.toUpperCase()}' }`)
//     .join(", ")}]}>

// ${Object.entries(usage)
//   .map(
//     ([key, value]) => `
// <TabItem value="${key}">

// ${value}

// </TabItem>
// `
//   )
//   .join("\n")}
// </Tabs>
// `;
// }

// function renderProperties({ props: properties }) {
//   if (properties.length === 0) {
//     return "";
//   }

//   return `
// ## Properties

// ${properties
//   .map(
//     prop => `
// ### ${prop.name}

// | | |
// | --- | --- |
// | **Description** | ${prop.docs.split("\n").join("<br />")} |
// | **Attribute** | \`${prop.attr}\` |
// | **Type** | \`${prop.type.replace(/\|/g, "\\|")}\` |
// | **Default** | \`${prop.default}\` |

// `
//   )
//   .join("\n")}
// `;
// }

// function renderEvents({ events }) {
//   if (events.length === 0) {
//     return "";
//   }

//   return `
// ## Events

// | Name | Description |
// | --- | --- |
// ${events.map(event => `| \`${event.event}\` | ${event.docs} |`).join("\n")}

// `;
// }

// function renderMethods({ methods }) {
//   if (methods.length === 0) {
//     return "";
//   }

//   return `
// ## Methods

// ${methods
//   .map(
//     method => `
// ### ${method.name}

// | | |
// | --- | --- |
// | **Description** | ${method.docs.split("\n").join("<br />")} |
// | **Signature** | \`${method.signature.replace(/\|/g, "\\|")}\` |
// `
//   )
//   .join("\n")}

// `;
// }

// function renderParts({ parts }) {
//   if (parts.length === 0) {
//     return "";
//   }

//   return `
// ## CSS Shadow Parts

// | Name | Description |
// | --- | --- |
// ${parts.map(prop => `| \`${prop.name}\` | ${prop.docs} |`).join("\n")}

// `;
// }

// function renderCustomProps({ styles: customProps }) {
//   if (customProps.length === 0) {
//     return "";
//   }

//   return `
// ## CSS Custom Properties

// | Name | Description |
// | --- | --- |
// ${customProps.map(prop => `| \`${prop.name}\` | ${prop.docs} |`).join("\n")}

// `;
// }

// function renderSlots({ slots }) {
//   if (slots.length === 0) {
//     return "";
//   }

//   return `
// ## Slots

// | Name | Description |
// | --- | --- |
// ${slots.map(slot => `| \`${slot.name}\` | ${slot.docs} |`).join("\n")}

// `;
// }

