import React, { useState, useEffect } from "react";
import placeholder from "../assets/images/placeholder.jpg";
import Loader from "./Loader";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";

const FeaturedNews = ({pageSize = 9, country = 'us', category = 'general', ...props}) => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);

  const capitalizeFirstLetter = (string) =>
    string.charAt(0).toUpperCase() + string.slice(1);

  useEffect(() => {
    document.title = `Newsify - ${capitalizeFirstLetter(category)}`;
  }, [page,category]);

  const updateNews = async () => {
    props.setProgress(0);
    setLoading(true);
    const data = await fetch(
      `https://newsapi.org/v2/top-headlines?country=${country}&category=${category}&apiKey=90aa4b320fdc41c28fdce5c9fa9d54e4&page=${page}&pageSize=${pageSize}`
    );
    const parsedData = await data.json();
    props.setProgress(50);
    setArticles(parsedData.articles);
    setTotalResults(parsedData.totalResults);
    setLoading(false);
    props.setProgress(100);
  };

  useEffect(() => {
    updateNews();
  }, []);

  const fetchMoreData = async () => {
    setPage(page + 1); // Properly increment the page number
    let data = await fetch(
      `https://newsapi.org/v2/top-headlines?country=${country}&category=${category}&apiKey=90aa4b320fdc41c28fdce5c9fa9d54e4&page=${page + 1}&pageSize=${pageSize}`
    );
    setLoading(true);
    let parsedData = await data.json();
    setArticles((prevArticles) => prevArticles.concat(parsedData.articles));
    setTotalResults(parsedData.totalResults);
    setLoading(false);
  };

  return (
    <section className="my-5">
      {loading && <Loader />}
      <InfiniteScroll
        dataLength={articles.length}
        next={fetchMoreData}
        hasMore={articles.length < totalResults}
        loader={<Loader />}
      >
        <div className="container">
          <div className="row">
            {articles.map((element) => {
              const formattedDate = new Date(
                element.publishedAt
              ).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              });
              return (
                <div key={`${element.url}-${element.publishedAt}`} className="col-md-4 mb-4">
                  <div className="card">
                    <img
                      src={element.urlToImage || placeholder}
                      className="card-img-top"
                      alt="..."
                    />
                    <div className="card-body">
                      <span>{formattedDate}</span>
                      <h5 className="card-title">{element.title}</h5>
                      <p className="card-text">{element.description}</p>
                      <a
                        href={element.url}
                        className="btn btn-primary"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Read More
                      </a>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </InfiniteScroll>
    </section>
  );
};

FeaturedNews.propTypes = {
  country: PropTypes.string,
  pageSize: PropTypes.number,
  category: PropTypes.string,
};

export default FeaturedNews;
