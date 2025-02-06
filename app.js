const db = require('./config/db');
const api = require('./routes/api');
const auth = require('./routes/auth');
const index = require('./routes');
const app = require('./middleware').middleware;
const PORT = 3000;

app.use('/', index);
app.use('/', auth);
app.use('/api', api);

app.use((req, res) => {
  res.status(404).send("Page not found.");
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}.`);
});
