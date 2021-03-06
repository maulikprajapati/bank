import { Injectable } from '@angular/core';
import { HttpClientService } from 'src/app/lib/http/http-client.service';
import { map } from 'rxjs/operators';
import { Customer } from 'src/app/models/customer';
import { Account, AccountBranch } from 'src/app/models/account';
import { AuthService } from 'src/app/shared/services/auth.service';
import { AccountActivityModel } from 'src/app/models/acountActivity';
import { TransferModel } from 'src/app/models/transfer';

@Injectable()
export class UserService {

    constructor(private httpService: HttpClientService, private authService: AuthService) { }
    accountInfo = new AccountBranch();
    updateAmmount(type: string, ammount: number) {
        if (type === "Credit") {
            this.accountInfo.amount += ammount;
        } else {
            this.accountInfo.amount -= ammount;
        }

    }
    getAccountById(id) {
        return this.httpService.get(`api/getaccountid?accountId=${id}`).pipe(map((res: any) => {
            this.accountInfo = res.data;
            return res.data;
        }
        ));
    }

    getCustomerById(id) {
        return this.httpService.get(`api/getcustomerbyid?userId=${id}`).pipe(map((res: any) =>
            res.data
        ));
    }

    getTransactionsById() {
        const customerId = this.authService.getUserInfo().account_id;
        return this.httpService.get(`api/gettransactionbycustomerid?customerId=${customerId}`).pipe(map((res: any) =>
            res.data
        ));
    }

    createTransaction(model: AccountActivityModel) {
        return this.httpService.post(`api/createtransaction`, model).pipe(map((res: any) => {
            this.updateAmmount(model.type, model.amount);
            return res.data
        }));
    }

    transferMoney(model: TransferModel) {
        return this.httpService.post(`api/createtransfer`, model).pipe(map((res: any) => {
            this.updateAmmount('Debit', +model.amount);
            return res.data
        }));
    }
}


