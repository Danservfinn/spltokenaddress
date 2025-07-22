#!/usr/bin/env node

import { Command } from 'commander';
import chalk from 'chalk';
import ora from 'ora';
import fs from 'fs/promises';
import path from 'path';
import { validateAndGetPublicKey } from './utils/validation';
import { TokenFinder } from './services/tokenFinder';
import { 
  formatAsList, 
  formatAsJSON, 
  formatAsCSV, 
  formatAsTable,
  formatAsSimple 
} from './utils/formatter';
import { CLIOptions, OutputFormatType } from './types';

const DEFAULT_RPC_URL = 'https://api.mainnet-beta.solana.com';

const program = new Command();

program
  .name('spl-token-finder')
  .description('Find all SPL token addresses associated with a Solana wallet')
  .version('1.0.0')
  .argument('<wallet_address>', 'Solana wallet address to query')
  .option('-f, --format <format>', 'Output format (list, json, csv, table, simple)', 'list')
  .option('-o, --output <file>', 'Output to file instead of console')
  .option('-r, --rpc <url>', 'Custom RPC endpoint URL', DEFAULT_RPC_URL)
  .option('-t, --timeout <seconds>', 'Request timeout in seconds', '30')
  .action(async (walletAddress: string, options: CLIOptions) => {
    const isSimpleFormat = options.format === 'simple';
    const spinner = isSimpleFormat ? null : ora();
    
    try {
      // Validate wallet address
      if (spinner) {
        spinner.start('Validating wallet address...');
      }
      const publicKey = validateAndGetPublicKey(walletAddress);
      if (spinner) {
        spinner.succeed('Valid wallet address');
      }

      // Initialize token finder
      const tokenFinder = new TokenFinder(
        options.rpc,
        parseInt(options.timeout.toString()) * 1000
      );

      // Test RPC connection
      if (spinner) {
        spinner.start('Connecting to RPC endpoint...');
      }
      await tokenFinder.testConnection();
      if (spinner) {
        spinner.succeed('Connected to RPC endpoint');
      }

      // Fetch token accounts
      if (spinner) {
        spinner.start('Fetching SPL tokens...');
      }
      const tokenData = await tokenFinder.getTokenAccounts(publicKey);
      if (spinner) {
        spinner.succeed(`Found ${tokenData.tokenCount} SPL tokens`);
      }

      // Format output based on selected format
      let output: string;
      switch (options.format as OutputFormatType) {
        case 'json':
          output = formatAsJSON(tokenData);
          break;
        case 'csv':
          output = formatAsCSV(tokenData);
          break;
        case 'table':
          output = formatAsTable(tokenData);
          break;
        case 'simple':
          output = formatAsSimple(tokenData);
          break;
        case 'list':
        default:
          output = formatAsList(tokenData);
          break;
      }

      // Output to file or console
      if (options.output) {
        const outputPath = path.resolve(process.cwd(), options.output);
        await fs.writeFile(outputPath, output, 'utf-8');
        if (!isSimpleFormat) {
          console.log(chalk.green(`\n✓ Output saved to: ${outputPath}`));
        }
      } else {
        console.log(output);
      }

    } catch (error) {
      if (spinner) {
        spinner.fail('Operation failed');
      }
      
      if (error instanceof Error) {
        if (isSimpleFormat) {
          console.error(`Error: ${error.message}`);
        } else {
          console.error(chalk.red(`\n✗ Error: ${error.message}`));
        }
      } else {
        if (isSimpleFormat) {
          console.error('An unknown error occurred');
        } else {
          console.error(chalk.red('\n✗ An unknown error occurred'));
        }
      }
      
      process.exit(1);
    }
  });

// Parse command line arguments
program.parse(process.argv);

// Show help if no arguments provided
if (!process.argv.slice(2).length) {
  program.outputHelp();
} 