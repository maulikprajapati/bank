export class Account {
    id: number;
    securityPin: number;
    amount: number
    type: string;;
    branchId: number;
}

export class AccountBranch extends Account {
    accountId: number;
    name:string;
    location:string;
}