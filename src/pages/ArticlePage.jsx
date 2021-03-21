import React from "react";
import articleContent from "./article-content";

const ArticlePage = ({ match }) => {
	const name = match.params.name;
	const article = articleContent.find((article) => article.name === name);

	if (!article) {
		return <h1>Article does not exist!</h1>;
	}

	return (
		<>
			<h1>{article.title}</h1>
			<p>
				{article.content.map((paragraph, key) => (
					<p key={key}>{paragraph}</p>
				))}
			</p>
		</>
	);
};

export default ArticlePage;
