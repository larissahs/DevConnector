const express =  require('express');
const mongoose = require('mongoose');
const users = require('./routes/api/users');
const profile = require ('./routes/api/profile');
const posts = require('./routes/api/posts');
const app =  express();
const bodyParser = require('body-parser');
const passport = require('passport');

//Db config
const db = require ('./config/keys').mongoURI;
mongoose.connect(db).then(() => console.log('MongoDb connected')).catch(err => console.log(err));

//passport middleware
app.use(passport.initialize());

//passport config
require('./config/passport')(passport);

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

app.get('/', (req, res) => res.send('Hello'));

app.use('/api/users', users);
app.use('/api/profile', profile);
app.use('/api/posts', posts);
 
const port = 5004;
app.listen(port, () => console.log(`Server is running on port ${port}`));
