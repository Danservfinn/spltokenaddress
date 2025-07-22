#!/bin/bash

# Prompt for Solana wallet address
read -p "Enter Solana wallet address: " wallet_address

# Check if address was provided
if [ -z "$wallet_address" ]; then
    echo "Error: No wallet address provided" >&2
    exit 1
fi

# Run the built CLI directly to avoid npm output
node dist/cli.js "$wallet_address" --format simple 