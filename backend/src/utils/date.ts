export function convertToDate(daysInFuture: number): Date {
    const currentDate = new Date();
    const futureDate = new Date(currentDate.getTime() + daysInFuture * 24 * 60 * 60 * 1000);
    return futureDate;
}

