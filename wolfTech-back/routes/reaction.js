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
router.delete('/delete/:_id', async (req, res) => {
    console.log(req.params);
    await reaction.findByIdAndDelete(req.params)
    res.json('delete success')
});
router.get("/stats", async (req, res) => {

    try {
        const data = await reaction.aggregate([

            {
                $group: {
                    _id,
                    total: { $sum: 1 },
                },
            },
            
        ]);
        res.status(200).json(data)
    }
    catch (err) {
        res.status(500).json(err)
    }
}
)
module.exports = router;