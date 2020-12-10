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
    const fileLines = fileAsString.trim().split('\n');
    return {
        body: fileLines
    };
}

const numArgs = process.argv.length;

if (numArgs < 3) {
    throw new Error('No path to file to convert to snippet provided.');
}

const filePath  = process.argv[2];
generateSnippet(filePath)
    .then(snippet => {
        console.log(JSON.stringify(snippet, null, '\t'));
    })
    .catch(err => console.error(err));