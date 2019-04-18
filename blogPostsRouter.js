const express = require('express');
const router = express.Router();

const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();

const { BlogPosts } = require('./models');

// Create fake posts
BlogPosts.create("Alyse Rocks", "For real Alyse is the best. You wouldn't believe how amazing she is.", "Alyse", "October 3rd");
BlogPosts.create("Alex sucks", "For real Alex is the worst. You wouldn't believe how terrible he is", "Alex");

router.get('/', (req, res) => {
	res.json(BlogPosts.get());
})

module.exports = router;