const router = require("express").Router();
const verifyToken = require('../middleware/verifyToken')
const Hoot = require('../models/Hoot')

// creating a hoot
router.post('/', verifyToken, async (req,res)=>{
    try{
        const {title, text, category} = req.body // destructuring the req.body to get the inidivudal field values
        const newHoot = await Hoot.create({
            title: title,
            text: text,
            category: category,
            author: req.user._id // This is the CURRENTLY logged in users id
        })
        res.status(201).json(newHoot)
    }catch(err){
        console.log(err)
    }
})

router.get('/', verifyToken, async (req,res)=>{
    try{
        const allHoots = await Hoot.find().populate('author')
        res.json(allHoots)
    }catch(err){
        console.log(err)
    }
})


module.exports = router;
