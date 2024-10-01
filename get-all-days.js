function getDatesOfWeek(startDate) {
  const dates = [];
  const start = new Date(startDate); // Convert the input string to a Date object

  // Loop through the week (0 to 6 days)
  for (let i = 0; i < 7; i++) {
    const currentDate = new Date(start);
    currentDate.setDate(start.getDate() + i); // Add i days to the start date
    dates.push(currentDate.toISOString().split("T")[0]); // Format to 'YYYY-MM-DD' and add to the array
  }

  return dates; // Return the array of dates
}

// Example usage
const weekStartDate = "2024-09-29"; // Example start date (Sunday)
const weekDates = getDatesOfWeek(weekStartDate);
console.log(weekDates);
