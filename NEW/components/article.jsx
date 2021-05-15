import React from "react";
import styles from "../styles/Article.module.css";
import moment from "moment";
import { useState, useEffect } from "react";
import Link from "next/link";
import clsx from "clsx";

export default function Article({
  source,
  author,
  title,
  description,
  url,
  image,
  date,
  content,
}) {
  const [expand, setExpand] = useState(false);
  const [time, setTime] = useState(moment(date).fromNow());
  useEffect(() => {
    setExpand(false);
  }, [image]);
  return (
    <div
      className={clsx(
        description ? styles.articleContainer : styles.articleContainerExpanded,
        styles.articleContainer
      )}
    >
      <Link href={url}>
        <a>
          <div className={styles.articleInfo}>
            <div className={styles.articleAuthor}>
              <span>{source}</span>
              {author &&
                (author.length > 25 ? " | Multiple authors" : ` | ${author}`)}
            </div>
            <div
              onMouseEnter={() => {
                setTime(moment(date).calendar());
              }}
              onMouseLeave={() => {
                setTime(moment(date).fromNow());
              }}
              className={styles.articleDate}
            >
              {time}
            </div>
          </div>
          <div className={styles.articleTitle}>{title}</div>
          <img
            src={image}
            className={!description && styles.expandedImg}
            alt="news"
          />
        </a>
      </Link>
      {description && (
        <p
          onClick={() => setExpand(!expand)}
          className={styles.articleDescription}
        >
          {!expand ? description : content}
        </p>
      )}
    </div>
  );
}
