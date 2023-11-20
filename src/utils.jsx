export function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

export function formatTimestamp(timestamp) {
  const date = new Date(timestamp);
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const meridiem = hours >= 12 ? "PM" : "AM";
  const formattedHours = hours % 12 || 12;

  return `${(date.getMonth() + 1)
    .toString()
    .padStart(2, "0")}/${date
    .getDate()
    .toString()
    .padStart(
      2,
      "0"
    )}/${date.getFullYear()} ${formattedHours
    .toString()
    .padStart(2, "0")}:${minutes
    .toString()
    .padStart(2, "0")}:${date
    .getSeconds()
    .toString()
    .padStart(2, "0")} ${meridiem}`.trim();
}

export function sortByProperty(property, customOrder = null, reverse = false) {
  return (a, b) => {
    const aValue = a[property] || "";
    const bValue = b[property] || "";

    if (property === "created") {
      const aDate = new Date(aValue);
      const bDate = new Date(bValue);

      if (aDate < bDate) return reverse ? 1 : -1;
      if (aDate > bDate) return reverse ? -1 : 1;
      return 0;
    }

    if (customOrder) {
      const aIndex = customOrder.indexOf(aValue);
      const bIndex = customOrder.indexOf(bValue);
      return reverse ? bIndex - aIndex : aIndex - bIndex;
    }

    if (property === "name") {
      const nameA = `${a.name.first} ${a.name.last}`;
      const nameB = `${b.name.first} ${b.name.last}`;
      return reverse ? nameA.localeCompare(nameB) : nameB.localeCompare(nameA);
    }

    return reverse
      ? bValue.localeCompare(aValue)
      : aValue.localeCompare(bValue);
  };
}
