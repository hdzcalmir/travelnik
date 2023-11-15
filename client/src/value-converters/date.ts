export function convertDateFormat(isoDateString: string) {
    const isoDate = new Date(isoDateString);

    const day = isoDate.getUTCDate() + 1;
    const month = isoDate.getUTCMonth() + 1; 
    const year = isoDate.getUTCFullYear();

    const formattedDate = `${day}.${month}.${year}`;

    return formattedDate;
}

export function convertDateMapFormat(isoDateString: string) {
    const isoDate = new Date(isoDateString);

    const formattedDate = `${isoDate.getFullYear()}-${(isoDate.getMonth() + 1).toString().padStart(2, '0')}-${isoDate.getDate().toString().padStart(2, '0')}`;

    return formattedDate;
}