const express = require('express');
const bodyParser = require('body-parser');
const shortner = require('./shortner');

const port = process.env.PORT || 8000;
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("static"));

app.get('/:shortcode', (req, res) => {
    shortner.expand(req.params.shortcode)
        .then((result) => {
            res.redirect(result.url);
        })
        .catch((err) => {
            console.log(err);
            res.status(404).send("Not found");
        })
});

app.post('/api/v1/shorten', (req, res) => {
    const url = req.body.url
    shortner.shorten(url)
    .then((code) => {
        console.log(code._id);
        res.send(code._id);
    }).catch((err) => {
        shortner.find(url)
        .then((code) => {
            res.send(code._id);
        }).catch((error) => {
            console.log(error);
        });
    });
});

app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});