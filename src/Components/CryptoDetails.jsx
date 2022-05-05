import React from "react";
import { useState } from "react";
import {
  useGetCryptoDetailsQuery,
  useGetCryptoHistoryQuery
} from "../services/cryptoApi";
import millify from "millify";
import { useParams, Link } from "react-router-dom";
import MonetizationOnOutlinedIcon from "@mui/icons-material/MonetizationOnOutlined";
import FlashOnOutlinedIcon from "@mui/icons-material/FlashOnOutlined";
import TagOutlinedIcon from "@mui/icons-material/TagOutlined";
import EmojiEventsOutlinedIcon from "@mui/icons-material/EmojiEventsOutlined";
import HTMLReactParser from "html-react-parser";
import LineChart from "./LineChart";
import Loader from "./Loader";
import Footer from "./Footer";

const CryptoDetails = () => {
  const [timePeriod, setTimePeriod] = useState("24h")
  const { coinId } = useParams();
  const { data: cryptoDetail, isFetching } = useGetCryptoDetailsQuery(coinId);
  // console.log(cryptoDetail);
  const { data: cryptoHistory, isFetching: isFetch2 } = useGetCryptoHistoryQuery({coinId, timePeriod});

  if (isFetching) return <Loader />;
  if (isFetch2) return <Loader />;
  
  // console.log(cryptoHistory);

  const coinDetails = cryptoDetail?.data?.coin;

  // Accessing object property which name starts with a number
  const coinVolume = coinDetails["24hVolume"];

  const coinLinks = coinDetails?.links;

  // Coin Stats
  const stats = [
    {
      title: "Price to USD",
      value: `$ ${coinDetails?.price && millify(coinDetails?.price)}`,
      icon: <MonetizationOnOutlinedIcon />,
    },
    { title: "Rank", value: coinDetails?.rank, icon: <TagOutlinedIcon /> },
    {
      title: "24h Volume",
      value: `$ ${millify(coinVolume)}`,
      icon: <FlashOnOutlinedIcon />,
    },
    {
      title: "Market Cap",
      value: `$ ${coinDetails?.marketCap && millify(coinDetails?.marketCap)}`,
      icon: <MonetizationOnOutlinedIcon />,
    },
    {
      title: "All-time-high(daily avg.)",
      value: `$ ${
        coinDetails?.allTimeHigh?.price &&
        millify(coinDetails?.allTimeHigh?.price)
      }`,
      icon: <EmojiEventsOutlinedIcon />,
    },
  ];

  return (
    <>
      <div className="cryptoDetails-section">
        <div className="cryptoDetails-container">
          <div className="cryptoDetail-heading">
            <div className="coin-heading">
              <img
                src={`${coinDetails.iconUrl}`}
                alt="Crypto-icon"
                width="30px"
                height="30px"
              />
              <h1>
                <span style={{ color: `${coinDetails.color}` }}>
                  {coinDetails.name}
                </span>{" "}
                Price
              </h1>
            </div>
            <p>
              {coinDetails.name} live price in US dollars. View value
              statistics, market cap and supply.
            </p>
          </div>
          <hr />
          <div className="cryptoDetail-selection">
            <select name="cryptoSelect" id="cryptoSelect"  value={timePeriod} onChange={(e)=>setTimePeriod(e.target.value)}>
              <option value="3h">3h</option>
              <option value="24h">24h</option>
              <option value="7d">7d</option>
              <option value="3m">3m</option>
              <option value="1y">1y</option>
              <option value="3y">3y</option>
              <option value="5y">5y</option>
            </select>
          </div>
          {/* Line Chart */}
          <LineChart coinHistory={cryptoHistory} coinColor={coinDetails?.color} currentPrice={millify(coinDetails.price)} coinName={coinDetails.name} timePeriod={timePeriod} />
        </div>
        <div className="coin-stats">
          <div className="coinStats-heading">
            <h2>
              <span style={{ color: `${coinDetails.color}` }}>
                {coinDetails.name}
              </span>{" "}
              Value Statistics
            </h2>
            <p>An overview shows the stats of {coinDetails.name}</p>
          </div>

          <div className="desc-container">
            {stats.map(({ title, icon, value }) => {
              return (
                <>
                  <div className="coinStats-desc">
                    <h4>
                      <span>{icon} </span>
                      {title}
                    </h4>
                    <p>{value}</p>
                  </div>
                </>
              );
            })}
          </div>
        </div>
        <div className="coin-linkAbout">
          <div className="coin-about-container">
            <h1>
              <span style={{ color: `${coinDetails.color}` }}>
                {coinDetails.name}
              </span>{" "}
              Definition
            </h1>
            <div className="coinAbout-desc">
              <h3>What is {coinDetails.name}?</h3>
              {HTMLReactParser(coinDetails.description)}
            </div>
          </div>
          <div className="coin-link-container">
            <h1>
              <span style={{ color: `${coinDetails.color}` }}>
                {coinDetails.name}
              </span>{" "}
              Links
            </h1>
            <div className="coinLinks">
              {coinLinks.map(({ name, type, url }) => {
                return (
                  <>
                    <div className="coinLink">
                      <p>{type}</p>
                      <a href={url} target="_blank">
                        {name}
                      </a>
                    </div>
                  </>
                );
              })}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default CryptoDetails;
