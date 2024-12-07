import React, { useState, useEffect } from "react";
import { fetchPlatforms } from "../api/get_platform_api";
import ShimmerLoader from "./shimmer";
import Card from "./card";
// Import Shimmer loader

const Dashboard = () => {
    const [platforms, setPlatforms] = useState([]);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        const loadPlatforms = async () => {
            const data = await fetchPlatforms();
            setTimeout(() => {
                setPlatforms(data); // Update platforms state with API response
                setLoading(false);  // Set loading state to false after delay
            }, 1000);
        };

        loadPlatforms();
    }, []);

    return (
        <div style={styles.container}>
            <header style={styles.header}>
                <h1 style={styles.heading}>AgentPay</h1>
                <div style={styles.profile}>
                    <img
                        src="https://www.gravatar.com/avatar/2c7d99fe281ecd3bcd65ab915bac6dd5?s=250/40"
                        alt="Profile Avatar"
                        style={styles.avatar}
                    />
                    <span style={styles.email}>example@mail.com</span>
                </div>
            </header>

            {/* Main Content */}
            <section style={styles.cardsContainer}>
                {loading ? (
                    Array(5)
                        .fill(0)
                        .map((_, index) => <ShimmerLoader key={index} />)
                ) : (
                    platforms.map((platform, index) => (
                        <Card
                            key={index}
                            platform={platform.platformName}
                            amount={platform.price}
                            dueDate={platform.dueDate}
                        />
                    ))
                )}
            </section>
        </div>
    );
};

const styles = {
    container: {
        fontFamily: "'Arial', sans-serif",
        backgroundColor: "#f4f4f4",
        height: "100vh",
        margin: "0",
    },
    header: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "20px 40px",
        backgroundColor: "#ffffff",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    },
    heading: {
        margin: "0",
        fontSize: "24px",
        color: "#333",
    },
    profile: {
        display: "flex",
        alignItems: "center",
    },
    avatar: {
        width: "40px",
        height: "40px",
        borderRadius: "50%",
        marginRight: "10px",
    },
    email: {
        fontSize: "14px",
        color: "#555",
    },
    cardsContainer: {
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
        gap: "20px",
        padding: "20px 40px",
    },
};

export default Dashboard;
