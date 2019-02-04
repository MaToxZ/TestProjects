import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
 
import { Observable, of } from 'rxjs';
import { GlobalVariables } from '../../util/GlobalVariables';
import { CardConsumption } from '../../model/cardConsumption';

const path = GlobalVariables.apiHost + "cardConsumption/";


@Injectable({
  providedIn: 'root'
})
export class CardConsumptionService {

  constructor(private http: HttpClient) { }

  create(cardConsumption: CardConsumption){
    let url = path + "create";
    return this.http.post(url,cardConsumption,{responseType: "text"})
  }

  edit(cardConsumption: CardConsumption){
    let url = path + "edit";
    return this.http.put(url,cardConsumption,{responseType: "text"})
  }

  delete(cardConsumption: CardConsumption){
    let url = path + "delete/" + cardConsumption.ccIdPk;
    return this.http.delete(url,{responseType: "text"})
  }

  findAll(): Observable<CardConsumption[]>{
    let url = path + "findAll";
    return this.http.get<CardConsumption[]>(url)
  }

  find(cardConsumptionId: number): Observable<CardConsumption>{
    let url = path + "find/" + cardConsumptionId;
    return this.http.get<CardConsumption>(url);
  }

  findByCustomerId(bankCardId: number): Observable<CardConsumption[]>{
    let url = path + "findByBankCardId/" + bankCardId
    return this.http.get<CardConsumption[]>(url);
  }
}
