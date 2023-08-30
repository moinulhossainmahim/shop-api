import { v4 as uuid4 } from 'uuid';

export function generateTrackingNo() {
  const currentDate = new Date();
  const year = currentDate.getFullYear();
  const month = (currentDate.getMonth() + 1).toString().padStart(2, '0'); // Month is 0-indexed, so add 1
  const day = currentDate.getDate().toString().padStart(2, '0');
  const uuid = uuid4().substring(4, 8);
  const trackingNumber = `${year}${month}${day}${uuid}`;
  return trackingNumber;
}
