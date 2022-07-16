const express = require("express");
const app = express();
const reaction = require("../model/reaction");
const router = require('express').Router();
const commentaire = require("../model/commentaire")

router.post('/like', async (req, res) => {
    console.log(req.body);
    try {
        var L = await new reaction({
            type: req.body.type,
            user: req.body.user,
            commentaire: req.body.commentaire
        });
        L.save()
        res.json(L)
    }
    catch (error) {
        res.status(400).json(error.message);
    }
});
router.get('/delete/:_id', async (req, res) => {
    console.log(req.params);
    await reaction.findByIdAndDelete(req.params)
    res.json('delete success')



});

/*app.post('/dislike', async (req, res) => {
    try {
        let { email, exchange } = req.body
        let like = await Like.findOne({email});
        exchange = await Exchange.findById(exchange).populate('likes');
        let index = exchange.likes.findIndex(likeEx => likeEx.toString() == like._id.toString())
        exchange.likes.splice(index, 1);
        exchange.save();
        like.delete()
        res.status(200).json(exchange);
    } catch (error) {
        res.status(400).json(error.message);
    }
})*/

/*app.post('/comment/like', async (req, res) => {
    try {
        let { email, comment } = req.body;
        let like = await Like.create({ email });
        comment = await Comment.findById(comment);
        comment.likes.push(like);
        await comment.save()
        res.status(200).json(comment);
    } catch (error) {
        res.status(400).json(error.message);
    }
})

app.post('/comment/dislike', async (req, res) => {
    try {
        let { email, comment } = req.body
        let like = await Like.findOne({ email });
        comment = await Comment.findById(comment);
        let index = comment.likes.findIndex(likeEx => likeEx.toString() == like._id.toString())
        comment.likes.splice(index, 1);
        comment.save();
        like.delete()
        res.status(200).json(comment);
    } catch (error) {
        res.status(400).json(error.message);
    }
})*/
module.exports = router;