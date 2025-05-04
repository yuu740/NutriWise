import React from "react";
import { Link, useNavigate } from "react-router-dom";


const GoToCalculator: React.FC = () => {
    const navigate = useNavigate();

    const toCalculator: any = () => {
        navigate('/calculator')
    }
    
    return (
        <div style={styles.content}>
            <p>Do you want to track your nutrition and calories intake?</p>
            <p style={styles.cta} onClick={toCalculator}>Click Here to Track It!</p>
        </div>
    );
}

const styles = {
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
}

export default GoToCalculator;