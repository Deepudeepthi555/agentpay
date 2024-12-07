import { ethers } from "ethers";

// Constants for your smart contract
const CONTRACT_ADDRESS = "your_contract_address";
const CONTRACT_ABI = [
    // Replace with your contract's ABI
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

// Call a read-only function (e.g., view function)
export const readContract = async (functionName, args = []) => {
    try {
        const { signer } = await connectWallet();
        const contract = getContractInstance(signer);
        const data = await contract[functionName](...args);
        return data;
    } catch (error) {
        console.error("Error reading contract:", error);
        throw error;
    }
};

// Call a write function (e.g., payable or state-changing function)
export const writeContract = async (functionName, args = [], value = "0") => {
    try {
        const { signer } = await connectWallet();
        const contract = getContractInstance(signer);

        const tx = await contract[functionName](...args, {
            value: ethers.utils.parseEther(value), // Optional value to send (ETH)
        });

        console.log("Transaction sent:", tx);
        await tx.wait(); // Wait for transaction to be mined
        console.log("Transaction mined:", tx);
        return tx;
    } catch (error) {
        console.error("Error writing to contract:", error);
        throw error;
    }
};
