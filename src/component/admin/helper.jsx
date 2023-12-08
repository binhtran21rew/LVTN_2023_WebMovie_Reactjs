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
  