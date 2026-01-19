export function format(date: string | Date) {
  const parsed = typeof date === "string" ? new Date(date) : date;
  return parsed.toLocaleDateString(undefined, {
    month: "short",
    day: "numeric",
    year: "numeric"
  });
}
