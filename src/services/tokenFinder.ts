import { Connection, PublicKey } from '@solana/web3.js';
import { TOKEN_PROGRAM_ID } from '@solana/spl-token';
import { TokenInfo, OutputFormat } from '../types';

/**
 * Fetches all SPL token addresses for a given wallet
 */
export class TokenFinder {
  private connection: Connection;

  constructor(rpcUrl: string, timeout: number = 30000) {
    this.connection = new Connection(rpcUrl, {
      commitment: 'confirmed',
      confirmTransactionInitialTimeout: timeout
    });
  }

  /**
   * Get all token accounts for a wallet address
   */
  async getTokenAccounts(walletAddress: PublicKey): Promise<OutputFormat> {
    try {
      // Fetch token accounts
      const response = await this.connection.getParsedTokenAccountsByOwner(
        walletAddress,
        { programId: TOKEN_PROGRAM_ID }
      );

      // Process token accounts
      const tokens: TokenInfo[] = response.value.map((tokenAccount: any) => {
        const accountData = tokenAccount.account.data.parsed.info;
        return {
          mint: accountData.mint,
          tokenAccount: tokenAccount.pubkey.toString(),
          balance: accountData.tokenAmount.uiAmount || 0,
          decimals: accountData.tokenAmount.decimals,
          rawAmount: accountData.tokenAmount.amount
        };
      });

      // Sort by balance (highest first)
      tokens.sort((a, b) => b.balance - a.balance);

      return {
        walletAddress: walletAddress.toString(),
        tokenCount: tokens.length,
        tokens
      };
    } catch (error) {
      if (error instanceof Error) {
        // Check for specific RPC errors
        if (error.message.includes('429') || error.message.includes('rate')) {
          throw new Error('Rate limit exceeded. Please try again later or use a different RPC endpoint.');
        }
        if (error.message.includes('timeout')) {
          throw new Error('Request timed out. Please try again or increase the timeout.');
        }
        throw error;
      }
      throw new Error('Unknown error occurred while fetching token accounts');
    }
  }

  /**
   * Test RPC connection
   */
  async testConnection(): Promise<void> {
    try {
      await this.connection.getVersion();
    } catch (error) {
      throw new Error('Failed to connect to RPC endpoint. Please check your connection and RPC URL.');
    }
  }
} 