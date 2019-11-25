const uuid = require('uuid/v1');
const fs = require('fs');
const path = require('path');

const upload = (stream, mimetype) => {
  const extension = mimetype.split('/')[1];
  const filePath = `./uploads/${uuid()}.${extension}`;
  return new Promise((res, rej) => {
    stream
      .pipe(fs.createWriteStream(filePath))
      .on('error', error => rej(error))
      .on('finish', () =>
        resolve({
          path: path.resolve(filePath),
        })
      );
  });
};

module.exports = { upload };
