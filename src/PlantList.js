import CuteFlower from "./assets/images/cute_flower.png";
import React, { useState, useEffect } from "react";
import { getApi } from "./api";

/**
 * Create Plant List Component
 */
export default function PlantList() {
  const [plantsData, setPlantsData] = useState([]);
  const [plantArray, setPlantArray] = useState([]);

  useEffect(() => {
    getApi().then((data) => {
      setPlantsData(data);
    });
  }, []);

  useEffect(() => {
    setPlantArray(
      plantsData.map((plant) => ({
        id: plant.id,
        description: plant.description,
        room: plant.room,
        waterInterval: plant.water_interval,
        daysLeft: plant.days_left,
        lastWatered: plant.last_watered,
        image: plant.image,
      }))
    );
  }, [plantsData]);

  // TODO: Initialize plantList by putting array elements into html
  const plantList = plantArray.map((plantElement) => (
    <div key={"plant-" + plantElement.id}>
      {
        <Plant
          id={plantElement.id}
          description={plantElement.description}
          room={plantElement.room}
          waterInterval={plantElement.water_interval}
          daysLeft={plantElement.days_left}
          lastWatered={plantElement.last_watered}
          image={plantElement.image}
        />
      }
    </div>
  ));

  return <div>{plantList}</div>;
}

/**
 * Creates Plant Component
 */
function Plant(props) {
  return (
    <div>
      {/* TODO: replace CuteFlower with image url */}
      <img src={CuteFlower} alt="cute flower" width={200} height={200} />
      <p>
        id={props.id}
        <br />
        description={props.description}
        <br />
        room={props.room}
        <br />
        waterInterval={props.water_interval}
        <br />
        daysLeft={props.days_left}
        <br />
        lastWatered={props.last_watered}
        <br />
      </p>
      <WaterStatus />
      <WaterButton />
    </div>
  );
}

/**
 * Creates Water Status Component
 */
function WaterStatus() {
  return (
    <div>
      <p>{getDaysLeft()} day(s) left until next watering</p>
    </div>
  );
}

const getDaysLeft = () => {
  return 5;
};

/**
 * Creates Water Button Component
 */
function WaterButton() {
  return (
    <div>
      <button>Water me!</button>
    </div>
  );
}
