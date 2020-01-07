/*
 * Write a function WITH NO CALLBACKS that,
 * (1) reads a GitHub username from a `readFilePath`
 *     (the username will be the first line of the file)
 * (2) then, sends a request to the GitHub API for the user's profile
 * (3) then, writes the JSON response of the API to `writeFilePath`
 *
 * HINT: We exported some similar promise-returning functions in previous exercises
 */

var fs = require('fs');
var Promise = require('bluebird');
var request = require('request');
let getGitHubProfileAsync = require('./promisification').getGitHubProfileAsync;
let writeFileAsync = Promise.promisify(fs.writeFile);


var fetchProfileAndWriteToFile = function(readFilePath, writeFilePath) {
  // TODO
  let pluckFirstLineFromFileAsync = function(filePath) {
    // TODO
    return new Promise((resolve, reject) => {
      fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
          reject(err);
        } else {
          let dataArr = data.split('\n');
          resolve(dataArr[0]);
        }
      });

    }).then(firstLine => {
      return firstLine;
      })
      .catch(err => {
        throw err;
      })
  };

 return pluckFirstLineFromFileAsync(readFilePath)
    .then(getGitHubProfileAsync)
    .then((data) => {
      return writeFileAsync(writeFilePath, JSON.stringify(data));
    });
};

// Export these functions so we can test them
module.exports = {
  fetchProfileAndWriteToFile: fetchProfileAndWriteToFile
};


// return new Promise((resolve, reject) => {
//   // read file here, pass along contents to then
//   fs.readFile(readFilePath, 'utf8', (err, data) => {
//     if (err) {
//       reject(err);
//     } else {
//       let dataArr = data.split('\n');
//       resolve(`https://api.github.com/users/${dataArr[0]}`);
//     }
//   });

// }).then(url => {

//   request(url, (err, res, body) => {
//     if (err) {
//       return err;
//     } else {
//       return body;
//     }
//   });

// }).then(data => {
//   // write to file path
//   fs.writeFile(writeFilePath, data, () => {});

// }).catch(err => {throw err});
////////////////////////////////////////////////////////////////////////////
// var getGitHubProfile = function(user, callback) {
//   var options = {
//     url: 'https://api.github.com/users/' + user,
//     headers: { 'User-Agent': 'request' },
//     json: true  // will JSON.parse(body) for us
//   };

//   request.get(options, function(err, res, body) {
//     if (err) {
//       callback(err, null);
//     } else if (body.message) {
//       callback(new Error('Failed to get GitHub profile: ' + body.message), null);
//     } else {
//       callback(null, body);
//     }
//   });
// };

// var getGitHubProfileAsync = Promise.promisify(getGitHubProfile); // TODO