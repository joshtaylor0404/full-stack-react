import express from "express";

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());



app.listen(8000, () => {
	console.log("Listening on port 8000");
});
