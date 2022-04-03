import React, { useState, useEffect, useCallback } from "react";
import "./App.css";
import DogCard from "./components/DogCard/DogCard";
import dog from "./assets/dog.png";

const App = () => {
  const [dogPic, setDogPic] = useState("");
  const [bio, setBio] = useState("");
  const [name, setName] = useState("");
  const [age, setAge] = useState(0);
  const [que, setQue] = useState([]);

  const getDogImage = useCallback(() => {
    fetch("https://dog.ceo/api/breeds/image/random")
      .then((response) => response.json())
      .then((data) => setDogPic(data.message));
  }, [dogPic]);

  const getDadJoke = useCallback(() => {
    fetch("https://icanhazdadjoke.com", {
      method: "get",
      headers: {
        Accept: "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => setBio(data.joke));
  }, [bio]);

  const getFakerInfo = useCallback(() => {
    fetch(
      "https://fakerapi.it/api/v1/persons?_quantity=1&_gender=male&_birthday_start=2005-01-01"
    )
      .then((response) => response.json())
      .then((data) => {
        setName(data.data[0].firstname);
        setAge(() => {
          let birthYear = data.data[0].birthday.split("-")[0];
          let currentYear = new Date().getFullYear();
          return currentYear - birthYear;
        });
      });
  }, [name, age]);

  const createProfile = async () => {
    getDogImage();
    getDadJoke();
    getFakerInfo();
    // let [val1, val2, val3] = Promise.all([promise1, promise2, promise3]).then((values) => {
    //   console.log(values);
    // });
  };

  useEffect(() => {
    createProfile();
  }, []);

  return (
    <div className="app-container">
      <div className="title-div">
        <h3 className="title-text">Dog Tinder</h3>
        <img className="dog-icon" src={dog} />
      </div>
      <div className="counts">
        <p>Likes:{}</p>
      </div>
      <DogCard
        dogPic={dogPic}
        bio={bio}
        name={name}
        age={age}
        createProfile={createProfile}
      />
    </div>
  );
};

export default App;
