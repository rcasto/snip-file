#!/usr/bin/env node

const { generateSnippet } = require('./index');

const args = process.argv.slice(2);
const numArgs = args.length;

let prefix = '';
let description = '';
let filePath = '';

for (let i = 0; i < numArgs; i++) {
    const arg = args[i];

    if (arg === '--prefix') {
        if (i + 1 < numArgs) {
            prefix = args[i + 1];
            i++;
        } else {
            throw new Error('No prefix provided');
        }
    } else if (arg === '--description') {
        if (i + 1 < numArgs) {
            description = args[i + 1];
            i++;
        } else {
            throw new Error('No description provided');
        }
    } else {
        filePath = arg;
    }
}

if (!filePath) {
    throw new Error('No filePath provided');
}

generateSnippet(prefix, description, filePath)
    .then(snippet => {
        console.log(JSON.stringify(snippet, null, '\t'));
    })
    .catch(err => console.error(err));