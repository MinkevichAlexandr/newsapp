import React from "react";
import Toolbar from "../../components/toolbar.jsx";
import Article from "../../components/article.jsx";
import styles from "../../styles/Feed.module.css";
import { useRouter } from "next/router";
import clsx from "clsx";

export default function Feed({ pageNumber, articles }) {
  const router = useRouter();
  return (
    <div>
      <Toolbar />

      <div className={styles.articles}>
        {articles.map((article, id) => (
          <Article
            source={article.source.name}
            author={article.author}
            title={article.title}
            description={article.description}
            url={article.url}
            content={article.content}
            image={
              article.urlToImage
                ? article.urlToImage
                : "https://i.stack.imgur.com/y9DpT.jpg"
            }
            date={article.publishedAt}
            key={id}
          />
        ))}
      </div>
      <div className={styles.paginator}>
        <div
          className={clsx(
            styles.pageButton,
            pageNumber === 1 && styles.disabled
          )}
          onClick={() => {
            if (pageNumber > 1) {
              router.push(`/feed/${pageNumber - 1}`);
            }
          }}
        >
          Previous
        </div>
        <div className={styles.pageNumber}>{pageNumber} / 5</div>
        <div
          className={clsx(
            styles.pageButton,
            pageNumber === 5 && styles.disabled
          )}
          onClick={() => {
            if (pageNumber < 5) {
              router.push(`/feed/${pageNumber + 1}`);
            }
          }}
        >
          Next
        </div>
      </div>
    </div>
  );
}

export const getServerSideProps = async (PageContext) => {
  const { pId } = PageContext.query;

  if (pId < 1 || pId > 5) {
    return {
      props: {
        articles: [],
        pageNumber: 1,
      },
    };
  }
  const articlesData = await fetch(
    `https://newsapi.org/v2/top-headlines?country=us&pageSize=6&page=${pId}`,
    {
      headers: {
        Authorization: `Bearer ${process.env.NEWS_API_KEY}`,
      },
    }
  );
  const { articles } = await articlesData.json();
  console.log(articles);
  return {
    props: {
      pageNumber: Number.parseInt(pId),
      articles,
    },
  };
};
