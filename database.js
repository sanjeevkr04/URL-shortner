const { async } = require('hasha');
const mongoose = require('mongoose');

const connectionString = "mongodb+srv://sanjeevkr:B9Y6IRRCkHlXsJAO@free-forever.kwqrt.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"

mongoose.connect(connectionString, {useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => {
        console.log("Sucess");
    })
    .catch((err) => {
        console.log(err);
    });

const urlSchema = new mongoose.Schema({
    _id: {
        type: String,
        require: true,

    },
    url: {
        type: String,
        require: true
    },
});

const Url = new mongoose.model("url", urlSchema)

module.exports = {
    create: async (url, shortcode) => {
        try{
            return await new Url({_id: shortcode, url: url}).save();
        }catch(err){
            console.log(err);
        }
    },

    getURL: async (shortcode) => {
        try{
            return await Url.findOne({_id: shortcode}, {url: 1});
        }catch(err){
            console.log(err);
        }
    },

    getShortCode: async (url) => {
        try{
            return await Url.findOne({url: url}, {_id: 1});
        }catch(err){
            console.log(err);
        }
    }
}