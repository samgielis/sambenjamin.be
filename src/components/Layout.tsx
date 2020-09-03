import React, { useEffect } from "react";
import { Footer } from "./Footer";
import { AUTHOR } from "./model/Author";
import ScrollToTop from "./ScrollToTop";
import "./Layout.css";
import ReactGA from "react-ga";

const Layout: React.FC = ({ children }) => {
  useEffect(() => {
    ReactGA.initialize("UA-161391381-1");
  });
  return (
    <ScrollToTop>
      {children}
      <Footer author={AUTHOR}></Footer>
    </ScrollToTop>
  );
};

export default Layout;
