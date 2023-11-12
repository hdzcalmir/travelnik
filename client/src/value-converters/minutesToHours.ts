export function convertMinutesToTime(minutes: string | number) {
    const hours = Math.floor(Number(minutes) / 60);
    const remainingMinutes = Number(minutes) % 60;
  
    const formattedHours = String(hours).padStart(2, "0");
    const formattedMinutes = String(remainingMinutes).padStart(2, "0");
  
    return `${formattedHours}:${formattedMinutes}`;
  }