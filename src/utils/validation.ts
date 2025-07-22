import { PublicKey } from '@solana/web3.js';

/**
 * Validates if the given string is a valid Solana address
 * @param address The address to validate
 * @returns true if valid, false otherwise
 */
export function isValidSolanaAddress(address: string): boolean {
  try {
    // Try to create a PublicKey instance
    new PublicKey(address);
    return true;
  } catch {
    return false;
  }
}

/**
 * Validates and returns a PublicKey instance
 * @param address The address to validate
 * @returns PublicKey instance
 * @throws Error if address is invalid
 */
export function validateAndGetPublicKey(address: string): PublicKey {
  if (!address || address.trim().length === 0) {
    throw new Error('Address cannot be empty');
  }

  try {
    return new PublicKey(address);
  } catch (error) {
    throw new Error(`Invalid Solana address: ${address}`);
  }
} 