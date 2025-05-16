import { FC } from "react";
import "../styles/nutriwisebanner.css";

type FoodItem = {
  name: string;
  expiryDate: Date;
};

interface NutriWiseBannerProps {
  username: string;
  foodItems: FoodItem[];
  onAddFood?: () => void;
  onExpiryPress?: () => void;
}

const NutriWiseBanner: FC<NutriWiseBannerProps> = ({
  username,
  foodItems,
  onAddFood,
  onExpiryPress,
}) => {
  const isWithinThreeDays = (expiryDate: Date): boolean => {
    const now = new Date();
    const threeDaysLater = new Date(now.getTime() + 3 * 24 * 60 * 60 * 1000);
    return expiryDate <= threeDaysLater;
  };

  const getTimeLeft = (expiryDate: Date): string => {
    const now = new Date();
    const diff = expiryDate.getTime() - now.getTime();

    if (diff <= 0) return "expired";

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor(
      (diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );

    if (days > 0) return `${days} day${days !== 1 ? "s" : ""} left`;
    if (hours > 0) return `${hours} hour${hours !== 1 ? "s" : ""} left`;
    return "less than 1 hour left";
  };

  const expiringItems = foodItems.filter(
    (item) => isWithinThreeDays(item.expiryDate) && item.expiryDate > new Date()
  );

  if (foodItems.length === 0) {
    return (
      <div className="banner">
        <div className="heading">
          <h2 className="welcome">Welcome to the NutriWise, {username}!!</h2>
        </div>
        <div className="content">
          <p>You haven't added your food list. Do you want to add it?</p>
          <p onClick={onAddFood} className="cta">
            Click Here to the Food List
          </p>
        </div>
      </div>
    );
  }

  if (expiringItems.length > 0) {
    const closestItem = expiringItems.reduce((prev, current) =>
      prev.expiryDate < current.expiryDate ? prev : current
    );

    return (
      <div className="banner">
        <div className="heading">
          <h2 className="welcome">Welcome to the NutriWise, {username}!</h2>
        </div>
        <div className="content statuses-urgent">
          <p>
            Your {closestItem.name} will expire in{" "}
            <span className="timeRemaining">{getTimeLeft(closestItem.expiryDate)}</span>
          </p>
          <p onClick={onExpiryPress} className="cta">
            Tap for more info
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="banner">
      <div className="heading">
        <h2 className="welcome">Welcome to the NutriWise, {username}!</h2>
      </div>
      <div className="content statuses-neutral">
        <p>You don't have any food expiring in the next 3 days</p>
        <p onClick={onExpiryPress} className="cta">
          Tap for more info
        </p>
      </div>
    </div>
  );
};

export default NutriWiseBanner;
