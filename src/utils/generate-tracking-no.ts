export function generateTrackingNo() {
  const now = new Date();
  const year = now.getFullYear();
  const month = (now.getMonth() + 1).toString().padStart(2, '0');
  const day = now.getDate().toString().padStart(2, '0');
  const hours = now.getHours().toString().padStart(2, '0');
  const minutes = now.getMinutes().toString().padStart(2, '0');
  const seconds = now.getSeconds().toString().padStart(2, '0');
  const milliseconds = now.getMilliseconds().toString().padStart(3, '0');
  const randomDigits = Math.floor(Math.random() * 10000)
    .toString()
    .padStart(4, '0');
  const trackingNumber = `${year}${month}${day}${hours}${minutes}${seconds}${milliseconds}-${randomDigits}`;
  return trackingNumber;
}
