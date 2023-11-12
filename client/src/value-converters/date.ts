export function convertDateFormat(isoDateString: string) {
    const isoDate = new Date(isoDateString);

    const day = isoDate.getUTCDate();
    const month = isoDate.getUTCMonth() + 1; 
    const year = isoDate.getUTCFullYear();

    const formattedDate = `${day}.${month}.${year}`;

    return formattedDate;
}
