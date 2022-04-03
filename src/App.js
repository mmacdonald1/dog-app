import React, { useState, useEffect } from "react";
import "./App.css";
import DogCard from "./components/DogCard/DogCard";
import dog from "./assets/dog.png";
import _ from "lodash";

const App = () => {
  const [currentDog, setCurrentDog] = useState({});
  const [que, setQue] = useState([]);

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

  const getAge = (val3) => {
    let birthYear = val3.data[0].birthday.split("-")[0];
    let currentYear = new Date().getFullYear();
    return currentYear - birthYear;
  };

  const createProfile = async () => {
    console.log("fire2", que);
    let newDog = {};
    try {
      let [val1, val2, val3] = await Promise.all([
        getDogImage(),
        getDadJoke(),
        getFakerInfo(),
      ]);
      newDog.id = que.length + 1;
      newDog.img = val1.message;
      newDog.bio = val2.joke;
      newDog.name = val3.data[0].firstname;
      newDog.age = getAge(val3);
      newDog.like = false;
      setCurrentDog(newDog);
      setQue((que) => [...que, newDog]);
      console.log(que);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    console.log("fire", que);
    createProfile();
  }, []);

  const handleReject = () => {
    const index = que.findIndex((x) => x.id === currentDog.id);

    console.log(index);

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

    setCurrentDog((currentDog) => {
      currentDog.like = false;
      return currentDog;
    });
    console.log(que);
  };

  const handleLike = () => {
    const index = que.findIndex((x) => x.id === currentDog.id);

    console.log(
      index,
      que.slice(0, index),
      que[index],
      que.slice(index + 1, que.length)
    );

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

    setCurrentDog((currentDog) => {
      currentDog.like = true;
      return currentDog;
    });
    console.log(que);
    // createProfile();
  };

  const handleBack = () => {
    const index = que.findIndex((x) => x.id === currentDog.id);
    if (index === 0) return;
    setCurrentDog(que[index - 1]);
  };

  const handleForward = () => {
    const index = que.findIndex((x) => x.id === currentDog.id);
    if (index === que.length - 1) return;
    setCurrentDog(que[index + 1]);
  };

  return (
    <div className="app-container">
      <div className="title-div">
        <h3 className="title-text">Dog Tinder</h3>
        <img className="dog-icon" src={dog} onClick={createProfile} />
      </div>
      <DogCard
        currentDog={currentDog}
        handleLike={handleLike}
        handleBack={handleBack}
        handleForward={handleForward}
        handleReject={handleReject}
      />
      {/* <ul>
        {que.map((dog) => {
          return (
            <li>
              {dog.name} {dog.id} {dog.like ? "yes" : "no"}
            </li>
          );
        })}
      </ul> */}
    </div>
  );
};

export default App;
