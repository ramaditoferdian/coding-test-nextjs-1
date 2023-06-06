import React from "react";
import styles from "./index.module.css";

const Card = ({
  title,
  author,
  publishedAt,
}) => {

  return (
    <a href={`/${title}`} className={styles.card}>
      <h3 className={styles['card__title']}>{title}</h3>
      <p className={styles['card__author']}>{author}</p>
      <p>{publishedAt}</p>
    </a>
  );
}

export default Card;