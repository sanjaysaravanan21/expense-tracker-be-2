function getStartOfWeek(date) {
  const day = date.getDay(); // Get the day of the week (0 - Sunday, 6 - Saturday)
  const diff = date.getDate() - day; // Calculate the difference to the start of the week
  const startOfWeek = new Date(date.setDate(diff)); // Set the date to the start of the week
  return startOfWeek.toISOString().split("T")[0]; // Format to 'YYYY-MM-DD'
}

// Example usage
const today = new Date(); // Get today's date
const startOfWeek = getStartOfWeek(today);
console.log(`Start of the week: ${startOfWeek}`);
