import { isValidSolanaAddress, validateAndGetPublicKey } from '../validation';

describe('Validation Utils', () => {
  describe('isValidSolanaAddress', () => {
    it('should return true for valid Solana addresses', () => {
      const validAddresses = [
        '7xKXtg2CW87d97TXJSDpbD5jBkheTqA83TZRuJosgAsU',
        'So11111111111111111111111111111111111111112',
        'EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v',
      ];

      validAddresses.forEach(address => {
        expect(isValidSolanaAddress(address)).toBe(true);
      });
    });

    it('should return false for invalid Solana addresses', () => {
      const invalidAddresses = [
        '',
        'invalid',
        '0x1234567890123456789012345678901234567890', // Ethereum address
        'short',
        '!@#$%^&*()',
        null as any,
        undefined as any,
      ];

      invalidAddresses.forEach(address => {
        expect(isValidSolanaAddress(address)).toBe(false);
      });
    });
  });

  describe('validateAndGetPublicKey', () => {
    it('should return PublicKey for valid addresses', () => {
      const validAddress = '7xKXtg2CW87d97TXJSDpbD5jBkheTqA83TZRuJosgAsU';
      const publicKey = validateAndGetPublicKey(validAddress);
      
      expect(publicKey).toBeDefined();
      expect(publicKey.toString()).toBe(validAddress);
    });

    it('should throw error for empty address', () => {
      expect(() => validateAndGetPublicKey('')).toThrow('Address cannot be empty');
      expect(() => validateAndGetPublicKey('   ')).toThrow('Address cannot be empty');
    });

    it('should throw error for invalid address', () => {
      expect(() => validateAndGetPublicKey('invalid')).toThrow('Invalid Solana address: invalid');
    });
  });
}); 