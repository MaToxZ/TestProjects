import { Injectable } from '@angular/core';
import { GlobalVariables } from '../../util/GlobalVariables';
import { BankCard } from '../../model/bankCard';
import { HttpClient, HttpHeaders } from '@angular/common/http';
 
import { Observable, of } from 'rxjs';

const path = GlobalVariables.apiHost + "bankCard/";

@Injectable({
  providedIn: 'root'
})
export class BankCardService {

  constructor(private http: HttpClient) { }

  create(bankCard: BankCard){
    let url = path + "create";
    return this.http.post(url,bankCard,{responseType: "text"})
  }

  edit(bankCard: BankCard){
    let url = path + "edit";
    return this.http.put(url,bankCard,{responseType: "text"})
  }

  delete(bankCard: BankCard){
    let url = path + "delete/" + bankCard.bcIdPk;
    return this.http.delete(url,{responseType: "text"})
  }

  findAll(): Observable<BankCard[]>{
    let url = path + "findAll";
    return this.http.get<BankCard[]>(url)
  }

  find(bankCardId: number): Observable<BankCard>{
    let url = path + "find/" + bankCardId;
    return this.http.get<BankCard>(url);
  }

  findByCustomerId(customerId: number): Observable<BankCard[]>{
    let url = path + "findByCustomerId/" + customerId
    return this.http.get<BankCard[]>(url);
  }

}
