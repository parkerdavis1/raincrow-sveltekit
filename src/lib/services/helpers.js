export const capitalizeFirst = (string) => string.charAt(0).toUpperCase() + string.slice(1)

export const dataRange = (dataStart, dataEnd) => {
  const arr = [dataStart, dataEnd];
  if (dataStart && dataEnd) {
    if (dataStart !== dataEnd) {
      if (typeof(dataStart) === "number"){
        arr.sort((a,b)=> {
          return a-b;
        })
      }
      return `${arr[0]} - ${arr[1]}`;

    } else return dataStart;
  } else if (dataStart || dataStart === 0) {
    return dataStart;
  }
}