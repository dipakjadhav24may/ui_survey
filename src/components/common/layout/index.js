import React from "react";
import Header from "../header";
import Footer from "../footer";

const Layout = ({ showHF, children }) => {
  return (
    <div>
      {showHF ? <Header /> : null}
      {children}
      {showHF ? <Footer /> : null}
    </div>
  );
};

export default Layout;
