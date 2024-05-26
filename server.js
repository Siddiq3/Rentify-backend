const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const userRoutes = require('./routes/userRoutes');
const propertyRoutes = require('./routes/propertyRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());


const encodedPassword = encodeURIComponent('Siddiq@03');

mongoose.connect(`mongodb+srv://siddiqkolimi:${encodedPassword}@cluster0.fpkgviw.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`)
    .then(() => console.log('DB connect'))
    .catch(err => console.log(err));


app.use('/api/users', userRoutes);
app.use('/api/properties', propertyRoutes);



  


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
