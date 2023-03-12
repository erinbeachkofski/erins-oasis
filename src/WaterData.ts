export interface WaterData {
    date: string;
    daysLeft: number;
  }
  
  const waterData: WaterData[] = [
    { date: "2007-04-24T07:00:00.000Z", daysLeft: 7 },
    { date: "2007-04-25T07:00:00.000Z", daysLeft: 6 },
    { date: "2007-04-26T07:00:00.000Z", daysLeft: 4 },
    { date: "2007-04-27T07:00:00.000Z", daysLeft: 3 },
    { date: "2007-04-28T07:00:00.000Z", daysLeft: 2.5 },
    { date: "2007-04-29T07:00:00.000Z", daysLeft: 2 },
    { date: "2007-04-30T07:00:00.000Z", daysLeft: 1 },
    { date: "2007-05-01T07:00:00.000Z", daysLeft: 0 }
  ];
  
  export default waterData;
  