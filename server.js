const express = require('express');
const path = require('path');
const hbs = require('express-handlebars');
const multer = require('multer');
const app = express();

app.engine('.hbs', hbs());
app.set('view engine', '.hbs');



app.use(express.static(path.join(__dirname, '/public')));

app.use(express.urlencoded({ extended: false }));
// app.use(express.json());
// Save uploaded files
// app.use(multer({ dest: 'uploads/' }).single('file'));

app.use(
  multer({
    storage: multer.memoryStorage(),
  }).single('file')
);

app.use('/user', (req, res, next) => {
  res.render('login');
});

app.get('/', (req, res) => {
  res.render('index');
});

app.get('/home', (req, res) => {
  res.render('index');
});

app.get('/about', (req, res) => {
  res.render('about', { layout: 'dark' });
});

app.get('/contact', (req, res) => {
  res.render('contact');
});

app.get('/info', (req, res) => {
  res.render('info');
});

app.get('/history', (req, res) => {
  res.render('history');
});

app.get('/hello/:name', (req, res) => {
  res.render('hello', {  name: req.params.name });
});


app.post('/contact/send-message', (req, res) => {
  const { author, sender, title, message } = req.body;

  if (author !== '' && sender !== '' && title !== '' && message !== '') {
    if (req.file) {
      const fileName = req.file.originalname;
      res.render('contact', { isSent: true, fileName });
    } else {
      res.render('contact', { isError: true, fileError: true });
    }
  } else {
    res.render('contact', { isError: true });
  }
});

app.use((req, res) => {
  res.status(404).render('notFound');
});

app.listen(8000, () => {
  console.log('Server is running on port: 8000');
});
