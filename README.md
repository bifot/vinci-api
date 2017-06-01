# Vinci

A little documentation for working with vinci API.

## Usage

Initially, you need to form multipart/form-data with your photo, then send it on http://vinci.camera/preload. After you need to save your results by request http://vinci.camera/process with proxy. In variable `filter` you can set filter what do you need. Some filters available on website http://vinci.camera/list, but here some hided (see `hidden_filters.json`, if you need more filters).

```javascript
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
    request(`${proxy}http://vinci.camera/process/${body.preload}/${filter}`)
      .pipe(fs.createWriteStream('./test/vinci.jpg'))
  }
})
```

[There's cool example](https://github.com/bifot/vinci-api/tree/master/test).

## License

MIT.
