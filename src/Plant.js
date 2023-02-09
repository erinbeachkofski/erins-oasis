import CuteFlower from './assets/images/cute_flower.png';

/**
 * Create Plant List Component
 */
function PlantList() {
    const plantArray = [];

    for (let i = 0; i < 3; i++) {
        plantArray.push(<div key={"plant-"+i}><Plant /></div>);
    }
    return (
        <div>
            {plantArray}
        </div>
    )
}

/**
 * Creates Plant Component
 */
function Plant() {
    return (
        <div>
            <img src={CuteFlower} alt="cute flower" width={200} height={200}/>
            <WaterStatus/>
            <WaterButton/>
        </div>
    )
}

/**
 * Creates Water Status Component
 */
function WaterStatus() {
    return (
        <div>
            <p>{getDaysLeft()} day(s) left until next watering</p>
        </div>
    )
}

const getDaysLeft = () => {
    return 5;
}


/**
 * Creates Water Button Component 
 */
function WaterButton() {
    return (
        <div>
            <button>Water me!</button>
        </div>
    )
}


export default PlantList;