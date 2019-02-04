import { Injectable } from '@angular/core';
import { GlobalVariables } from '../../util/GlobalVariables';
import { Customer } from '../../model/customer';
import { HttpClient, HttpHeaders } from '@angular/common/http';
 
import { Observable, of } from 'rxjs';

const path = GlobalVariables.apiHost + "customer/";

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  constructor(private http: HttpClient) { }

  create(customer: Customer){
    let url = path + "create";
    return this.http.post(url,customer,{responseType: "text"})
  }

  edit(customer: Customer){
    let url = path + "edit";
    return this.http.put(url,customer,{responseType: "text"})
  }

  delete(customer: Customer){
    let url = path + "delete/" + customer.cIdPk;
    return this.http.delete(url,{responseType: "text"})
  }

  findAll(): Observable<Customer[]>{
    let url = path + "findAll";
    return this.http.get<Customer[]>(url)
  }

  find(customerId: number): Observable<Customer>{
    let url = path + "find/" + customerId;
    return this.http.get<Customer>(url);
  }
}
