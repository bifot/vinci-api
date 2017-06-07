const fs = require('fs')
const path = require('path')
const mime = require('mime')
const request = require('request')

const proxy = 'https://cors-pmmlabs.rhcloud.com/'

const filters = [
  1, 27, 64, 36, 56, 52, 29, 44,
  37, 45, 59, 60, 57, 58, 38, 46, 3,
  48, 4201, 39, 34, 12, 7, 31, 28, 26,
  5, 24, 10, 21, 15, 2, 9, 4, 6, 8, 11,
  14, 16, 17, 19, 20, 21, 25, 4101
]

const data = {
  file: {
    value: fs.createReadStream('./test/example.jpg'),
    options: {
      filename: path.basename('./test/example.jpg'),
      contentType: mime.lookup('./test/example.jpg')
    }
  }
}

for (let i = 0; i < filters.length; i++) {
  request({
    url: 'http://vinci.camera/preload',
    method: 'post',
    formData: data,
    json: true
  }, (err, res, body) => {
    if (!err && res.statusCode === 200 && body.preload) {
      request(`${proxy}http://vinci.camera/process/${body.preload}/${filters[i]}`)
        .pipe(fs.createWriteStream(`./test/vinci${filters[i]}.png`))
    }
  })
}
