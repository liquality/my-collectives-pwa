//This file touches everything that has to do with the metadata from Reservoir NFT API

import fetch from 'node-fetch';


export async function fetchReservoirData(collectionAddress: string, network: string) {
    const apiKey = 'your-api-key'; // 
    try {
        const response = await fetch(`https://api-${network}.reservoir.tools/tokens/v6?collection=${collectionAddress}`
            , {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'x-api-key': `${apiKey}`,
                },
            });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        console.log('Data:', data);
        return data
    } catch (error) {
        console.error('Error:', error);
    }
}




