import React from "react";
import Menu from "./Menu";
import "./Base.css";
const Base = ({
  title = "My Title",
  description = "My desription",
  className = "bg-dark text-white p-4",
  children,
}) => (
  <div>
    <Menu />
    <div className="container-fluid">
      <div className="jumbotron bg-dark text-white text-center">
        <h2 className="display-4">{title}</h2>
        <p className="lead">{description}</p>
      </div>
      <div className={className}>{children}</div>
    </div>
    <footer className="footer bg-dark mt-auto py-3">
      <div className="container-fluid bg-success text-white text-center py-3">
        <h4>If you got any questions, feel free to reach out!</h4>
        <button className="btn btn-warning btn-lg">Contact Me</button>
        <div className="center">
          <a
            href="https://www.facebook.com/01Utkarshh10"
            className="fa fa-facebook"
          ></a>
          <a
            href="https://twitter.com/utkarshh0110"
            target="_blank"
            className="fa fa-twitter"
          ></a>
          <a
            href="https://www.linkedin.com/in/utkarshtiwari996/"
            target="_blank"
            className="fa fa-linkedin"
          ></a>
          <a
            href="https://www.instagram.com/utkarshh_01"
            target="_blank"
            className="fa fa-instagram"
          ></a>
          <a
            href="https://github.com/Utkarshh0110"
            target="_blank"
            className="fa fa-github"
          ></a>
        </div>
      </div>
      <div className="container">
        <span className="text-muted">
          An Amazing <span className="text-white">MERN</span> Bootcamp
        </span>
      </div>
    </footer>
  </div>
);

export default Base;
