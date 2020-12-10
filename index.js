const fs = require('fs');

// A helper method used to read a Node.js readable stream into string
async function streamToString(readableStream) {
    return new Promise((resolve, reject) => {
        const chunks = [];
        readableStream.setEncoding('UTF8');
        readableStream.on("data", data => {
            chunks.push(data.toString());
        });
        readableStream.on("end", () => {
            resolve(chunks.join(""));
        });
        readableStream.on("error", reject);
    });
}

/**
 * 
 * @param {string} filePath
 * @returns {Promise<string>} 
 */
async function readFileToString(filePath) {
    const readerStream = fs.createReadStream(filePath);
    return streamToString(readerStream);
}

async function generateSnippet(filePath) {
    const fileAsString = await readFileToString(filePath);
    const fileLines = fileAsString.split('\n');
    return {
        body: fileLines
    };
}

const filePath  = process.argv[2];
console.log(generateSnippet(filePath));