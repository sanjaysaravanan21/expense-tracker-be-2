import fs from "fs";

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getRandomCategory() {
  const categories = [
    "EB",
    "grocery",
    "health",
    "internet",
    "transport",
    "children",
    "gas",
    "food",
    "entertain",
    "others",
    "decor",
    "clothing",
    "home",
  ];
  return categories[getRandomInt(0, categories.length - 1)];
}

function getRandomType() {
  return Math.random() < 0.5 ? "expense" : "income"; // 50% chance for each
}

function getRandomTime() {
  const hours = getRandomInt(0, 23).toString().padStart(2, "0");
  const minutes = getRandomInt(0, 59).toString().padStart(2, "0");
  return `${hours}:${minutes}`;
}

function getRandomDate(start, days) {
  const date = new Date(start);
  date.setDate(date.getDate() + getRandomInt(0, days));
  return date.toISOString().split("T")[0]; // Format to 'YYYY-MM-DD'
}

function getRandomWeekday(dateString) {
  const date = new Date(dateString);
  const weekdays = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  return weekdays[date.getUTCDay()];
}

function generateSampleData(numEntries, startDate) {
  const start = new Date(startDate);
  const sampleData = [];

  for (let i = 0; i < numEntries; i++) {
    const amount = getRandomInt(1, 1000); // Random amount between 1 and 1000
    const date = getRandomDate(start, i); // Increment date
    const time = getRandomTime();
    const paidTo =
      Math.random() < 0.5 ? "Vendor " + getRandomInt(1, 100) : undefined; // Random vendor name or undefined
    const weekDay = getRandomWeekday(date);

    sampleData.push({
      category: getRandomCategory(),
      amount: amount,
      type: getRandomType(),
      date: date,
      time: time,
      paidTo: paidTo || "Sample Vendor",
      weekDay: weekDay,
    });
  }

  return sampleData;
}

// Generate 100 sample data entries starting from '2024-06-01'
const sampleData = generateSampleData(100, "2024-09-18");
console.log(sampleData);

fs.writeFile("./data-5.json", JSON.stringify(sampleData), (err) => {
  console.log(err);
});
