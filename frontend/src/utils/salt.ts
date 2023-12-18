import { BigNumberish, BigNumber } from 'ethers';
import { etherUnits } from 'viem';

export function generateSalt(length: number = 16): BigNumberish {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    let salt = '';

    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * charactersLength);
        salt += characters.charAt(randomIndex);
    }

    // Assuming you want to convert the string salt to a BigNumberish
    return BigNumber.from(`0x${Buffer.from(salt).toString('hex')}`);
}
