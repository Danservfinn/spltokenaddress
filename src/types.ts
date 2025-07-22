export interface TokenAccount {
  pubkey: string;
  account: {
    data: {
      parsed: {
        info: {
          mint: string;
          owner: string;
          tokenAmount: {
            amount: string;
            decimals: number;
            uiAmount: number;
            uiAmountString: string;
          };
        };
      };
    };
    executable: boolean;
    lamports: number;
    owner: string;
    rentEpoch: number;
  };
}

export interface TokenInfo {
  mint: string;
  tokenAccount: string;
  balance: number;
  decimals: number;
  rawAmount: string;
}

export interface OutputFormat {
  walletAddress: string;
  tokenCount: number;
  tokens: TokenInfo[];
}

export type OutputFormatType = 'list' | 'json' | 'csv' | 'table' | 'simple';

export interface CLIOptions {
  format: OutputFormatType;
  output?: string;
  rpc: string;
  timeout: number;
} 