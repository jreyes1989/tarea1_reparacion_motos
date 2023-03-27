require('dotenv').config();
const app = require('./app');
const { db } = require('./database/config');

db.authenticate()
  .then(() => console.log('Database authenticated 😄'))
  .catch((error) => console.log(error));

db.sync({ force: true })
  .then(() => console.log('Database synced 😎'))
  .catch((error) => console.log(error));

const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`app running on port ${port}...`);
});
