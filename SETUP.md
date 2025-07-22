# SPL Token Finder - Setup Guide

## Prerequisites
- Node.js (version 16 or higher) - Download from [nodejs.org](https://nodejs.org/)
- Terminal/Command Prompt access

## Quick Setup

1. **Download the project:**
   - Download and extract the ZIP file, or
   - Clone with git: `git clone https://github.com/Danservfinn/spltokenaddress.git`

2. **Navigate to the project folder:**
   ```bash
   cd spltokenaddress
   ```

3. **Install dependencies:**
   ```bash
   npm install
   ```

4. **Build the project:**
   ```bash
   npm run build
   ```

## Usage

### Easy Mode (Interactive)
```bash
./run.sh
```
Then enter your Solana wallet address when prompted.

### Direct Command
```bash
node dist/cli.js <your-wallet-address> --format simple
```

## Example
```bash
$ ./run.sh
Enter Solana wallet address: A7Kj5g44rEtXHNbdRRSMZ9eDk6Z66XGzjxvZDt1zTWdD
ETYoL6Ru47ZSHZa7JpocMUJiPxPdgV3yzATDG2TMvTTC
FMwXnEU3KkX2tLRJ9Mk1UZ4AveZuum3PTRpkv3SFapZf
n54ZwXEcLnc3o7zK48nhrLV4KTU5wWD4iq7Gvdt5tik
kinXdEcpDQeHPEuQnqmUgtYykqKGVFq6CeVX5iAHJq6
AMjzRn1TBQwQfNAjHFeBb7uGbbqbJB7FzXAnGgdFPk6K
EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v
```

## Troubleshooting

**"Command not found" error:**
- Make sure Node.js is installed
- Run `npm run build` first

**"Module not found" error:**
- Run `npm install` to install dependencies

**Permission denied on ./run.sh:**
- Run `chmod +x run.sh` to make it executable

## Support
If you encounter any issues, please contact [your-contact-info]. 