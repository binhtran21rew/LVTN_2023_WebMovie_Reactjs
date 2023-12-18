export const splitCalendar = (timeString) => {
    const split = timeString.split(/[T+]/);
    return split;
}

export const splitTime = (timeString) => {
    const split = timeString.split(/[:]/);
    return split;
}

export const splitSpace = (timeString) => {
  const split = timeString.split(/[ ]/);
  return split;
}

export const groupBy = (array, key) => {
    return array.reduce((result, currentValue) => {
      (
        result[currentValue[key]] =
        result[currentValue[key]] || []).push(
        currentValue
      );
      return result;
    }, {});
  };

export const groupByPermissions = (array, key) => {
    return array.reduce((result, currentValue) => {
      (result[currentValue[key].split('-')[1]] = result[currentValue[key].split('-')[1]] || []).push(currentValue);
      return result;
    }, {});
    
  };
  