export const getExpiryStatus = (expiry: Date): { status: string; days: number }  => {
  const expiryDate = new Date(expiry);
  const now = new Date();
  expiryDate.setHours(0, 0, 0, 0);
  now.setHours(0, 0, 0, 0);


  const diffTime = expiryDate.getTime() - now.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

   if (diffDays < 0) {
    return { status: "expired", days: Math.abs(diffDays) };
  } else if (diffDays === 0) {
    return { status: "expires_today", days: 0 };
  } else if (diffDays <= 2) {
    return { status: "soon", days: diffDays };
  } else if (diffDays <= 5) {
    return { status: "warning", days: diffDays };
  } else {
    return { status: "fresh", days: diffDays };
  }
};
