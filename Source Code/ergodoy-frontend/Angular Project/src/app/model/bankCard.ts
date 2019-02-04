import { Customer } from './customer';

export class BankCard{
    bcIdPk?: number;
    bcNumber: string;
    bcCcv: number;
    bcType: string;
    bcCustomerIdFk: Customer
}