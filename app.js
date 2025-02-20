const express = require('express');

const hbs = require('hbs');
const path = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');

const app = express();
const punkAPI = new PunkAPIWrapper();

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));
app;

// Register the location for handlebars partials here:

// ...

// Add the route handlers here:

app.get('/', (req, res) => {
  res.render('index');
});
app.get('/beers', async (req, res) => {
  try {
    const beers = await punkAPI.getBeers();
    res.render('beers', { beers });
  } catch (err) {
    res.send('<h1>Something went wrong</h1>').status(404);
  }
});

app.get('/random-beer', async (req, res) => {
  try {
    const [randBeer] = await punkAPI.getRandom();
    res.render('random-beer', { ...randBeer, single: true });
  } catch (err) {
    res.send('<h1>Something went wrong</h1>').status(404);
  }
});

app.get('/beers/:id', async (req, res) => {
  const { id } = req.params;
  const [beer] = await punkAPI.getBeer(id);
  res.render('random-beer', { ...beer, single: true });
});

app.listen(3000, () => console.log('🏃‍ on port 3000'));
