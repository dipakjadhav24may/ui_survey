import React, { Component } from "react";

class Footer extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <footer
        id="sticky-footer"
        className=" container-fluid page-footer py-3 bg-dark text-white-50"
      >
        <div className="container text-center">
          <small>&copy; 2020 Radioactive</small>
        </div>
      </footer>
    );
  }
}

export default Footer;
