import React from "react";

const ShimmerLoader = () => {
    return (
        <div style={styles.shimmerCard}>
            <div style={styles.shimmerTitle}></div>
            <div style={styles.shimmerAmount}></div>
            <div style={styles.shimmerDate}></div>
        </div>
    );
};

const styles = {
    shimmerCard: {
        backgroundColor: "#e0e0e0",
        borderRadius: "8px",
        padding: "20px",
        display: "flex",
        flexDirection: "column",
        gap: "10px",
        boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
        animation: "shimmer 1.5s infinite",
        background: "linear-gradient(90deg, #e0e0e0 25%, #f0f0f0 50%, #e0e0e0 75%)",
        backgroundSize: "200% 100%",
    },
    shimmerTitle: {
        height: "20px",
        width: "70%",
        backgroundColor: "#cfcfcf",
        borderRadius: "4px",
    },
    shimmerAmount: {
        height: "25px",
        width: "50%",
        backgroundColor: "#cfcfcf",
        borderRadius: "4px",
    },
    shimmerDate: {
        height: "15px",
        width: "30%",
        backgroundColor: "#cfcfcf",
        borderRadius: "4px",
    },
};

export default ShimmerLoader;
