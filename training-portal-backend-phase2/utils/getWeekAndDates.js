// fuction to get current date and week through start date and day

exports.getWeekAndDates = (startDate, day) => {
  // logic ---
  let currdate = new Date(startDate);
  let currday = new Date(startDate).getDay();
  let currweek = 1;
  while (day != 1) {
    currdate.setDate(currdate.getDate() + 1);
    currday++;
    // if day==sat or sun, avoid them
    if (currday == 6) {
      currday = 1;
      currweek++;
      currdate.setDate(currdate.getDate() + 1);
      currdate.setDate(currdate.getDate() + 1);
    }
    day--;
  }
  // convert date to readable format
  let date = currdate.toISOString().split("T")[0];
  return { week: currweek, date: date };
};
