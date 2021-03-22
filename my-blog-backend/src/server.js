import express from "express";

const articlesInfo = {
	"learn-react": {
		upvotes: 0,
		comments: [],
	},
	"learn-node": {
		upvotes: 0,
		comments: [],
	},
	"my-thoughts-on-resumes": {
		upvotes: 0,
		comments: [],
	},
};

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.post("/api/articles/:name/upvote", (req, res) => {
	const { name } = req.params;

	articlesInfo[name].upvotes += 1;

	res
		.status(200)
		.send(`${name} now has ${articlesInfo[name].upvotes} upvotes!`);
});

app.post("/api/articles/:name/comments", (req, res) => {
	const { name } = req.params;
	const { username, text } = req.body;

	articlesInfo[name].comments.push({ username, text });

	res.status(201).send(articlesInfo[name]);
});

app.listen(8000, () => {
	console.log("Listening on port 8000");
});
