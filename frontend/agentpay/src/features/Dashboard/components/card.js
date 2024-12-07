
import React from "react";

const Card = ({ platform, amount, dueDate }) => (
    <div style={styles.card}>
        <h3 style={styles.cardTitle}>{platform}</h3>
        <p style={styles.cardAmount}>USDC:{amount}</p>
        <p style={styles.cardDueDate}>Due: {dueDate}</p>
    </div>
);

const styles = {
    card: {
        backgroundColor: "#fff",
        borderRadius: "8px",
        padding: "20px",
        boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
        transition: "transform 0.3s ease-in-out",
    },
    cardTitle: {
        fontSize: "18px",
        color: "#333",
        marginBottom: "10px",
    },
    cardAmount: {
        fontSize: "20px",
        color: "#007BFF",
        fontWeight: "bold",
        marginBottom: "10px",
    },
    cardDueDate: {
        fontSize: "14px",
        color: "#888",
    },
};

export default Card;
