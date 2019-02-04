import { BankCard } from './bankCard';

export class CardConsumption{
    ccIdPk?: number;
    ccDate: Date;
    ccDescription: string;
    ccAmount: number;
    ccBankCardIdFk: BankCard
}