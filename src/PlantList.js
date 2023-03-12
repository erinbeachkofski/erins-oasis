import React, { useState, useEffect } from "react";
import { getApi } from "./api";
import WaterChart from "./WaterChart.tsx";

/**
 * Create Plant List Component
 */
export default function PlantGrid() {
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
        id: plant?.id ?? null,
        description: plant?.description ?? null,
        room: plant?.room ?? null,
        plant_size: plant?.plant_size ?? null,
        water_interval: plant?.water_interval ?? null,
        days_left: plant?.days_left ?? null,
        last_watered: plant?.last_watered ?? null,
        image: plant?.image ?? null,
      }))
    );
  }, [plantsData]);

  if (plantsData.length % 2 !== 0) {
    plantsData.push(null);
  }

  const plantList = (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)" }}>
      {plantArray.map((plantElement, index) => (
        <div key={index}>
          {plantElement && (
            <Plant
              id={plantElement?.id}
              description={plantElement?.description}
              room={plantElement?.room}
              plant_size={plantElement?.plant_size}
              water_interval={plantElement?.water_interval}
              days_left={plantElement?.days_left}
              last_watered={plantElement?.last_watered}
              image={plantElement?.image}
            />
          )}
        </div>
      ))}
    </div>
  );

  return <div>{plantList}</div>;
}

/**
 * Creates Plant Component
 */
function Plant(props) {
  console.log(props);
  return (
    <div class="plant-item">
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
      <WaterStatus 
        water_interval={props.water_interval}
        last_watered={props.last_watered}  
      />
      <WaterButton />
    </div>
  );
}

/**
 * Creates Water Status Component
 */
function WaterStatus(props) {
  return (
    <div>
      <button>{getDaysLeft(props.water_interval, props.last_watered)} day(s) left until next watering</button>
      <WaterChart width={400} height={400} />
    </div>
  );
}

const getDaysLeft = (water_interval, last_watered) => {
  const msDiff = new Date().setHours(0,0,0,0) - new Date(last_watered).setHours(0,0,0,0);
  const daysDiff = msDiff / (1000 * 60 * 60 * 24);
  return water_interval - daysDiff;
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
