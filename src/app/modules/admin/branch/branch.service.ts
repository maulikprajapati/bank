import { Injectable } from '@angular/core';
import { HttpClientService } from 'src/app/lib/http/http-client.service';
import { map } from 'rxjs/operators';
import { Branch } from 'src/app/models/branch';

@Injectable()
export class BranchService {

  constructor(private httpService: HttpClientService) { }

  getAllBranch() {
    return this.httpService.get('api/getallbranch').pipe(map((res: any) => {
      return res.data;
    }));
  }

  getBranchById(id) {
    return this.httpService.get(`api/getBranchById?branchId=${id}`).pipe(map((res: any) =>
      res.data
    ));
  }

  addUpdateBranch(isNew, model: Branch) {
    const url = !isNew ? 'api/updatebranch' : 'api/createbranch'
    return this.httpService.post(url, model).pipe(map((res: any) =>
      res.data
    ));
  }
}


