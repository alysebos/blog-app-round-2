const chai = require('chai');
const chaiHttp = require('chai-http');

const { app, runServer, closeServer } = require('../server');

const expect = chai.expect;

chai.use(chaiHttp);

describe("Blog API", function () {
	before(function() {
		return runServer();
	});

	after(function() {
		return closeServer();
	});

	it("should list blog posts on GET request", function() {
		return chai
			.request(app)
			.get("/blog-posts")
			.then(function(res) {
				expect(res).to.have.status(200);
				expect(res).to.be.json;
				expect(res.body).to.be.an("array");
				expect(res.body.length).to.be.at.least(1);
				const expectedKeys = ["id", "title", "content", "author", "publishDate"];
				res.body.forEach(function (post) {
					expect(post).to.be.an("object");
					expect(post).to.include.keys(expectedKeys);
				})
			});
	});

	it("should create new posts on POST request", function() {
		const newPost = {
			title: "Neopets is the best!",
			content: "I will play Neopets for the rest of my life, even if it goes down, I'd buy the source code to have my own version running.",
			author: "Alyse"
		};
		return chai
			.request(app)
			.post("/blog-posts")
			.send(newPost)
			.then(function(res) {
				expect(res).to.have.status(201);
				expect(res).to.be.json;
				expect(res.body).to.be.an("object");
				const expectedKeys = ["id", "title", "content", "author", "publishDate"];
				expect(res.body).to.include.keys(expectedKeys);
				expect(res.body.title).to.equal(newPost.title);
			})
	})

	it("should delete posts on DELETE request", function() {
		return chai
			.request(app)
			.get("/blog-posts")
			.then(function(res) {
				const idToTest = res.body[0].id;
				return chai
					.request(app)
					.delete(`/blog-posts/${idToTest}`)
					.then(function (res) {
						expect(res).to.have.status(204);
					})
					.then(function (res) {
						return chai
							.request(app)
							.get("/blog-posts")
							.then(function(res) {
								let deletedPost = res.body.find(function(post) {
									post.id === idToTest;
								});
								expect(deletedPost).to.not.be.ok;
							})
					})
			})
	})

	it("should update posts on PUT request", function() {
		const newPost = {
			title: "This is an updated post",
			content: "This is the content inside the updated post.",
			author: "Alyse Marie"
		};
		return chai
			.request(app)
			.get("/blog-posts")
			.then(function(res) {
				newPost.id = res.body[0].id;
				return chai
					.request(app)
					.put(`/blog-posts/${res.body[0].id}`)
					.send(newPost)
					.then(function(res) {
						const expectedKeys = ["id", "title", "content", "author", "publishDate"];
						expect(res).to.have.status(201);
						expect(res.body).to.be.an("object");
						expect(res.body).to.include.keys(expectedKeys);
						expect(res.body.author).to.equal(newPost.author);
						expect(res.body.title).to.equal(newPost.title);
						expect(res.body.content).to.equal(newPost.content);
						expect(res.body.id).to.equal(newPost.id);
					})
			})
	})
})