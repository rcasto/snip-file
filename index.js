const fs = require('fs');

/**
 * VS Code snipper object interface
 * https://code.visualstudio.com/docs/editor/userdefinedsnippets
 * @typedef {Object} Snippet
 * @property {string|string[]} prefix - defines one or more trigger words that display the snippet in IntelliSense. Substring matching is performed on prefixes, so in this case, "fc" could match "for-const"
 * @property {string[]} body - is one or more lines of content, which will be joined as multiple lines upon insertion
 * @property {string} description - is an optional description of the snippet displayed by IntelliSense
 */

/**
 * A helper method used to read a Node.js readable stream into string
 * @param {fs.ReadStream} readableStream
 * @returns {Promise<string>}
 */
async function streamToString(readableStream) {
    return new Promise((resolve, reject) => {
        const chunks = [];
        readableStream.setEncoding('utf8');
        readableStream.on('data', data => {
            chunks.push(data.toString());
        });
        readableStream.on('end', () => {
            resolve(chunks.join(''));
        });
        readableStream.on('error', reject);
    });
}

/**
 * Takes in a file path, reads the contents of the file in stream like fashion, and
 * asynchronously returns the contents of the file as a string.
 * @param {string} filePath
 * @returns {Promise<string>} 
 */
async function readFileToString(filePath) {
    const readerStream = fs.createReadStream(filePath);
    return streamToString(readerStream);
}

/**
 * Generates a snippet given a file path. The contents of the file will be used
 * to populate the body of the snippet.
 * 
 * It will also pre-populate a prefix and description field for the user to fill out.
 * @param {string} filePath
 * @returns {Snippet}
 */
async function generateSnippet(filePath) {
    const fileAsString = await readFileToString(filePath);
    const fileLines = fileAsString.trim().split('\n');
    return {
        prefix: '',
        description: '',
        body: fileLines
    };
}

module.exports = {
    generateSnippet,
};