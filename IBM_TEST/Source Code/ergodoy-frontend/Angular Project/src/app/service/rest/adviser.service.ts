import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
 
import { Observable, of } from 'rxjs';
import { GlobalVariables } from '../../util/GlobalVariables';
import { Adviser } from '../../model/adviser';

const path = GlobalVariables.apiHost + "adviser/";
@Injectable({
  providedIn: 'root'
})
export class AdviserService {

  constructor(private http: HttpClient) { }

  create(adviser: Adviser){
    let url = path + "create";
    return this.http.post(url,adviser,{responseType: "text"})
  }

  edit(adviser: Adviser){
    let url = path + "edit";
    return this.http.put(url,adviser,{responseType: "text"})
  }

  delete(adviser: Adviser){
    let url = path + "delete/" + adviser.aIdPk;
    return this.http.delete(url,{responseType: "text"})
  }

  findAll(): Observable<Adviser[]>{
    let url = path + "findAll";
    return this.http.get<Adviser[]>(url)
  }

  find(adviserId: number): Observable<Adviser>{
    let url = path + "find/" + adviserId;
    return this.http.get<Adviser>(url);
  }
}
