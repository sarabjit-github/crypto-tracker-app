import millify from "millify";
import React from "react";
import { Link } from "react-router-dom";
import { useGetCryptosQuery } from "../services/cryptoApi";
import Loader from "./Loader";
import Footer from "./Footer";
import { useState, useEffect } from "react";

const Cryptocurrencies = ({ simplified }) => {
  const count = simplified ? 10 : 100;

  // Using a query hook automatically fetches data and returns query values
  const { data, isFetching } = useGetCryptosQuery(count);
  const [allCryptos, setAllCryptos] = useState(data?.data?.coins);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    // setAllCryptos(data?.data?.coins);
    const filterData = data?.data?.coins.filter((coin) =>
      coin.name.toLowerCase().includes(searchTerm)
    );
    setAllCryptos(filterData);
  }, [data, searchTerm]);

  if (isFetching) return <Loader />;


  return (
    <>
      <div className="cryptos-section">
        {!simplified && (
          <div className="cryptos-search">
            <input
              type="text"
              placeholder="Search Cryptocurrencies"
              onChange={(e) => setSearchTerm(e.target.value.toLowerCase())}
            />
          </div>
        )}
        <div className="cryptos-container">
          {allCryptos?.map((crypto) => (
            <Link
              to={`/crypto/${crypto.uuid}`}
              className="link"
              key={crypto.uuid}
            >
              <div className="crypto-box">
                <div className="crypto-box-header">
                  <h3 style={{ color: `${crypto.color}` }}>
                    {crypto.rank}. {crypto.name}
                  </h3>
                  <img
                    src={`${crypto.iconUrl}`}
                    alt="Crypto-icon"
                    width="30px"
                    height="30px"
                  />
                </div>
                <div className="crypto-box-body">
                  <p>Price: {millify(crypto.price)}</p>
                  <p>Market Cap: {millify(crypto.marketCap)}</p>
                  <p>Daily Change: {crypto.change}%</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
      {!simplified && <Footer />}
    </>
  );
};

export default Cryptocurrencies;
