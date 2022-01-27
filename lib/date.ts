import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";

export type DateFormat = "" | "kanji" | "-" | "/";

dayjs.extend(utc);
dayjs.extend(timezone);

const toDateObj = (date: string) => {
    return dayjs.utc(date).tz("Asia/Tokyo");
};

export const toFormatString = (date: string, format: DateFormat = "") => {
    const dateObj = toDateObj(date);
    if (format === "kanji") {
        return dateObj.format("YYYY年MM月DD日");
    } else if (format === "-") {
        return dateObj.format("YYYY-MM-DD");
    } else if (format === "/") {
        return dateObj.format("YYYY/MM/DD");
    } else if (format === "") {
        return dateObj.format("YYYYMMDD");
    }
    return "";
};
