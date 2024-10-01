function getStartOfWeekSunday(startDate, type) {
  const date = new Date(startDate); // Convert the input string to a Date object

  // Find the day of the week (0 = Sunday, 1 = Monday, ..., 6 = Saturday)
  const currentDay = date.getDay(); // Get the current week's start date (should be Sunday)

  // Determine the offset based on the type parameter
  const offset = type === "next" ? 7 : -7; // 7 days for next week, -7 days for previous week

  // Calculate the new start date for the specified week
  date.setDate(date.getDate() + offset);

  // Adjust to the start of the week (Sunday)
  date.setDate(date.getDate() - currentDay); // Set to the nearest previous Sunday

  return date.toISOString().split("T")[0]; // Format to 'YYYY-MM-DD'
}

// Example usage
const currentWeekStart = "2024-09-30"; // Example current week's start date (Monday)
console.log(getStartOfWeekSunday(currentWeekStart, "next")); // Start of the next week (Sunday)
console.log(getStartOfWeekSunday(currentWeekStart, "prev")); // Start of the previous week (Sunday)
