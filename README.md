# SPL Token Finder

A command-line tool to retrieve all SPL token addresses associated with a Solana wallet address using the `getTokenAccountsByOwner` RPC endpoint.

## Features

- 🔍 **Quick Discovery**: Find all SPL tokens held by any Solana wallet
- 🎨 **Multiple Output Formats**: List, JSON, CSV, Table, and Simple formats
- 📁 **File Export**: Save results to a file
- 🌐 **Custom RPC Support**: Use your own RPC endpoint
- ⚡ **Fast & Efficient**: Optimized for performance with proper error handling
- 🎯 **Address Validation**: Validates Solana addresses before querying
- 🚀 **Interactive Mode**: Simple scripts that prompt for wallet address and output clean results
- 🎯 **Clean Output**: Simple format outputs only token addresses with no extra messages
- 📝 **Scriptable**: Perfect for automation and piping to other commands

## Installation

### From NPM (when published)
```bash
npm install -g spl-token-finder
```

### From Source
```bash
# Clone the repository
git clone https://github.com/Danservfinn/spltokenaddress.git
cd spltokenaddress

# Install dependencies
npm install

# Build the project
npm run build

# Link globally (optional)
npm link
```

## Usage

### 🚀 Interactive Mode (Recommended)
The easiest way to use the tool - just run and enter a wallet address when prompted:

```bash
# Option 1: Shell script (macOS/Linux)
./run.sh

# Option 2: Node.js script (Cross-platform)
node run.js

# Option 3: NPM script
npm run run-interactive
```

**Example session:**
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

### 📋 Direct Command Usage

#### Quick Commands (Clean Output)
```bash
# Simple format - just token addresses (cleanest)
node dist/cli.js <wallet_address> --format simple

# Using npm dev script
npm run dev -- <wallet_address> --format simple
```

#### All Format Options
```bash
# Default list format with balances
node dist/cli.js <wallet_address>

# JSON format
node dist/cli.js <wallet_address> --format json

# CSV format
node dist/cli.js <wallet_address> --format csv

# Table format
node dist/cli.js <wallet_address> --format table

# Simple format (just addresses)
node dist/cli.js <wallet_address> --format simple
```

### Examples with Real Address

1. **Simple output (just token addresses)**
   ```bash
   node dist/cli.js A7Kj5g44rEtXHNbdRRSMZ9eDk6Z66XGzjxvZDt1zTWdD --format simple
   ```

2. **Save to file**
   ```bash
   node dist/cli.js A7Kj5g44rEtXHNbdRRSMZ9eDk6Z66XGzjxvZDt1zTWdD --format simple --output tokens.txt
   ```

3. **JSON output**
   ```bash
   node dist/cli.js A7Kj5g44rEtXHNbdRRSMZ9eDk6Z66XGzjxvZDt1zTWdD --format json
   ```

4. **Table format**
   ```bash
   node dist/cli.js A7Kj5g44rEtXHNbdRRSMZ9eDk6Z66XGzjxvZDt1zTWdD --format table
   ```

5. **Custom RPC endpoint**
   ```bash
   node dist/cli.js A7Kj5g44rEtXHNbdRRSMZ9eDk6Z66XGzjxvZDt1zTWdD --rpc https://your-rpc-endpoint.com --format simple
   ```

6. **Pipe to other commands**
   ```bash
   # Count tokens
   ./run.sh | wc -l
   
   # Save to file
   ./run.sh > my_tokens.txt
   
   # Search for specific token
   ./run.sh | grep "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v"
   ```

### Command Line Options

| Option | Short | Description | Default |
|--------|-------|-------------|---------|
| `--format <format>` | `-f` | Output format: `list`, `json`, `csv`, `table`, `simple` | `list` |
| `--output <file>` | `-o` | Save output to file | Console output |
| `--rpc <url>` | `-r` | Custom RPC endpoint URL | Solana mainnet |
| `--timeout <seconds>` | `-t` | Request timeout in seconds | `30` |
| `--help` | `-h` | Display help information | - |
| `--version` | `-V` | Display version number | - |

### Format Descriptions

- **`simple`** - Clean output with just token mint addresses (one per line) - Perfect for scripting
- **`list`** - User-friendly list with balances and colors (default)
- **`table`** - Formatted table with columns for easy reading
- **`json`** - Structured JSON data for programmatic use
- **`csv`** - Comma-separated values for spreadsheet import

## Output Formats

### List Format (Default)
```
Wallet: 7xKXtg2CW87d97TXJSDpbD5jBkheTqA83TZRuJosgAsU
Found 3 SPL tokens:

1. EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v (Balance: 100.5)
2. So11111111111111111111111111111111111111112 (Balance: 1.5)
3. 7kbnvuGBxxj8AG9qp8Scn56muWGaRaFqxg1FsRp3PaFT (Balance: 0)
```

