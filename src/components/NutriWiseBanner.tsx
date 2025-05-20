import { FC } from "react";
import "../styles/nutriwisebanner.css";
import { Foodlist } from "../interface/Foodlist";


interface NutriWiseBannerProps {
  username: string;
  foodItems: Foodlist[] | undefined;
  onAddFood?: () => void;
  onExpiryPress?: () => void;
}

const NutriWiseBanner: FC<NutriWiseBannerProps> = ({
  username,
  foodItems,
  onAddFood,
  onExpiryPress,
}) => {
  const isWithinThreeDays = (expiry: Date | string): boolean => {
    const expiryDate = new Date(expiry);
    const now = new Date();
    const threeDaysLater = new Date(now.getTime() + 3 * 24 * 60 * 60 * 1000);
    return expiryDate <= threeDaysLater && expiryDate > now;
  };

  const getTimeLeft = (expiry: Date): string => {
    const expiryDate = new Date(expiry);
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

  const validFoodItems = foodItems ?? [];

  const expiringItems = validFoodItems.filter((item) => isWithinThreeDays(item.expiryDate));


  const renderContent = () => {
    return (
      !foodItems || foodItems.length === 0 ? (
        <div className="content">
          <p>You haven't added your food list. Do you want to add it?</p>
          <p onClick={onAddFood} className="cta">
            Click Here to the Food List
          </p>
        </div>
      ) : expiringItems.length > 0 ? (
        <div className="content statuses-urgent">
          <p>
            Your <strong>{expiringItems.reduce((a, b) => new Date(a.expiryDate) < new Date(b.expiryDate) ? a : b).foodName}</strong> will expire in{" "}
            <span className="timeRemaining">{getTimeLeft(expiringItems.reduce((a, b) => new Date(a.expiryDate) < new Date(b.expiryDate) ? a : b).expiryDate)}</span>.
          </p>
          <p onClick={onExpiryPress} className="cta">
            Tap for more info
          </p>
        </div>
      ) : (
        <div className="content statuses-neutral">
          <p>You don't have any food expiring in the next 3 days</p>
          <p onClick={onExpiryPress} className="cta">
            Tap for more info
          </p>
        </div>
      )
    );
  }
  return (
    <div className="banner">
      <div className="heading">
        <h2 className="welcome">Welcome to the NutriWise, {username}!</h2>
      </div>
      {renderContent()}
    </div>
  );
};
export default NutriWiseBanner;
