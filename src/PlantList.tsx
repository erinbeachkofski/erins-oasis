import React, { useState, useEffect } from "react";
import { getApi } from "./api";
import WaterChart from "./WaterChart";

interface Plant {
  id: number;
  description: string;
  room: string;
  plant_size: string;
  water_interval: number;
  days_left: number;
  last_watered: string;
  image: string;
}

/**
 * Create Plant List Component
 */
export default function PlantGrid() {
  const [plantsData, setPlantsData] = useState<Plant[]>([]);
  const [plantArray, setPlantArray] = useState<Plant[]>([]);

  useEffect(() => {
    getApi().then((data: Plant[]) => {
      setPlantsData(data);
    });
  }, []);

  useEffect(() => {
    setPlantArray(
      plantsData.map((plant: Plant) => ({
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
    plantsData.push(null as any);
  }

  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)" }}>
      {plantArray.map((plantElement: Plant | null, index: number) => (
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
}

/**
 * Creates Plant Component
 */
function Plant(props: Plant) {
  console.log(props);
  return (
    <div className="plant">
      <h3>Plant #{props.id}</h3>
      <div className="plant__top">
        <div className="plant__top__left">
          <p>
            {props.description}
            <br />
            {props.room}
            <br />
            {props.plant_size}
            <br />
            {props.water_interval}
            <br />
            {props.last_watered}
            <br />
          </p>
        </div>
        <div className="plant__top__right">
          <img src={"https://cdn-icons-png.flaticon.com/512/2493/2493100.png"} alt="cute flower" />
        </div>
      </div>
      <div className="plant_bottom">
        <WaterChart width={400} height={200} />
        <WaterButton
          water_interval={props.water_interval}
          last_watered={props.last_watered}
        />
      </div>
    </div>
  );
}

/**
 * Creates Water Button Component
 */
function WaterButton(props: { water_interval: number; last_watered: string }) {
  return (
    <div>
      <button>
        {getDaysLeft(props.water_interval, props.last_watered)} day(s) left
        until next watering
      </button>
    </div>
  );
}

const getDaysLeft = (water_interval: number, last_watered: string) => {
  const msDiff = new Date().setHours(0,0,0,0) - new Date(last_watered).setHours(0,0,0,0);
  const daysDiff = msDiff / (1000 * 60 * 60 * 24);
  return water_interval - daysDiff;
};
