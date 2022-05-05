import millify from "millify";
import React from "react";
import { Link } from "react-router-dom";
import { useGetCryptosQuery } from "../services/cryptoApi";
import Cryptocurrencies from "./Cryptocurrencies";
import News from "./News";
import Loader from "./Loader";
import Footer from "./Footer";

const Homepage = () => {

  const { data, isFetching } = useGetCryptosQuery(10);
  const globalStats = data?.data?.stats;

  if(isFetching) return <Loader />;

  return (
      <>
      
    <div className="homepage">
      <section className="global-stats-container">
        <h1>Global Crypto Stats</h1>
        <div className="global-stats">
          <div className="total-cryptos">
            <h5>Total Cryptocurrencies</h5>
            <p>{globalStats.totalCoins}</p>
          </div>
          <div className="total-exchanges">
            <h5>Total Exchanges</h5>
            <p>{globalStats.totalExchanges}</p>
          </div>
          <div className="total-market-cap">
            <h5>Total Market Cap</h5>
            <p>{millify(globalStats.totalMarketCap)}</p>
          </div>
          <div className="24-volume">
            <h5>Total 24h Volume</h5>
            <p>{millify(globalStats.total24hVolume)}</p>
          </div>
          <div className="total-markets">
            <h5>Total Markets</h5>
            <p>{millify(globalStats.totalMarkets)}</p>
          </div>
        </div>
      </section>
    </div>
    {/* Cryptocurrencies component here */}
    <div className="cryptos-heading">
      <h1>Top 10 Cryptos in the world</h1>
      <Link to='/cryptocurrencies' className="link">Show more</Link>
    </div>
    {/* If you don't set the value to simplified then its by default value is true */}
    <Cryptocurrencies simplified /> 
    <div className="cryptos-heading">
      <h1>Latest Crypto News</h1>
      <Link to='/news' className="link">Show more</Link>
    </div>
    <News simplified />
    <Footer />
    </>
  );
};

export default Homepage;
