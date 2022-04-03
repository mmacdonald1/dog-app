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
            <img className="profile-pic" src={props.dogPic} />
          </Col>
          <Col className="content-col">
            <div>
              <p className="name">
                {props.name}
                <span className="age"> - {props.age}</span>
              </p>
            </div>

            <p className="bio">{props.bio}</p>
            <ButtonBar createProfile={props.createProfile} />
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
};

export default DogCard;
