function getDatesOfMonth(startDate) {
  const dates = [];
  const date = new Date(startDate); // Convert the input string to a Date object

  // Get the year and month from the date
  const year = date.getFullYear();
  const month = date.getMonth(); // Month is zero-indexed (0 = January, 1 = February, ...)

  // Get the last day of the month
  const lastDate = new Date(year, month + 1, 0).getDate(); // Day 0 of the next month gives last day of the current month

  console.log(lastDate + 1, month);
  // Loop through each day of the month
  for (let day = 2; day <= lastDate + 1; day++) {
    const currentDate = new Date(year, month, day);
    console.log(currentDate);
    dates.push(currentDate.toISOString().split("T")[0]); // Format to 'YYYY-MM-DD'
  }

  return dates; // Return the array of dates
}

// Example usage
const startDate = "2023-02-01"; // Example start date in YYYY-MM-DD format
const monthDates = getDatesOfMonth(startDate);
console.log(monthDates);
