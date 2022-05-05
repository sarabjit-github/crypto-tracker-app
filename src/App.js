import "./App.css";
import { useEffect, useState } from "react";
import {
  Navbar,
  Homepage,
  Cryptocurrencies,
  News,
  CryptoDetails,
  About,
} from "./Components";
import { Link, Routes, Route, NavLink } from "react-router-dom";
import MenuIcon from "@mui/icons-material/MenuOutlined";
import HomeIcon from "@mui/icons-material/HomeOutlined";
import CurrencyBitcoinIcon from "@mui/icons-material/CurrencyBitcoinOutlined";
import NewspaperIcon from "@mui/icons-material/NewspaperOutlined";
import InfoIcon from "@mui/icons-material/InfoOutlined";
import CloseIcon from '@mui/icons-material/Close';

export const App = () => {

  const [upperNavbar, setUpperNavbar] = useState("-230px")
  
  const showNavbar = ()=>{
    setUpperNavbar("0px")
  }
  const hideNavbar = ()=>{
    setUpperNavbar("-230px")
  }
  
  const logoIcon = "https://img.icons8.com/ultraviolet/2x/bitcoin.png";
 
  return (
    <>
      <div className="App">
        {/* Upper navbar */}
        <div className="upper-navbar-showcase">
            <div className="logo-icon-showcase">
              <Link to="/" className="main-logo">
                <img src={logoIcon} alt="logo" width={40} height={40} />
                <h2>
                  Crypto<span>city</span>
                </h2>
              </Link>
            </div>
            <div className="menu-icon">
              <MenuIcon fontSize="large" className="hamburger-icon" onClick={showNavbar} />
            </div>
        </div>
        <div className="upper-navbar-real" style={{right: `${upperNavbar}`}}>
        <div className="menu-icon">
              <CloseIcon fontSize="large" className="hamburger-icon" onClick={hideNavbar} />
            </div>
        <div className="upper main-menu">
              <NavLink to="/" className="a" activeclassname="active-link">
                <li>
                  <HomeIcon
                    titleAccess="Home"
                    fontSize="large"
                    className="fit-icon"
                  />
                  <span>Home</span>
                </li>
              </NavLink>
              <NavLink to="/cryptocurrencies" className="a">
                <li>
                  <CurrencyBitcoinIcon
                    titleAccess="Cryptocurrency"
                    fontSize="large"
                    className="fit-icon"
                  />
                  <span>Cryptocurrencies</span>
                </li>
              </NavLink>
              <NavLink to="/news" className="a">
                <li>
                  <NewspaperIcon
                    titleAccess="News"
                    fontSize="large"
                    className="fit-icon"
                  />
                  <span>News</span>
                </li>
              </NavLink>
              <NavLink to="/about" className="a">
                <li>
                  <InfoIcon
                    titleAccess="About"
                    fontSize="large"
                    className="fit-icon"
                  />
                  <span>About</span>
                </li>
              </NavLink>
            </div>
        </div>
        {/* Upper navbar end */}
        <div className="navbar">
          <nav>
            <div className="logo-menu">
              <div className="logo-icon">
                <Link to="/" className="main-logo">
                  <img src={logoIcon} alt="logo" width={40} height={40} />
                  <h2>
                    Crypto<span>city</span>
                  </h2>
                </Link>
              </div>
            </div>
            <div className="main-menu">
              <NavLink to="/" className="a" activeclassname="active-link">
                <li>
                  <HomeIcon
                    titleAccess="Home"
                    fontSize="large"
                    className="fit-icon"
                  />
                  <span>Home</span>
                </li>
              </NavLink>
              <NavLink to="/cryptocurrencies" className="a">
                <li>
                  <CurrencyBitcoinIcon
                    titleAccess="Cryptocurrency"
                    fontSize="large"
                    className="fit-icon"
                  />
                  <span>Cryptocurrencies</span>
                </li>
              </NavLink>
              <NavLink to="/news" className="a">
                <li>
                  <NewspaperIcon
                    titleAccess="News"
                    fontSize="large"
                    className="fit-icon"
                  />
                  <span>News</span>
                </li>
              </NavLink>
              <NavLink to="/about" className="a">
                <li>
                  <InfoIcon
                    titleAccess="About"
                    fontSize="large"
                    className="fit-icon"
                  />
                  <span>About</span>
                </li>
              </NavLink>
            </div>
          </nav>
        </div>
        <div className="main">
          <Routes>
            <Route exact path="/" element={<Homepage />} />
            <Route
              exact
              path="/cryptocurrencies"
              element={<Cryptocurrencies />}
            />
            <Route exact path="/crypto/:coinId" element={<CryptoDetails />} />
            <Route exact path="/news" element={<News />} />
            <Route exact path="/about" element={<About />} />
          </Routes>
        </div>
      </div>
    </>
  );
};
