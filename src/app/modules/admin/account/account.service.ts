import { Injectable } from '@angular/core';
import { HttpClientService } from 'src/app/lib/http/http-client.service';
import { map } from 'rxjs/operators';
import { Customer } from 'src/app/models/customer';
import { Account } from 'src/app/models/account';

@Injectable()
export class AccountService {

  constructor(private httpService: HttpClientService) { }

  getAllAccounts() {
    return this.httpService.get('api/getallcustomer').pipe(map((res: any) => {
      return res.data;
    }));
  }

  getAccountById(id) {
    return this.httpService.get(`api/getaccountid?accountId=${id}`).pipe(map((res: any) =>
      res.data
    ));
  }

  addUpdateAccount(isNew, model: Account) {
    const url = !isNew ? 'api/updateaccount' : 'api/createaccount'
    return this.httpService.post(url, model).pipe(map((res: any) =>
      res.data
    ));
  }
}


