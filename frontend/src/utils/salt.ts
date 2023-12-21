import { BigNumberish, BigNumber } from 'ethers';
import { etherUnits } from 'viem';

export function generateSalt(length: number = 16): number {
    const characters = '0123456789';
    const charactersLength = 4;
    let salt = '';

    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * charactersLength);
        salt += characters.charAt(randomIndex);
    }

    // Assuming you want to convert the string salt to a BigNumberish
    return Number(salt)
}
