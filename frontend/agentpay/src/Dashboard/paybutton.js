import React from "react";
import { startSubscription } from "../api/agentpay_api";

const PayNowButton = ({ payee, amount, interval }) => {
    const handleClick = async () => {
        try {
            await startSubscription(payee, amount, interval);
        } catch (error) {
            console.error("Error:", error);
        }
    };

    return (
        <button onClick={handleClick}>
            Pay Now
        </button>
    );
};

export default PayNowButton;
