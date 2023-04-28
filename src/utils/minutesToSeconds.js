export default function minutesToSeconds(seconds) {
  let date = new Date(0);
  date.setSeconds(seconds);
  return date.toISOString().substring(15, 19);
}
