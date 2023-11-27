export const parseDuration = (duration: string) => {
    const [hours, minutes, seconds] = duration.split(":").map(Number);

    const formattedHours = hours < 10 ? "0" + hours : String(hours);
    const formattedMinutes = minutes < 10 ? "0" + minutes : String(minutes);
    const formattedSeconds = seconds < 10 ? "0" + seconds : String(seconds);

    return {
        hours,
        minutes,
        seconds,
        formattedHours,
        formattedMinutes,
        formattedSeconds,
    };
};
