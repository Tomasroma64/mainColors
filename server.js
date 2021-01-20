const express = require('express');
const multer = require('multer');

const exphbs = require('express-handlebars');
const vibrant = require('node-vibrant')

const app = express();

const PORT = 8080;

//app.use(express.static(__dirname + '/public'));

app.engine('.hbs', exphbs({
  extname: '.hbs'
}));
app.set('view engine', '.hbs');

app.get('/', (req, res) => {
  return res.render('index', {
    layout: false
  });
});




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
