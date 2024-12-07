import { Web3Provider } from "@ethersproject/providers";
import { ethers } from "ethers";

// Constants for your smart contract
const CONTRACT_ADDRESS = "0xDD1D34cE5462c6f2D6815280a33FF907eE3a330D"; // Replace with your deployed contract address
const TOKEN_ADDRESS = "0xa4445D3433663FF4ad33A3cA10514DcB1c94DE32"
const CONTRACT_ABI = [
    // Your contract's ABI
    "function createSubscription(address _recipient, uint256 _amount, uint256 _interval) external",
    "function processPayment(address _subscriber) external",
    "function cancelSubscription() external",
    "function subscriptions(address) view returns (address subscriber, uint256 amount, uint256 interval, uint256 nextPayment, address recipient, bool active)"
];

// Connect to MetaMask wallet
export const connectWallet = async () => {
    if (!window.ethereum) {
        throw new Error("MetaMask is not installed.");
    }

    const provider = new ethers.providers.Web3Provider(window.ethereum);
    await provider.send("eth_requestAccounts", []); // Request account access
    const signer = provider.getSigner();
    const account = await signer.getAddress(); // Get connected account address
    return { provider, signer, account };
};

// Get contract instance
export const getContractInstance = (signer) => {
    return new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer);
};

// Create a subscription
export const createSubscription = async (recipient, amount, interval) => {
    try {
        const { signer } = await connectWallet();
        const contract = getContractInstance(signer);

        const tx = await contract.createSubscription(recipient, amount, interval);
        console.log("Transaction sent:", tx);
        await tx.wait(); // Wait for transaction to be mined
        console.log("Subscription created:", tx);
        return tx;
    } catch (error) {
        console.error("Error creating subscription:", error);
        throw error;
    }
};

// Process a payment
export const processPayment = async (subscriber) => {
    try {
        const { signer } = await connectWallet();
        const contract = getContractInstance(signer);

        const tx = await contract.processPayment(subscriber);
        console.log("Transaction sent:", tx);
        await tx.wait(); // Wait for transaction to be mined
        console.log("Payment processed:", tx);
        return tx;
    } catch (error) {
        console.error("Error processing payment:", error);
        throw error;
    }
};

// Cancel a subscription
export const cancelSubscription = async () => {
    try {
        const { signer } = await connectWallet();
        const contract = getContractInstance(signer);

        const tx = await contract.cancelSubscription();
        console.log("Transaction sent:", tx);
        await tx.wait(); // Wait for transaction to be mined
        console.log("Subscription canceled:", tx);
        return tx;
    } catch (error) {
        console.error("Error canceling subscription:", error);
        throw error;
    }
};

// View subscription details
export const getSubscriptionDetails = async (subscriber) => {
    try {
        const { signer } = await connectWallet();
        const contract = getContractInstance(signer);

        const subscription = await contract.subscriptions(subscriber);
        console.log("Subscription details:", subscription);

        return {
            subscriber: subscription.subscriber,
            amount: ethers.utils.formatEther(subscription.amount),
            interval: subscription.interval,
            nextPayment: new Date(subscription.nextPayment * 1000).toLocaleString(),
            recipient: subscription.recipient,
            active: subscription.active,
        };
    } catch (error) {
        console.error("Error fetching subscription details:", error);
        throw error;
    }
};

// OnClick function
export const startSubscription = async (payee, amount, interval) => {
    try {
        // 1. Connect to the wallet
        const { provider, signer, account } = await connectWallet();

        // 2. Create an instance of the AgentPay contract
        const agentPayContract = new ethers.Contract(
            CONTRACT_ADDRESS,
            CONTRACT_ABI,
            signer
        );

        // 3. Approve the AgentPay contract to withdraw tokens on user's behalf
        const tokenContract = new ethers.Contract(
            TOKEN_ADDRESS,
            [
                "function approve(address spender, uint256 amount) external returns (bool)"
            ],
            signer
        );
        const approvalTx = await tokenContract.approve(CONTRACT_ADDRESS, ethers.utils.parseUnits(amount, 18));
        console.log("Approval transaction sent:", approvalTx);
        await approvalTx.wait();
        console.log("Approval successful!");

        // 4. Create the subscription
        const subscriptionTx = await agentPayContract.createSubscription(
            payee,
            ethers.utils.parseUnits(amount, 18),
            interval
        );
        console.log("Subscription transaction sent:", subscriptionTx);
        await subscriptionTx.wait();
        console.log("Subscription created successfully!");

        // // 5. (Optional) Process the first payment immediately
        // const paymentTx = await agentPayContract.processPayment(account);
        // console.log("Payment transaction sent:", paymentTx);
        // await paymentTx.wait();
        // console.log("First payment processed successfully!");

        alert("Subscription started and first payment processed!");
    } catch (error) {
        console.error("Error starting subscription:", error);
        alert("Failed to start subscription. Check the console for details.");
    }
};