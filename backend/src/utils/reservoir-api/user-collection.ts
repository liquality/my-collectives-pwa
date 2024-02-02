import axios from "axios";
import { configHeaders } from "./token-metadata";

export async function getUserCollections(publicAddress: string) {
    const url = `https://api-${process.env.MAIN_NETWORK}.reservoir.tools/users/${publicAddress}/collections/v4`
    try {
        const response = await axios.get(url, configHeaders);
        const data = response.data;

        if (data) {
            return data.collections
        } else throw Error("Could not find any data for address: " + publicAddress)

    } catch (error) {
        console.error('Error:', error);
    }
}
