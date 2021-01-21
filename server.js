const express = require('express');
const multer = require('multer');
const vibrant = require('node-vibrant'); // will be removed shortly

const app = express();

const PORT = 8080;

app.use(express.static('public'));

const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, 'uploads/')
  },
  filename: function(req, file, cb) {
    cb(null, file.originalname)
  }
});


app.post('/upload', async (req, res) => {

  let upload = multer({
    storage: storage
  }).single('file');

  upload(req, res, function(err) {

    if (req.fileValidationError) {
      return res.send(req.fileValidationError);
    } else if (!req.file) {
      return res.send('Please select an image to upload');
    } else if (err instanceof multer.MulterError) {
      return res.send(err);
    } else if (err) {
      return res.send(err);
    }

    vibrant.from(__dirname + "\\" + req.file.path).getPalette((err, palette) => {
      res.status(200).send({
        message: palette
      });
    });
  });
});


app.listen(PORT, () => {
  console.log(process.env.DOMAINNAME || ('http://localhost:' + PORT));
});
