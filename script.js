const startDate = new Date("2026-08-31");
const endDate = new Date("2027-06-18");

function getSchoolDays(start, end) {
  let dates = [];
  let current = new Date(start);

  while (current <= end) {
    let day = current.getDay();

    if (day >= 1 && day <= 5) {
      dates.push(new Date(current));
    }

    current.setDate(current.getDate() + 1);
  }

  return dates;
}