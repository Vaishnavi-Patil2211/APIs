const dotenv = require('dotenv');

dotenv.config();

module.exports = {
    port: process.env.PORT,
    email: process.env.EMAIL,
    password: process.env.PASSWORD,
    saltWorkFactor: 10,
};


