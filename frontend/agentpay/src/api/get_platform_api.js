
const API_URL = 'https://mocki.io/v1/05448b90-7161-438a-be38-1fbcf6764470';

// Function to fetch platform data
export const fetchPlatforms = async () => {
    try {
        const response = await fetch(API_URL);
        if (!response.ok) {
            throw new Error('Failed to fetch data');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error(error);
        return [];  // Return empty array in case of error
    }
};
