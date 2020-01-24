import React from "react";
import Header from "../header";
import Footer from "../footer";

const Layout = ({ showHF, children }) => {
  return (
    <div className={`layoutContainer ${showHF ? "" : "main"}`}>
      <div className="layoutBody">
        {showHF ? <Header /> : null}
        {children}
      </div>
      {showHF ? <Footer /> : null}
    </div>
  );
};

export default Layout;
