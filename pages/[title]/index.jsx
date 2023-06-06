import axios from "axios";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import styles from "./index.module.css"


const DetailNewsPage = () => {
	const router = useRouter();
	const [news, setNews] = useState();

	const [isLoading, setIsLoading] = useState(false);

	const title = router.query.title
	
	const getNewsByTitle = async () => {
		setIsLoading(true);
    try {
      const {data} =  await axios.get(`https://newsapi.org/v2/top-headlines?country=us&category=business&q=${title}&apiKey=8559b2b95a114a4f9440270383b6a5a8`)
      setNews(data.articles[0])
			setIsLoading(false);
    } catch (err) {
      console.log(err);
			setIsLoading(false);
    }
  }

	useEffect(() => {
		getNewsByTitle();
		console.log(news);
	},[router.query.title]);

	if (isLoading) {
		return(
			<div className={styles['detail-news']}>
				Loading...
			</div>
		)
	}

	return (
		<div className={styles['detail-news']}>
			<h1>{news?.title}</h1>
			<div className={styles['detail-news__img-placeholder']}>
				<img src={news?.urlToImage } alt="news" loading="lazy" />
			</div>
			<p>{news?.content ? news.content : "Content Not Available"}</p>
		</div>
	);
}

export default DetailNewsPage;