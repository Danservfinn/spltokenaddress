#!/usr/bin/env node

const readline = require('readline');
const { spawn } = require('child_process');

// Create readline interface
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Function to prompt user input
function askQuestion(question) {
  return new Promise((resolve) => {
    rl.question(question, (answer) => {
      resolve(answer);
    });
  });
}

async function main() {
  try {
    // Get wallet address
    const walletAddress = await askQuestion('Enter Solana wallet address: ');
    
    if (!walletAddress.trim()) {
      console.error('Error: No wallet address provided');
      process.exit(1);
    }

    // Close readline interface
    rl.close();
    
    // Run the built CLI directly to avoid npm output
    const args = ['dist/cli.js', walletAddress.trim(), '--format', 'simple'];
    
    const child = spawn('node', args, {
      stdio: 'inherit'
    });
    
    child.on('close', (code) => {
      if (code !== 0) {
        process.exit(code);
      }
    });
    
  } catch (error) {
    console.error('Error:', error.message);
    rl.close();
    process.exit(1);
  }
}

main(); 