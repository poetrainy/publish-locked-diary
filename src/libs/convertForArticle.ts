import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";

export const convertArticleData = (data: string) => {
  dayjs.extend(utc);
  dayjs.extend(timezone);

  const time = data.split("T")[1].split(".")[0].split(":");
  let hour = String(Number(time[0]) + 9);
  if (Number(hour) > 23) hour = `0${String(Number(time[0]) + 9 - 24)}`;

  const date = dayjs.utc(data).tz("Asia/Tokyo").format("YYYY-MM-DD");

  return `${date} ${hour}:${time[1]}:${time[2]}`;
};
