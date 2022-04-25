import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CustomerAccountInformation } from '../_models/customerAccountInformation';

@Injectable({
  providedIn: 'root'
})
export class CustomerAccountInformationService {

  constructor(private http: HttpClient) { }

  getAll(accountId:string):Observable<CustomerAccountInformation>{
    return this.http.get<CustomerAccountInformation>(`/transactions/accounts/${accountId}`);
  }
}
