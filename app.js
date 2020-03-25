const express = require('express')
const axios = require('axios')
const redis = require('redis')

const app = express();

const port = 3000;

app.listen(port, () => {
    console.log(`App is running on PORT ${port}`)
});

module.exports = app;