const comment = require('../models/comment');
const verify = require('../verifyToken');
const router = require('express').Router();

router.post('/comment', verify, async (req, resp) => {
    try{
        const newComment = new comment(req.body);
        const res = await newComment.save();
        resp.status(200).json(res);
    }
    catch(err){
        resp.status(401).json(err)
    }
})

module.exports = router;