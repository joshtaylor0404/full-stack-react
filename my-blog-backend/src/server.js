import express from "express";

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/hello", (req, res) => {
	res.send("Hello!");
});

app.get("/hello/:name", (req, res) => {
	const { name } = req.params;

	res.send(`Hello ${name}!`);
});

app.post("/hello", (req, res) => {
	const { name } = req.body;

	res.send(`Hello ${name}!`);
});

app.listen(8000, () => {
	console.log("Listening on port 8000");
});
