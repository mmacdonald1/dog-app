import React from "react";
import "./DogCard.css";
import { Card, Row, Col } from "react-bootstrap";
import ButtonBar from "../ButtonBar/ButtonBar";

const DogCard = (props) => {
  return (
    <Card className="dog-card-body">
      <Card.Body>
        <Row>
          <Col>
            <img className="profile-pic" src={props.currentDog.img} />
          </Col>
          <Col className="content-col">
            <div>
              <p className="name">
                {props.currentDog.name}
                <span className="age"> - {props.currentDog.age}</span>
              </p>
            </div>

            <p className="bio">{props.currentDog.bio}</p>
            <ButtonBar
              currentDog={props.currentDog}
              handleLike={props.handleLike}
              handleReject={props.handleReject}
              handleForward={props.handleForward}
              handleBack={props.handleBack}
            />
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
};

export default DogCard;