### JSON Format
```json
{
  "walletAddress": "7xKXtg2CW87d97TXJSDpbD5jBkheTqA83TZRuJosgAsU",
  "tokenCount": 3,
  "tokens": [
    {
      "mint": "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v",
      "tokenAccount": "FqWh4BPpGKvWS7xYLunV4Pr7g7NvJTJGCG2MBJdgKJvP",
      "balance": 100.5,
      "decimals": 6,
      "rawAmount": "100500000"
    }
  ]
}
```

### Table Format
```
Wallet: 7xKXtg2CW87d97TXJSDpbD5jBkheTqA83TZRuJosgAsU
Found 3 SPL tokens:

┌───┬──────────────────────────────────────────────┬─────────┬──────────┐
│ # │ Mint Address                                 │ Balance │ Decimals │
├───┼──────────────────────────────────────────────┼─────────┼──────────┤
│ 1 │ EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v│ 100.5   │ 6        │
│ 2 │ So11111111111111111111111111111111111111112  │ 1.5     │ 9        │
│ 3 │ 7kbnvuGBxxj8AG9qp8Scn56muWGaRaFqxg1FsRp3PaFT│ 0       │ 6        │
└───┴──────────────────────────────────────────────┴─────────┴──────────┘
```

### Simple Format (Just Token Addresses)
```
EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v
So11111111111111111111111111111111111111112
7kbnvuGBxxj8AG9qp8Scn56muWGaRaFqxg1FsRp3PaFT
```

## Development

### Setup and Building
```bash
# Install dependencies
npm install

# Build the project (required for interactive scripts)
npm run build
```

### Development Commands
```bash
# Run in development mode
npm run dev -- <wallet_address> --format simple

# Run tests
npm test

# Lint code
npm run lint

# Build for production
npm run build
```

### Interactive Scripts
```bash
# Run interactive mode (builds automatically)
npm run run-interactive

# Or run directly
./run.sh      # Shell script (macOS/Linux)
node run.js   # Node.js script (cross-platform)
```

### Client Distribution
```bash
# Create a client-ready package
./client-package.sh

# This creates a dist-client/ folder and spl-token-finder-client.zip
# Perfect for sharing with clients who need the tool
```

### Programmatic Usage

You can also use the TokenFinder class directly in your TypeScript/JavaScript projects:

```typescript
import { TokenFinder } from 'spl-token-finder/dist/services/tokenFinder';
import { validateAndGetPublicKey } from 'spl-token-finder/dist/utils/validation';

async function getTokens(walletAddress: string) {
  const publicKey = validateAndGetPublicKey(walletAddress);
  const tokenFinder = new TokenFinder('https://api.mainnet-beta.solana.com');
  
  const tokenData = await tokenFinder.getTokenAccounts(publicKey);
  return tokenData.tokens;
}
```

See the `examples/` directory for more detailed examples.

## 🚀 Quick Start

1. **Clone and setup:**
   ```bash
   git clone https://github.com/Danservfinn/spltokenaddress.git
   cd spltokenaddress
   npm install
   npm run build
   ```

2. **Run the interactive script:**
   ```bash
   ./run.sh
   # Enter wallet address when prompted
   ```

3. **Or use direct command:**
   ```bash
   node dist/cli.js <wallet-address> --format simple
   ```

That's it! The app will validate the address, connect to Solana, fetch the tokens, and output just the token mint addresses.

## Error Handling

The tool handles various error scenarios gracefully:

- **Invalid Address**: Validates Solana address format before making RPC calls
- **RPC Connection Errors**: Clear error messages for connection failures
- **Rate Limiting**: Detects and reports rate limit errors
- **Timeout**: Configurable timeout with clear error messages
- **Empty Results**: Friendly message when no tokens are found

## Performance Considerations

- Uses `getParsedTokenAccountsByOwner` for efficient data retrieval
- Implements timeout to prevent hanging requests
- Sorts tokens by balance for better readability
- Minimal dependencies for fast execution

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

MIT License - see the [LICENSE](LICENSE) file for details

## Acknowledgments

- Built with [Solana Web3.js](https://github.com/solana-labs/solana-web3.js)
- CLI powered by [Commander.js](https://github.com/tj/commander.js)
- Beautiful terminal output with [Chalk](https://github.com/chalk/chalk)

## Support

For issues, questions, or contributions, please visit the [GitHub repository](https://github.com/Danservfinn/spltokenaddress). 
