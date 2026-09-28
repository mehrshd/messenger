const express = require('express');
const cors = require('cors');

const users = require("./routes/users");
const register = require('./routes/auth/register');
const login = require('./routes/auth/login');
const profile = require('./routes/profile');

const updatePassword = require('./routes/updateAccount/updatePassword');
const updateProfile = require('./routes/updateAccount/updateProfile');

const requestUpdateEmail = require('./routes/updateAccount/updateEmail/requestUpdateEmail');
const confirmUpdateEmail = require('./routes/updateAccount/updateEmail/confirmUpdateEmail');

const message = require('./routes/chat/messages');
const conversation = require('./routes/chat/conversations');

const app = express();
app.use(cors());
app.use(express.json())

app.use(users);
app.use(register);
app.use(login);
app.use(profile);
app.use(updatePassword);
app.use(updateProfile);
app.use(requestUpdateEmail);
app.use(confirmUpdateEmail);
app.use('/chat', message);
app.use('/conversation', conversation);

app.use('/uploads', express.static('uploads'));


app.use((req, res) => {
    res.status(404).send("Sorry, can't find that!")
});

module.exports = app