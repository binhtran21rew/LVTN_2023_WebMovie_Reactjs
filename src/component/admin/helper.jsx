export const splitCalendar = (timeString) => {
    const split = timeString.split(/[T+]/);
    return split;
}

export const splitTime = (timeString) => {
    const split = timeString.split(/[:]/);
    return split;
}


  