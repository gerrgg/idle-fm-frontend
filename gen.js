#!/usr/bin/env node

import fs from "fs";
import path from "path";

// prettier folder map for expansion
const FOLDER_MAP = {
  component: "components",
  components: "components",
  page: "pages",
  pages: "pages",
  layout: "layouts",
  layouts: "layouts",
};

const [, , typeArg, name] = process.argv;

if (!typeArg || !name) {
  console.error("Usage: node gen <type> <Name>");
  console.error("Types: component, page, layout");
  process.exit(1);
}

const type = typeArg.toLowerCase();
const targetFolder = FOLDER_MAP[type];

if (!targetFolder) {
  console.error(`Unknown type: ${typeArg}`);
  console.error(`Valid types: ${Object.keys(FOLDER_MAP).join(", ")}`);
  process.exit(1);
}

// base directory, e.g. src/components/
const baseDir = path.resolve("src", targetFolder);
const componentDir = path.join(baseDir, name);

// ensure base folder exists
if (!fs.existsSync(baseDir)) {
  console.error(`Folder src/${targetFolder}/ does not exist.`);
  process.exit(1);
}

// prevent overwriting
if (fs.existsSync(componentDir)) {
  console.error(`${name} already exists in src/${targetFolder}/`);
  process.exit(1);
}

// create the folder
fs.mkdirSync(componentDir, { recursive: true });

// main file template
const componentTemplate =
  `
import { Wrapper } from "./${name}.styles.jsx";

export default function ${name}() {
  return (
    <Wrapper>
      ${name} ${type}
    </Wrapper>
  );
}
`.trim() + "\n";

// styles file template
const stylesTemplate =
  `
import styled from "styled-components";

export const Wrapper = styled.div\`
  display: flex;
\`;
`.trim() + "\n";

// index export (optional but nice)
const indexTemplate = `export { default } from "./${name}.jsx";\n`;

// write files
fs.writeFileSync(path.join(componentDir, `${name}.jsx`), componentTemplate);
fs.writeFileSync(path.join(componentDir, `${name}.styles.jsx`), stylesTemplate);
fs.writeFileSync(path.join(componentDir, `index.js`), indexTemplate);

console.log(`Created ${type} "${name}" in src/${targetFolder}/`);
