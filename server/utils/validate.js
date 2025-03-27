const checkDateColor = (date) => {
  const inputDate = new Date(date).getTime();
  const currentDate = new Date().getTime();
  const diffDays = Math.floor((currentDate - inputDate) / (1000 * 60 * 60 * 24));
  if (diffDays > 5) {
    return '#FF0000';
  } else {
    return '#F0D1A8';
  }
};

module.exports = checkDateColor;