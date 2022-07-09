const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const LRVrouter = require('./routes/LoginRegisterValidate');
const DashboardRoutes = require('./routes/DashboardRoutes');


app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors());

app.use('/',LRVrouter);
app.use('/dashboard',DashboardRoutes);


app.listen(5000, () => {
  console.log('server is listening on port 5000')
});

