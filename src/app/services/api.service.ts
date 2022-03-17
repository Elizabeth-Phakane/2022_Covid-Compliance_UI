import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http:HttpClient) { }

  postOfficer(data : any){
    return this.http.post<any>("http://localhost:3000/officers/",data);
  }

  getOfficer(){
    return this.http.get<any>("http://localhost:3000/officers/");
  }
  putOfficer(data:any,id:number){
    return this.http.put<any>("http://localhost:3000/officers/"+id,data);
  }
  deleteOfficer(id:number){
    return this.http.delete<any>("http://localhost:3000/officers/"+id)
  }

  getRecord(){
    return this.http.get<any>("http://localhost:3000/records/")
  }
}
