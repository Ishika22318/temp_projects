exports.format_date = (date) => {
    if (date === "" || date === undefined || date === null) {
      return "-";
    }
    date = new Date(date);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  };