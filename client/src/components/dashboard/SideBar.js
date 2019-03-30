import React, { Component } from "react";
import { Link } from "react-router-dom";

class SideBar extends Component {
  handleLogout = () => {
    localStorage.removeItem("token");
    window.location.assign("/");
  };

  render() {
    return (
      <div className="sidebar-wrapper">
        <nav className="nav flex-column">
          <Link className="nav-link active" to="/dashboard/bar">
            Show Bar Graph
          </Link>
          <Link className="nav-link " to="/dashboard/pie">
            Show Pie Chart
          </Link>
          <button
            onClick={this.handleLogout}
            className="nav-link active btn btn-link"
            to="/"
          >
            Logout
          </button>
        </nav>
      </div>
    );
  }
}

export default SideBar;
