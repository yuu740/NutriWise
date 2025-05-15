import { addListener } from 'process';
import { FC } from 'react';

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

        if (diff <= 0) return 'expired';

        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));

        if (days > 0) return `${days} day${days !== 1 ? 's' : ''} left`;
        if (hours > 0) return `${hours} hour${hours !== 1 ? 's' : ''} left`;
        return 'less than 1 hour left';
    };

    const getStyles = (base: any, ...extensions: any[]) => Object.assign({}, base, ...extensions);


    if (foodItems.length === 0) {
        return (
            <div className="banner" style={getStyles(styles.banner)}>
                <div style={styles.heading}>
                    <h2 style={styles.welcome}>Welcome to the NutriWise, {username}!!</h2>
                </div>
                <div style={styles.content}>
                    <p>You haven't added your food list. Do you want to add it?</p>
                    <p onClick={onAddFood} style={styles.cta}>Click Here to the Food List</p>
                </div>
            </div>
        );
    }

    const expiringItems = foodItems.filter(item =>
        isWithinThreeDays(item.expiryDate) && item.expiryDate > new Date()
    );

    if (expiringItems.length > 0) {
        const closestItem = expiringItems.reduce((prev, current) =>
            prev.expiryDate < current.expiryDate ? prev : current
        );

        return (
            <div className="banner" style={getStyles(styles.banner)}>
                <div style={styles.heading}>
                    <h2 style={styles.welcome}>Welcome to the NutriWise, {username}!</h2>
                </div>
                <div style={getStyles(styles.content, styles.statuses.urgent)}>
                    <p>Your {closestItem.name} will expire in <span style={styles.timeRemaining}>{getTimeLeft(closestItem.expiryDate)}</span></p>
                    <p onClick={onExpiryPress} style={styles.cta}>Tap for more info</p>
                </div>
            </div>
        );
    }

    return (
        <div className="banner" style={getStyles(styles.banner)}>
            <div style={styles.heading}>
                <h2 style={styles.welcome}>Welcome to the NutriWise, {username}!</h2>
            </div>
            <div style={getStyles(styles.content, styles.statuses.neutral)}>
                <p>You don't have any food expiring in the next 3 days</p>
                <p onClick={onExpiryPress} style={styles.cta}>Tap for more info</p>
            </div>
        </div>
    );
};

export default NutriWiseBanner;

const styles = {
    banner: {
        padding: '1.5rem'
        // borderRadius: '12px',
        // background: '#f8f9fa',
        // boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        // margin: '1rem 0',
        // cursor: 'pointer',
        // transition: 'all 0.2s ease-in-out',
        // borderLeft: '6px solid #4a90e2',
        // '&:hover': {
        //     transform: 'translateY(-2px)',
        //     boxShadow: '0 6px 12px rgba(0, 0, 0, 0.15)'
        // }
    },
    heading: {
        display: 'flex',
        flexDirection: 'row' as const,
        alignItems: 'center',
        gap: '6px',
        marginBottom: '0.75rem'
    },
    welcome: {
        margin: 0,
        color: '#2d3436',
        fontSize: '3.5em',
        alignItems: 'left'
    },
    content: {
        marginTop: '6px',
        marginLeft: '24px',
        color: 'black',
        // fontSize: '1rem',
        lineHeight: 1.5,
        display: 'flex',
        alignItems: 'center',
        fontSize: '1.5rem',
        flexDirection: 'column' as const
    },
    cta: {
        background: 'rgba(255, 231, 75, 1)',
        // border: '6px solid #4a90e2',
        color: 'black   ',
        borderRadius: '12px',
        fontWeight: 500,
        marginTop: '0.5rem',
        display: 'flex',
        justifyContent: 'center',
        gap: '0.5rem',
        cursor: 'pointer',
        width: '50rem',
        fontSize: '2rem'
    },
    statuses: {
        urgent: {
            // borderLeftColor: '#e74c3c',
            // background: '#fff5f5',
            // '& $content': {
            //     color: '#c0392b'
            // }
            fontWeight: 500,
            background: 'rgba(255, 231, 75, 1)',
            borderRadius: '12px',
            color: '#e74c3c'


        },
        neutral: {
            // borderLeftColor: '#00b894',
            // background: '#f5fffd',
            color: 'rgba(0, 153, 81, 1)',
            fontWeight: 500,
            background: 'rgba(255, 231, 75, 1)',
            borderRadius: '12px',

        }
    },
    timeRemaining: {
        fontWeight: 700,
    }
};