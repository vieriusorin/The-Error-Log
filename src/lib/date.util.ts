export class DateFormatter {
  static formatPublishedDate(date: Date): string {
    return date.toLocaleString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  }
}
