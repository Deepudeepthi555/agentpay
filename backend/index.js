const express = require("express");
const { ethers } = require("ethers");
const cron = require("node-cron");
require("dotenv").config();

// Load environment variables
const { CONTRACT_ADDRESS, CONTRACT_ABI, PROVIDER_URL, PRIVATE_KEY } = process.env;

// Initialize Express
const app = express();
app.use(express.json());

// Connect to the blockchain
const provider = new ethers.providers.JsonRpcProvider(PROVIDER_URL);
const wallet = new ethers.Wallet(PRIVATE_KEY, provider);
const contract = new ethers.Contract(CONTRACT_ADDRESS, JSON.parse(CONTRACT_ABI), wallet);

// Subscription storage
let subscriptions = {};

// 1. Fetch past events to initialize subscription data
const initializeSubscriptions = async () => {
    console.log("Initializing subscriptions from contract...");
    const filter = contract.filters.SubscriptionCreated();
    const events = await contract.queryFilter(filter);

    events.forEach(event => {
        const { subscriber, recipient, amount, interval, nextPayment } = event.args;
        subscriptions[subscriber] = {
            recipient,
            amount: amount.toString(),
            interval: interval.toNumber(),
            nextPayment: nextPayment.toNumber(),
        };
    });
    console.log("Subscriptions initialized:", subscriptions);
};

// 2. Update subscriptions on new events
const listenToEvents = () => {
    console.log("Listening for new subscription events...");
    contract.on("SubscriptionCreated", (subscriber, recipient, amount, interval, event) => {
        subscriptions[subscriber] = {
            recipient,
            amount: amount.toString(),
            interval: interval.toNumber(),
            nextPayment: Date.now() + interval,
        };
        console.log("New subscription added:", subscriptions[subscriber]);
    });

    contract.on("SubscriptionCanceled", (subscriber) => {
        delete subscriptions[subscriber];
        console.log("Subscription canceled:", subscriber);
    });
};

// 3. Cron job to process payments
cron.schedule("*/1 * * * *", async () => {
    console.log("Running subscription payment cron job...");
    const currentTime = Math.floor(Date.now() / 1000);

    for (const [subscriber, subscription] of Object.entries(subscriptions)) {
        if (subscription.nextPayment <= currentTime) {
            console.log(`Processing payment for subscriber: ${subscriber}`);
            try {
                const tx = await contract.processPayment(subscriber);
                await tx.wait();
                console.log(`Payment processed for ${subscriber} to ${subscription.recipient}`);
                subscriptions[subscriber].nextPayment = currentTime + subscription.interval;
            } catch (error) {
                console.error(`Error processing payment for ${subscriber}:`, error);
            }
        }
    }
});

// 4. Initialize data and start listening
initializeSubscriptions();
listenToEvents();

// Start the Express server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
