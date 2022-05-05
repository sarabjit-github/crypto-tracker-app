import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useGetCryptoNewsQuery } from "../services/cryptoNewsApi";
import { useGetCryptosQuery } from "../services/cryptoApi";
import moment from "moment";
import Loader from "./Loader";
import Footer from "./Footer";

const News = ({simplified}) => {
  const [newsCategory, setNewsCategory] = useState("Cryptocurrency");
  const { data: cryptoNews } = useGetCryptoNewsQuery({
    newsCategory,
    count: simplified ? 6 : 12,
  });
  const { data } = useGetCryptosQuery(100);

  if (!cryptoNews?.value) return <Loader />;

  const demoImage =
    "https://images.unsplash.com/photo-1631897642056-97a7abff6818?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTB8fGNyeXB0b2N1cnJlbmN5fGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60";

  return (
    <>
      <div className="news-section">
        {
        !simplified && (
          <div className="newsSelection-container">
            <div className="news-selection cryptos-search">
              <select
              
                name="news"
                id="news"
                value={newsCategory}
                onChange={(e) => setNewsCategory(e.target.value)}
              >
                <option value="Cryptocurrency">Cryptocurrency</option>
                {data?.data?.coins.map((coin) => (
                  <option value={coin.name}>{coin.name}</option>
                ))}
              </select>
            </div>
          </div>
        )}

        <div className="newsSection-container">
          <div className="news-box">
            {cryptoNews.value.map((news,i) => (
                  <a href={news.url} key={i} target="_blank">
                    <div className="newsBox-container">
                      <div className="news-header">
                        <h3>{news.name}</h3>
                        <img
                          src={news?.image?.thumbnail?.contentUrl || demoImage}
                          alt="news image"
                        />
                      </div>
                      <div className="news-content">
                        <p>
                          {news.description > 100
                            ? `${news.description.substring(0, 100)}...`
                            : news.description}
                        </p>
                      </div>
                      <div className="news-footer">
                        <div className="news-admin">
                          <img
                            src={
                              news.provider[0]?.image?.thumbnail?.contentUrl ||
                              demoImage
                            }
                            alt="news admin image"
                          />
                          <p>{news.provider[0]?.name}</p>
                        </div>
                        <div className="news-time">
                          <p>
                            {moment(news.datePublished).startOf("ss").fromNow()}
                          </p>
                        </div>
                      </div>
                    </div>
                  </a>
                ))}
          </div>
        </div>
      </div>
      {
        !simplified && (
          <Footer/>
        )
      }
    </>
  );
};

export default News;
