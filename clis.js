#!/usr/bin/env node

const { generateSnippet } = require('./index');

const numArgs = process.argv.length;
const commandName = 'snip-file';

if (numArgs < 3) {
    console.log(`Usage: npx ${commandName} <path-to-file>`);
    return;
}

const filePath  = process.argv[2];
generateSnippet(filePath)
    .then(snippet => {
        console.log(JSON.stringify(snippet, null, '\t'));
    })
    .catch(err => console.error(err));