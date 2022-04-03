import React, { useState, useEffect } from "react";
import "./App.css";
import DogCard from "./components/DogCard/DogCard";
import dog from "./assets/dog.png";
import _ from "lodash";

const App = () => {
  const [currentDog, setCurrentDog] = useState({});
  const [que, setQue] = useState([]);

  // API requests
  const getDogImage = () => {
    return fetch("https://dog.ceo/api/breeds/image/random").then((response) =>
      response.json()
    );
  };

  const getDadJoke = () => {
    return fetch("https://icanhazdadjoke.com", {
      method: "get",
      headers: {
        Accept: "application/json",
      },
    }).then((response) => response.json());
  };

  const getFakerInfo = () => {
    return fetch(
      "https://fakerapi.it/api/v1/persons?_quantity=1&_gender=male&_birthday_start=2005-01-01"
    ).then((response) => response.json());
  };

  // helper functions
  const getAge = (val3) => {
    let birthYear = val3.data[0].birthday.split("-")[0];
    let currentYear = new Date().getFullYear();
    return currentYear - birthYear;
  };

  const createProfile = async () => {
    try {
      //get all values from APIs
      let [val1, val2, val3] = await Promise.all([
        getDogImage(),
        getDadJoke(),
        getFakerInfo(),
      ]);

      //create dog object and set to state
      let newDog = {
        id: que.length + 1,
        img: val1.message,
        bio: val2.joke,
        name: val3.data[0].firstname,
        age: getAge(val3),
        like: false,
      };
      setCurrentDog(newDog);

      //add dog to que
      setQue((que) => [...que, newDog]);
    } catch (err) {
      console.log(err);
    }
  };

  const handleReject = () => {
    //find current dog in que by index
    const index = que.findIndex((x) => x.id === currentDog.id);

    //copy each part of the array and change the current dog like value in the que
    setQue((que) => {
      return [
        ...que.slice(0, index),
        {
          ...que[index],
          like: false,
        },
        ...que.slice(index + 1, que.length),
      ];
    });

    //update current dog
    setCurrentDog((currentDog) => {
      currentDog.like = false;
      return currentDog;
    });

    //trigger creation of next dog
    createProfile();
  };

  const handleLike = () => {
    //find current dog in que by index
    const index = que.findIndex((x) => x.id === currentDog.id);

    //copy each part of the array and change the current dog like value in the que
    setQue((que) => {
      return [
        ...que.slice(0, index),
        {
          ...que[index],
          like: true,
        },
        ...que.slice(index + 1, que.length),
      ];
    });

    //update current dog
    setCurrentDog((currentDog) => {
      currentDog.like = true;
      return currentDog;
    });

    //trigger creation of next dog
    createProfile();
  };

  const handleBack = () => {
    //find current dog in que by index
    const index = que.findIndex((x) => x.id === currentDog.id);
    //if first in que return
    if (index === 0) return;
    //else set to previous dog
    setCurrentDog(que[index - 1]);
  };

  const handleForward = () => {
    //find current dog in que by index
    const index = que.findIndex((x) => x.id === currentDog.id);
    //if last in que return
    if (index === que.length - 1) return;
    //else set to next dog
    setCurrentDog(que[index + 1]);
  };

  //on render create dog
  useEffect(() => {
    createProfile();
  }, []);

  return (
    <div className="app-container">
      <div className="title-div">
        <h3 className="title-text">Dog Tinder</h3>
        <img className="dog-icon" src={dog} />
      </div>
      <DogCard
        currentDog={currentDog}
        handleLike={handleLike}
        handleBack={handleBack}
        handleForward={handleForward}
        handleReject={handleReject}
      />
    </div>
  );
};

export default App;
