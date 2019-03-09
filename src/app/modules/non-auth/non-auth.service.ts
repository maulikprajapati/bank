import { Injectable } from '@angular/core';
import { Login } from 'src/app/models/login';
import { HttpClientService } from 'src/app/lib/http/http-client.service';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';

@Injectable()
export class NonAuthService {

  constructor(private httpService: HttpClientService) { }

  login(model: Login) {
    const body = `grant_type=password&client_id=${
      environment.clientId
      }&client_secret=${environment.clientsecret}&username=${
      model.username
      }&password=${model.password}`;
    return this.httpService.post('oauth/token', body).pipe(map(res => res));
  }

}
