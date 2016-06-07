var router=require('express').Router();


router.get('/',function (req,res) {
  res.send('fuck you')
});

exports.voteRouter=router;