const router = require("express").Router();
const verifyToken = require("../middleware/verifyToken");
const Hoot = require("../models/Hoot");
const Comment = require('../models/Comment')

// creating a hoot
router.post("/", verifyToken, async (req, res) => {
  try {
    const { title, text, category } = req.body; // destructuring the req.body to get the inidivudal field values
    const newHoot = await Hoot.create({
      title: title,
      text: text,
      category: category,
      author: req.user._id, // This is the CURRENTLY logged in users id
    });
    res.status(201).json(newHoot);
  } catch (err) {
    console.log(err);
  }
});

router.get("/", verifyToken, async (req, res) => {
  try {
    const allHoots = await Hoot.find().populate("author");
    res.json(allHoots);
  } catch (err) {
    console.log(err);
  }
});

router.get("/:hootId", async (req, res) => {
  try {
    const foundHoot = await Hoot.findById(req.params.hootId).populate("author");
    res.json(foundHoot);
  } catch (err) {
    console.log(err);
  }
});

router.put("/:hootId", verifyToken, async (req, res) => {
  try {
    // validate that I am the owner of this hoot
    const foundHoot = await Hoot.findById(req.params.hootId);

    if (foundHoot.author == req.user._id) {
      const updatedHoot = await Hoot.findByIdAndUpdate(
        req.params.hootId,
        req.body,
        { new: true },
      );
      return res.json(updatedHoot);
    }
    else{
        return res.status(403).json({message:'You cannot edit this Hoots'})
    }

  } catch (err) {
    console.log(err);
  }
});



router.delete('/:hootId', verifyToken, async (req,res)=>{
    try{
    // validate that I am the owner of this hoot
    const foundHoot = await Hoot.findById(req.params.hootId);

     if (foundHoot.author == req.user._id) {
      const updatedHoot = await Hoot.findByIdAndDelete(req.params.hootId,);
      return res.json(updatedHoot);
    }
    else{
        return res.status(403).json({message:'You cannot delete this Hoots'})
    }
    }catch(err){
        console.log(err);
    }
})


router.post('/:hootId/comment', verifyToken, async (req,res)=>{

})



module.exports = router;
