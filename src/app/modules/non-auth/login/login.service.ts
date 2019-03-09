import { Injectable } from '@angular/core';
import { AuthService } from 'src/app/shared/services/auth.service';
import { Login } from 'src/app/models/login';
import { Observable } from 'rxjs';
import { HttpClientService } from 'src/app/lib/http/http-client.service';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';

@Injectable()
export class LoginService {
  constructor(private authService: AuthService, private httpService: HttpClientService) { }

  login(loginModel: Login) {
    const body = `grant_type=password&client_id=${
      environment.clientId
      }&client_secret=${environment.clientsecret}&username=${
      loginModel.username
      }&password=${loginModel.password}`;
    return this.httpService.post('oauth/token', body, {
      'Content-Type': 'application/x-www-form-urlencoded'
    }).pipe(map((res: any) => {
      this.authService.setAuhToken(res.Token);
      this.authService.setUserRole(res.userInfo.role);
      return res;
    }));
  }
}
