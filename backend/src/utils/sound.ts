import axios from "axios";
import dotenv from "dotenv"
dotenv.config()




const getReleaseIdQuery = `query ApiExplorer {
    releaseGenres {
        name
    }
}`;

const SOUND_API_URL = 'https://api.sound.xyz/graphql';
const SOUND_API_KEY = process.env.SOUND_API_KEY;
const soundHeaders = {
    'Content-Type': 'application/json',
    'X-Sound-Client-Key': SOUND_API_KEY,
};

export async function sendGraphQLQuery(requestQuery: any) {
    try {
        const response = await axios.post(
            SOUND_API_URL,
            {
                query: requestQuery,
            },
            {
                headers: soundHeaders,
            }
        );
        if (response.status === 200) {
            const data = response.data;
            return data
        } else {
            console.error('GraphQL request failed with status:', response.status);
        }
    } catch (error) {
        console.error('Error sending GraphQL request:', error);
    }
}

// Call the function to send the GraphQL query