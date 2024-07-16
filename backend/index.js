const express = require('express');
const morgan = require('morgan');
const dotenv = require("dotenv");
// const sequelize = require('./models');
// const sync = require('./models/sync');
var cors = require('cors')
const users = require('./models/user');

//dotenv configuration
dotenv.config()

const app = express();

// sequelize.sync({alter:true});
// sync;
users;

//middlewares
app.use(express.json());
app.use(morgan("dev"));
app.use(cors());

const PORT = process.env.PORT;

//routes
app.use('/api/v1/users',require("./routes/usersRoutes"));
app.use('/api/v1/courses', require("./routes/coursesRoutes"));
app.use('/api/v1/license', require("./routes/licenseRoutes"));


app.get('/', (req, res) => {
    res.status(200).send('Hello World!')
})

app.listen(PORT, () => {
    console.log(`Server running on ${PORT}`);
})