import chalk from 'chalk';
import Table from 'cli-table3';
import { createObjectCsvStringifier } from 'csv-writer';
import { OutputFormat } from '../types';

/**
 * Formats the output as a simple list
 */
export function formatAsList(data: OutputFormat): string {
  let output = chalk.cyan(`\nWallet: ${data.walletAddress}\n`);
  output += chalk.green(`Found ${data.tokenCount} SPL tokens:\n\n`);

  if (data.tokens.length === 0) {
    return output + chalk.yellow('No tokens found for this wallet.\n');
  }

  data.tokens.forEach((token, index) => {
    output += chalk.white(`${index + 1}. `);
    output += chalk.blue(token.mint);
    if (token.balance > 0) {
      output += chalk.gray(` (Balance: ${token.balance})`);
    }
    output += '\n';
  });

  return output;
}

/**
 * Formats the output as JSON
 */
export function formatAsJSON(data: OutputFormat): string {
  return JSON.stringify(data, null, 2);
}

/**
 * Formats the output as CSV
 */
export function formatAsCSV(data: OutputFormat): string {
  if (data.tokens.length === 0) {
    return 'mint,tokenAccount,balance,decimals,rawAmount\n';
  }

  const csvStringifier = createObjectCsvStringifier({
    header: [
      { id: 'mint', title: 'Mint Address' },
      { id: 'tokenAccount', title: 'Token Account' },
      { id: 'balance', title: 'Balance' },
      { id: 'decimals', title: 'Decimals' },
      { id: 'rawAmount', title: 'Raw Amount' }
    ]
  });

  const header = csvStringifier.getHeaderString();
  const records = csvStringifier.stringifyRecords(data.tokens);
  
  return header + records;
}

/**
 * Formats the output as a table
 */
export function formatAsTable(data: OutputFormat): string {
  let output = chalk.cyan(`\nWallet: ${data.walletAddress}\n`);
  output += chalk.green(`Found ${data.tokenCount} SPL tokens:\n\n`);

  if (data.tokens.length === 0) {
    return output + chalk.yellow('No tokens found for this wallet.\n');
  }

  const table = new Table({
    head: [
      chalk.cyan('#'),
      chalk.cyan('Mint Address'),
      chalk.cyan('Balance'),
      chalk.cyan('Decimals')
    ],
    style: {
      head: [],
      border: []
    }
  });

  data.tokens.forEach((token, index) => {
    table.push([
      chalk.white((index + 1).toString()),
      chalk.blue(token.mint),
      chalk.green(token.balance.toString()),
      chalk.gray(token.decimals.toString())
    ]);
  });

  return output + table.toString() + '\n';
}

/**
 * Formats the output as simple text (just mint addresses)
 */
export function formatAsSimple(data: OutputFormat): string {
  if (data.tokens.length === 0) {
    return '';
  }
  return data.tokens.map(token => token.mint).join('\n');
}

/**
 * Truncates a string in the middle
 */
export function truncateMiddle(str: string, maxLength: number = 20): string {
  if (str.length <= maxLength) return str;
  
  const half = Math.floor(maxLength / 2);
  return `${str.slice(0, half)}...${str.slice(-half)}`;
} 