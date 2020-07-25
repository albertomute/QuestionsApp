const express = require('express')

const app = express()
const port = 3000;

app.get("/", (req, res) => res.send("Hello World!"));

app.get("/status", (req, res) => {
    res.send({
        "message" : "welcome here"
    })
});

app.listen(port, () =>
  console.log(`Example app listening at http://localhost:${port}`)
);