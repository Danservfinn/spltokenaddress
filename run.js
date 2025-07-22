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
    
    // Run using npm dev to ensure it works from source
    const args = ['run', 'dev', '--', walletAddress.trim(), '--format', 'simple'];
    
    const child = spawn('npm', args, {
      stdio: ['inherit', 'inherit', 'pipe']
    });
    
    // Suppress stderr to hide npm command output
    child.stderr.on('data', () => {});
    
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