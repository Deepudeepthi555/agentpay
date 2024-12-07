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
        width: "60%",
        backgroundColor: "#f7f7f7", // Lighter background for shimmer
        borderRadius: "8px",
        marginBottom: "15px",
        boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
        display: "flex",
        flexDirection: "column",
        gap: "20px",
        padding: "20px",
        animation: "shimmer 1.5s infinite",
        background: "linear-gradient(90deg, #f7f7f7 25%, #ececec 50%, #f7f7f7 75%)",
        backgroundSize: "200% 100%",
        transition: "all 0.3s ease-in-out", // Smooth transition for any changes
    },
    shimmerTitle: {
        height: "18px",
        width: "70%",
        backgroundColor: "#e0e0e0",
        borderRadius: "4px",
    },
    shimmerAmount: {
        height: "20px",
        width: "50%",
        backgroundColor: "#e0e0e0",
        borderRadius: "4px",
    },
    shimmerDate: {
        height: "15px",
        width: "70%",
        backgroundColor: "#e0e0e0",
        borderRadius: "4px",
    },
};

export default ShimmerLoader;
