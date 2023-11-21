export function convertToDate(daysInFuture: number): Date {
    const currentDate = new Date();
    const futureDate = new Date(currentDate);
    futureDate.setDate(currentDate.getDate() + daysInFuture);
    return futureDate;
}