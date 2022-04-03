import React from "react";
import "./ButtonBar.css";
import { Button } from "react-bootstrap";
import heart from "../../assets/heart.png";
import filledheart from "../../assets/filled-heart.png";
import close from "../../assets/close.png";
import undo from "../../assets/undo.png";
import redo from "../../assets/redo.png";

const ButtonBar = (props) => {
  return (
    <div className="button-bar-div">
      <div className="button-div" onClick={props.handleBack}>
        <img className="undo-icon" src={undo} />
      </div>
      <div className="button-div" onClick={props.handleLike}>
        <img
          className="heart-icon"
          src={props.currentDog.like ? filledheart : heart}
        />
      </div>
      <div className="button-div" onClick={props.handleReject}>
        <img className="close-icon" src={close} />
      </div>
      <div className="button-div" onClick={props.handleForward}>
        <img className="redo-icon" src={redo} />
      </div>
    </div>
  );
};

export default ButtonBar;
