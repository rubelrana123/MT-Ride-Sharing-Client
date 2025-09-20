export const dateFormater = (newsDate: Date) => {
  const date = new Date(newsDate);

  // Format the date to "Aug 23, 2025"
  const formattedDate = date.toLocaleDateString("en-US", {
    month: "short", // Short month name (e.g., Apr)
    day: "2-digit", // 2-digit day (e.g., 23)
    year: "numeric", // Numeric year (e.g., 2025)
  });
  return formattedDate;
};