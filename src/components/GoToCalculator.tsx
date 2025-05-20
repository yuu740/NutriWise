import React from "react";
import { Link, useNavigate } from "react-router-dom";
import '../styles/gotocalcu.css'


const GoToCalculator: React.FC = () => {
    const navigate = useNavigate();

    const toCalculator: any = () => {
        navigate('/calculator')
    }
    
    return (
        <div className="content">
            <p>Do you want to track your nutrition and calories intake?</p>
            <p className="cta" onClick={toCalculator}>Click Here to Track It!</p>
        </div>
    );
}



export default GoToCalculator;