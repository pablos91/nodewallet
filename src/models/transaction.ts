export interface Transaction {
    id?: string;
    received?: boolean;
    amount?: number;
    confirmations?: number;
    date?: number;
    dateReceived?: number;
    address?: string;
}