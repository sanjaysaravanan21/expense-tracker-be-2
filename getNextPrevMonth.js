function getStartOfMonth(startDate, type) {
  const date = new Date(startDate); // Convert the input string to a Date object

  // Determine the new month based on the type parameter
  if (type === "next") {
    date.setMonth(date.getMonth() + 1); // Move to the next month
  } else if (type === "prev") {
    date.setMonth(date.getMonth() - 1); // Move to the previous month
  } else {
    throw new Error("Invalid type. Use 'next' or 'prev'.");
  }

  // Set the date to the first day of the month
  date.setDate(1);

  // Format to 'YYYY-MM-DD' and return
  return date.toISOString().split("T")[0];
}

// Example usage
const startDate = "2024-12-01"; // Example start date
console.log(getStartOfMonth(startDate, "next")); // Output: '2024-11-01'
console.log(getStartOfMonth(startDate, "prev")); // Output: '2024-09-01'
