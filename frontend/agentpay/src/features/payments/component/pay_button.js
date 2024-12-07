import React, { useState } from "react";
import { startSubscription } from "../../../api/agentpay_api";

const PayButton = ({ payee, amount, interval }) => {
    const [isLoading, setIsLoading] = useState(false);

    const handlePayment = async () => {
        setIsLoading(true);
        try {
            await startSubscription(payee, amount, interval);
        } catch (error) {
            console.error("Error:", error);
        } finally {
            setIsLoading(false);
        }
    };

    const buttonStyles = {
        padding: "12px 24px",
        fontSize: "16px",
        color: "#ffffff",
        backgroundColor: "#28a745", // Green shade
        border: "none",
        borderRadius: "8px",
        cursor: isLoading ? "not-allowed" : "pointer",
        boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
        transition: "background-color 0.3s ease, transform 0.2s ease",
        opacity: isLoading ? 0.7 : 1,
        transform: isLoading ? "scale(0.98)" : "scale(1)",
    };

    const hoverStyles = {
        backgroundColor: "#218838",
    };

    return (
        <button
            style={{
                ...buttonStyles,
                ...(isLoading ? {} : hoverStyles),
            }}
            onMouseOver={() => {
                if (!isLoading) buttonStyles.backgroundColor = "#218838";
            }}
            onMouseOut={() => {
                if (!isLoading) buttonStyles.backgroundColor = "#28a745";
            }}
            onClick={handlePayment}
            disabled={isLoading}
        >
            {isLoading ? "Processing..." : "Pay Now"}
        </button>
    );
};

export default PayButton;
