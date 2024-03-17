// Utility function to convert a JavaScript Date object to an ISO 8601 string
function toISODate(date: any) {
  // Ensure the input is a Date object
  if (!(date instanceof Date)) {
    throw new Error("Input must be a Date object");
  }

  // Convert the Date object to an ISO 8601 string
  return date.toISOString();
}
