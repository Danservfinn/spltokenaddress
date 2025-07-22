/**
 * Example: Using the TokenFinder class programmatically
 * 
 * This example shows how to use the TokenFinder class directly
 * in your own TypeScript/JavaScript projects.
 */

import { TokenFinder } from '../src/services/tokenFinder';
import { validateAndGetPublicKey } from '../src/utils/validation';

async function main() {
  // Example wallet address
  const walletAddress = '7xKXtg2CW87d97TXJSDpbD5jBkheTqA83TZRuJosgAsU';
  
  try {
    // Validate the address
    const publicKey = validateAndGetPublicKey(walletAddress);
    
    // Create a TokenFinder instance
    const tokenFinder = new TokenFinder('https://api.mainnet-beta.solana.com');
    
    // Test connection
    await tokenFinder.testConnection();
    console.log('✅ Connected to Solana RPC');
    
    // Fetch token accounts
    console.log(`\nFetching tokens for wallet: ${walletAddress}`);
    const tokenData = await tokenFinder.getTokenAccounts(publicKey);
    
    // Display results
    console.log(`\nFound ${tokenData.tokenCount} tokens:`);
    
    if (tokenData.tokens.length > 0) {
      tokenData.tokens.forEach((token, index) => {
        console.log(`\n${index + 1}. Token Mint: ${token.mint}`);
        console.log(`   Balance: ${token.balance}`);
        console.log(`   Decimals: ${token.decimals}`);
        console.log(`   Token Account: ${token.tokenAccount}`);
      });
    } else {
      console.log('No tokens found for this wallet.');
    }
    
    // Example: Filter tokens with non-zero balance
    const tokensWithBalance = tokenData.tokens.filter(token => token.balance > 0);
    console.log(`\n\nTokens with non-zero balance: ${tokensWithBalance.length}`);
    
    // Example: Get just the mint addresses
    const mintAddresses = tokenData.tokens.map(token => token.mint);
    console.log('\nAll mint addresses:', mintAddresses);
    
  } catch (error) {
    console.error('Error:', error);
  }
}

// Run the example
main(); 