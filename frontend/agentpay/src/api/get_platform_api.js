
const API_URL = 'https://mocki.io/v1/e5b9bde4-a34e-42e3-8fc7-38d3710794ee';

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
