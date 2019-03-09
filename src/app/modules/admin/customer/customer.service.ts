import { Injectable } from '@angular/core';
import { HttpClientService } from 'src/app/lib/http/http-client.service';
import { map } from 'rxjs/operators';
import { Customer } from 'src/app/models/customer';

@Injectable()
export class CustomerService {

  constructor(private httpService: HttpClientService) { }

  getAllCustomers() {
    return this.httpService.get('api/getallcustomer').pipe(map((res: any) => {
      return res.data;
    }));
  }

  getCustomerById(id) {
    return this.httpService.get(`api/getcustomerbyid?userId=${id}`).pipe(map((res: any) =>
      res.data
    ));
  }

  addUpdateCustomer(isNew,model: Customer) {
    const url = !isNew? 'api/updatecustomer': 'api/createcustomer'
    return this.httpService.post(url, model).pipe(map((res: any) =>
      res.data
    ));
  }

  addaccount(model: Customer) {
    const url = 'api/updatecustomeraccount';
    const body = {
      id: +model.id,
      accountId: +model.account_id
    }
    return this.httpService.post(url, body).pipe(map((res: any) =>
      res.data
    ));
  }
}


