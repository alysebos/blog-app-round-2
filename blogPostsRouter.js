const express = require('express');
const router = express.Router();

const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();

const { BlogPosts } = require('./models');

const { checkFields, checkUpdateFields } = require('./post-checker');

// Create fake posts
BlogPosts.create("Alyse Rocks", "For real Alyse is the best. You wouldn't believe how amazing she is.", "Alyse", "October 3rd");
BlogPosts.create("Alex sucks", "For real Alex is the worst. You wouldn't believe how terrible he is", "Alex");
BlogPosts.create("Alyse Rocks", "For real Alyse is the best. You wouldn't believe how amazing she is.", "Alyse", "October 3rd");
BlogPosts.create("Alex sucks", "For real Alex is the worst. You wouldn't believe how terrible he is", "Alex");
BlogPosts.create("Alyse Rocks", "For real Alyse is the best. You wouldn't believe how amazing she is.", "Alyse", "October 3rd");
BlogPosts.create("Alex sucks", "For real Alex is the worst. You wouldn't believe how terrible he is", "Alex");
BlogPosts.create("Alyse Rocks", "For real Alyse is the best. You wouldn't believe how amazing she is.", "Alyse", "October 3rd");
BlogPosts.create("Alex sucks", "For real Alex is the worst. You wouldn't believe how terrible he is", "Alex");
BlogPosts.create("Alyse Rocks", "For real Alyse is the best. You wouldn't believe how amazing she is.", "Alyse", "October 3rd");
BlogPosts.create("Alex sucks", "For real Alex is the worst. You wouldn't believe how terrible he is", "Alex");

router.get('/', (req, res) => {
	console.log('retreiving posts');
	res.json(BlogPosts.get());
})

router.post('/', jsonParser, (req, res) => {
	const missingField = checkFields(req.body);
	if (missingField) {
		let msg = `${missingField} not specified`;
		console.error(msg);
		res.status(400).send(msg);
	} else {
		console.log('creating a new post');
		if (req.body.publishDate) {
			newPost = BlogPosts.create(req.body.title, req.body.content, req.body.author, req.body.publishDate);
			res.status(201).json(newPost);
		} else {
			newPost = BlogPosts.create(req.body.title, req.body.content, req.body.author);
			res.status(201).json(newPost);
		}
	}
})

router.delete('/:id', (req, res) => {
	const id = req.params.id;
	BlogPosts.delete(id);
	msg = `Blog post with id ${id} has been deleted`;
	console.log(msg);
	res.status(204).end();
})

router.put('/:id', jsonParser, (req, res) => {
	const id = req.params.id;
	const missingField = checkUpdateFields(req.body);
	if (missingField) {
		let msg = `${missingField} not specified`;
		console.error(msg);
		res.status(400).send(msg);
	}  else if (id !== req.body.id) {
		let msg = `Request body id (${req.body.id}) and path ID ${id} must be the same`;
		console.error(msg);
		res.status(400).send(msg);
	}
	else {
	console.log(`updating post ${id}`);
		post = BlogPosts.posts.find(x => (x.id === id));
		Object.assign(post, {title: req.body.title, content: req.body.content, author: req.body.author, publishDate: req.body.publishDate || post.publishDate});
		BlogPosts.update(post);
		res.status(201).send(post);
	}
})

module.exports = router;