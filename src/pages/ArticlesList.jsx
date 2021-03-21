import React from "react";
import { Link } from "react-router-dom";
import articleContent from "./article-content";

const ArticlePage = () => {
	return (
		<>
			<h1>Articles</h1>
			{articleContent.map((article, key) => (
				<Link className="article-list-item" to={`/article/${article.name}`} key={key}>
					<h3>{article.title}</h3>
					<p>{article.content[0].substring(0, 150)}...</p>
				</Link>
			))}
		</>
	);
};

export default ArticlePage;
