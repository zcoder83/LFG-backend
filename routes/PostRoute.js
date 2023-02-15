const Post = require("../models/PostModel");
const router = require("express").Router();

// add Post item
router.post("/save", async (req, res) => {
    try {
        const post = new Post({
            gameName: req.body.gameName,
            title: req.body.title,
            content: req.body.content,
            language: req.body.language,
            discord: req.body.discord,
            password: req.body.password,
        });
        await post.save();
        res.status(201).send("Post successfully saved");
    } catch (error) {
        res.status(500).send(error);
    }
});
// get all posts
router.get("/", async (req, res) => {
    try {
        const posts = await Post.find();
        res.status(200).send(posts);
    } catch (error) {
        res.status(500).send(error);
    }
});

// get post by id
router.get("/:id", async (req, res) => {
    try {
        const posts = await Post.findById(req.params.id);
        res.status(200).send(posts);
    } catch (error) {
        res.status(500).send(error);
    }
});

// update post without password
router.put("/update/:id", async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        (post.gameName = req.body.gameName),
            (post.title = req.body.title),
            (post.content = req.body.content),
            (post.language = req.body.language),
            (post.discord = req.body.discord),
            (post.password = req.body.password),
            await post.save();
        res.status(200).send("Post successfully updated");
    } catch (error) {
        res.status(500).send(error);
    }
});

// update post with password
router.put("/:id", async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (!post) {
            res.status(404).send("No post found with that ID");
        } else if (req.body.password !== post.password) {
            res.status(401).send("Incorrect password");
        } else {
            (post.gameName = req.body.gameName),
                (post.title = req.body.title),
                (post.content = req.body.content),
                (post.language = req.body.language),
                (post.discord = req.body.discord),
                (post.password = req.body.password),
                await post.save();
            res.status(200).send("Post successfully updated");
        }
    } catch (error) {
        res.status(500).send(error);
    }
});

// delete post
router.delete("/:id", async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (!post) {
            res.status(404).send("No post found with that ID");
        } else if (req.body.password !== post.password) {
            res.status(401).send("Incorrect password");
        } else {
            await Post.findByIdAndDelete(req.params.id);
            res.status(200).send("Post successfully deleted");
        }
    } catch (error) {
        res.status(500).send(error);
    }
});

// export router
module.exports = router;
