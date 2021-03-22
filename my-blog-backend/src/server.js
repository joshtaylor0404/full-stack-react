import express from "express";
import { MongoClient } from "mongodb";

// setup & configure express
const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const withDB = async (operations, res) => {
	try {
		const client = await MongoClient.connect("mongodb://localhost:27017", {
			useNewUrlParser: true,
		});
		const db = client.db("my-blog");

		await operations(db);

		client.close();
	} catch (error) {
		const err = {
			name: error.name,
			message: "There was an error.",
			details: error.message,
		};
		res.status(500).json(err);
	}
};

// setup & configure endpoints
// app.get("/api/articles", (req, res) => {
// 	try {

// 	} catch (error) {
// 		res.status(500).json({ message: "There was an error.", error })
// 	}
// });

app.get("/api/articles/:name", (req, res) => {
	withDB(async (db) => {
		const { name } = req.params;
		const articleInfo = await db.collection("articles").findOne({ name });

		res.status(200).json(articleInfo);
	}, res);
});

app.post("/api/articles/:name/upvote", (req, res) => {
	withDB(async (db) => {
		const { name } = req.params;

		const articleInfo = await db.collection("articles").findOne({ name });

		await db
			.collection("articles")
			.updateOne(
				{ name },
				{ $set: { upvotes: (articleInfo.upvotes || 0) + 1 } }
			);

		const updatedArticleInfo = await db
			.collection("articles")
			.findOne({ name });

		res.status(200).json(updatedArticleInfo);
	}, res);
});

app.post("/api/articles/:name/comments", (req, res) => {
	withDB(async (db) => {
		const { name } = req.params;
		const { username, text } = req.body;

		const articleInfo = await db.collection("articles").findOne({ name });

		await db.collection("articles").updateOne(
			{ name },
			{
				$set: { comments: [...articleInfo.comments, { username, text }] },
			}
		);

		const updatedArticleInfo = await db
			.collection("articles")
			.findOne({ name });

		res.status(201).json(updatedArticleInfo);
	}, res);
});

app.listen(8000, () => {
	console.log("Listening on port 8000");
});
