const express = require('express');
const morgan = require('morgan');
const dotenv = require("dotenv");
var cors = require('cors');
const cookieparser = require('cookie-parser');
// const sequelize = require('./models');
// const sync = require('./models/sync');
// const users = require('./models/user');

//dotenv configuration
dotenv.config()

const app = express();

// sequelize.sync({alter:true});
// sync;
// users;

//middlewares
app.use(express.json());
app.use(morgan("dev"));
// app.use(cors());
app.use(cors({
  origin: process.env.FRONTEND_URL,
}));

app.all('', (req, res) => {
  res.header('Access-Control-Allow-Origin', req.headers.origin || '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.header('Access-Control-Allow-Credentials', 'true');
  res.status(200).end();
});

const PORT = process.env.PORT;

//routes
app.use('/api/v1/users',require("./routes/usersRoutes"));
app.use('/api/v1/courses', require("./routes/coursesRoutes"));
app.use('/api/v1/license', require("./routes/licenseRoutes"));
app.use('/api/v1/payment', require("./routes/paymentRoutes"));
app.use('/api/v1/userCourse', require("./routes/userCourseRoutes"));

app.get('/', (req, res) => {
    res.status(200).send('Hello World!')
})

app.listen(PORT, () => {
    console.log(`Server running on ${PORT}`);
})