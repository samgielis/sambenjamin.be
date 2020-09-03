import React from "react";
import { Footer } from "./Footer";
import { AUTHOR } from "./model/Author";
import ScrollToTop from "./ScrollToTop";
import './Layout.css';

const Layout: React.FC = ({ children }) => {
  return (
    <ScrollToTop>
      {children}
      <Footer author={AUTHOR}></Footer>
    </ScrollToTop>
  );
};

export default Layout;