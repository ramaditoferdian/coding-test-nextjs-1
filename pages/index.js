import Head from 'next/head';
import styles from '../styles/Home.module.css';
import Card from '../components/elements/Card/Card';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Dropdown from '../components/elements/Dropdown/Dropdown';
import Input from '../components/elements/Input/Input';
import moment from 'moment';

export default function Home() {

  const [news, setNews] = useState([])
  const [filteredNews, setFilteredNews] = useState([])

  const [isLoading, setIsLoading] = useState(false);

  const [sortBy, setSortBy] = useState('descending');
  const listSortBy = ['ascending', 'descending'];
  const [inputValue, setInputValue] = useState('');

  const [selectedCategory, setSelectedCategory] = useState('business')
  const categories = [
    'business',
    'entertainment',
    'general',
    'health',
    'scince',
    'sports',
    'technology'
  ];

  const handleSelectCategory = (option) => {
    setSelectedCategory(option)
    setSortBy('descending')
  };

  const handleSelectSort = (option) => {
    setSortBy(option)

    handleSortByDate(option);
  };

  const handleInputChange = (value) => {
    setInputValue(value);
    console.log(value);

    if (value) {
      const results = searchByAuthorOrTitle(value);
      console.log(results);
      setFilteredNews(results);
    }else{
      setFilteredNews(news);
    }
  };

  const getNews = async () => {
    setIsLoading(true);
    try {
      const {data} =  await axios.get(`https://newsapi.org/v2/top-headlines?country=us&category=${selectedCategory}&q=${inputValue}&apiKey=8559b2b95a114a4f9440270383b6a5a8`)
      setNews(data.articles)
      setFilteredNews(data.articles)
      setIsLoading(false);
    } catch (err) {
      console.log(err);
      setNews([])
      setFilteredNews([])
      setIsLoading(false);
    }
  }

  const sortByDateAscending = (data) => {
    return data.sort((a, b) => new Date(a.publishedAt) - new Date(b.publishedAt));
  };

  const sortByDateDescending = (data) => {
    return data.sort((a, b) => new Date(b.publishedAt) - new Date(a.publishedAt));
  };

  const handleSortByDate = (option) => {
    
    let sorted = [];
    if (option === 'ascending') {
      sorted = sortByDateAscending(news);
      setNews(sorted);
    }else{
      sorted = sortByDateDescending(news);
      setNews(sorted);
    }
  }

  const searchByAuthorOrTitle = (searchQuery) => {
    const query = searchQuery.toLowerCase();
    return news.filter(item => {
      console.log(item);
      const { author, title } = item;
      return (
        author?.toLowerCase().includes(query) ||
        title?.toLowerCase().includes(query)
      );
    });
  }

  useEffect(() => {
    getNews();
  }, [selectedCategory])

  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
      </Head>

      <main className={styles.main}>
        <div className={styles['action']}>
          <Dropdown
            label="Select a Category"
            options={categories}
            onSelect={handleSelectCategory}
            initialValue={selectedCategory}
          />
          <Dropdown
            label="Select short by"
            options={listSortBy}
            onSelect={handleSelectSort}
            initialValue={sortBy}
          />
          <Input
            label="Search by title and author"
            onChange={handleInputChange}
            value={inputValue}
          />
        </div>
        {isLoading ? 
          
          (
            <div className={styles.grid}>
              Loading...
            </div>
          )
            :
          (
            <>
              {filteredNews.length > 0 
                ? 
                (<div className={styles.grid}>
                  {filteredNews.map((item, index) => {
                    return(
                      <Card
                        key={index}
                        title={item.title}
                        author={item.author}
                        publishedAt={moment(item.publishedAt).format('MMMM Do YYYY, h:mm:ss a')}
                      />
                    )
                  })}
                </div>)
                :
                <div className={styles.grid}>
                  News not Found
                </div>
              }
            </>
          )
          
        }
        
      </main>
    </div>
  );
}
