import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Account } from '../_models/account';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  constructor(private http: HttpClient) { }

  getAll(customerId:string):Observable<Account[]>{
    return this.http.get<Account[]>(`/accounts/customers/${customerId}`);
  }

  post(account:Account):Observable<any>{
    return this.http.post<any>(`/accounts`,{
      customerId : account.customerId,
      initial: account.balance,
      name: account.name
    });
  }
}
