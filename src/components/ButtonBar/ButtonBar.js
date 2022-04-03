import React from "react";
import "./ButtonBar.css";
import { Button } from "react-bootstrap";
import heart from "../../assets/heart.png";
import close from "../../assets/close.png";
import undo from "../../assets/undo.png";

const ButtonBar = (props) => {
  return (
    <div className="button-bar-div">
      <div className="button-div" onClick={props.createProfile}>
        <img className="heart-icon" src={heart} />
      </div>
      <div className="button-div" onClick={props.createProfile}>
        <img className="close-icon" src={close} />
      </div>
      <div className="button-div" onClick={props.createProfile}>
        <img className="undo-icon" src={undo} />
      </div>
    </div>
  );
};

export default ButtonBar;
