import CuteFlower from "./assets/images/cute_flower.png";
import React, { useState, useEffect } from "react";
import { getApi } from "./api";
import WaterChart from "./WaterChart.tsx";

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
        plant_size: plant.plant_size,
        water_interval: plant.water_interval,
        days_left: plant.days_left,
        last_watered: plant.last_watered,
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
          plant_size={plantElement.plant_size}
          water_interval={plantElement.water_interval}
          days_left={plantElement.days_left}
          last_watered={plantElement.last_watered}
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
    console.log(props);
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
        plant_size={props.plant_size}
        <br />
        water_interval={props.water_interval}
        <br />
        days_left={props.days_left}
        <br />
        last_watered={props.last_watered}
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
      <WaterChart width={400} height={400} />
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
