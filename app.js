const fs = require('fs')
const path = require('path')
const mime = require('mime')
const request = require('request')

const proxy = 'https://cors-pmmlabs.rhcloud.com/'
const filter = 1
const data = {
  file: {
    value: fs.createReadStream('./test/example.jpg'),
    options: {
      filename: path.basename('./test/example.jpg'),
      contentType: mime.lookup('./test/example.jpg')
    }
  }
}

request({
  url: 'http://vinci.camera/preload',
  method: 'post',
  formData: data,
  json: true
}, (err, res, body) => {
  if (!err && res.statusCode === 200 && body.preload) {
    request(`${proxy}http://vinci.camera/process/${body.preload}/${filter}`).pipe(fs.createWriteStream('./test/vinci.jpg'))
  }
})
