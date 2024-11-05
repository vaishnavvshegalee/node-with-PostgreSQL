const express =  require('express');
const morgan = require('morgan');
const { config } = require('dotenv');
const studentRoutes = require('./src/student/routes.js');
config();
const port = process.env.PORT || 5000;
const app = express();

app.use(express.json());
app.use(morgan('dev'));
app.use('/api/v1/students',studentRoutes)
app.listen(port,(err)=>{
    if(err)console.log(err);
    console.log(`Server is listening on port ${port}`);
})
