import moment from "moment";

export const getExpiryStatus = (expiryDate: string | Date) => {
  const today = moment();
  const expiration = moment(expiryDate);
  if (!expiration.isValid()) {
    return { status: "invalid_date", days: -999 };
  }

  const daysDiff = expiration.diff(today, "days");

  if (expiration.isBefore(today, "day")) {
    return { status: "expired", days: Math.abs(daysDiff) };
  } else if (daysDiff === 0) {
    return { status: "expires_today", days: 0 };
  } else if (daysDiff === 1) {
    return { status: "expires_tomorrow", days: 1 };
  } else if (daysDiff <= 5) {
    return { status: "warning", days: daysDiff };
  } else {
    return { status: "fresh", days: daysDiff };
  }
};
