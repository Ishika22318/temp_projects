export const format_date = (date, index) => {

    if (date === "" || date === undefined || date === null) {
      return "";
    }
    
    date = new Date(date);
    const first_months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const second_months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const day = date.getDate();
    const month = index === 0 ? first_months[date.getMonth()] : second_months[date.getMonth()];
    const year = date.getFullYear();
    let daySuffix;
    if (day === 1 || day === 21 || day === 31) {
      daySuffix = "st";
    }
    else if (day === 2 || day === 22) {
      daySuffix = "nd";
    }
    else if (day === 3 || day === 23) {
      daySuffix = "rd";
    } else {
      daySuffix = "th";
    }
    const formattedDate = `${day}${daySuffix} ${month} ${year}`;
    return formattedDate;
  }