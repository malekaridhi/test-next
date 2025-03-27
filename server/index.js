const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const tacheRoutes = require('./tache.route')
const app = express();


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use('/api', tacheRoutes);
const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT} `);
});
