const mongoose = require('mongoose')


// Schema
const hootSchema = new mongoose.Schema({
    title:{
        type: String,
        required:true
    },
    text:{
        type: String,
        required:true
    },
    category:{
        type: String,
        required: true,
        enum:['News', 'Sports','Games','Movies','Music','Television']
    },
    author:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'User'
    }
},{timestamps:true})

// model
const Hoot = mongoose.model('Hoot', hootSchema)

module.exports = Hoot