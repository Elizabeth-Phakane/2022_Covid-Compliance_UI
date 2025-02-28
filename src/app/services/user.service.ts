import { Images, RegisterUser, UpdateRecord, UserLogin, UpdateUser, UpdateOfficer, GetAllOfficers, GetAllRecords, UpdatePassword } from './../interfaces/user';
import { EventEmitter, Injectable, Output } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { map, Observable} from 'rxjs';
//import { userlogin} from '../interfaces/user';
import { environment } from 'src/environments/environment';
import { User } from '../interfaces/user';
import { ViewProfilePicture } from '../interfaces/file-to-upload';
//import { EventEmitter } from 'stream';



/* export interface Userlogin
{
  userId:string;
  password:string;
} */

/* export interface userregister
{
  firstNames:string;
  lastName:string;
  username:string;
  password:string;
  cellphone:string;
  campId:string;
  email:string;
  token:string;
} */
@Injectable({
  providedIn: 'root'
})


export class UserService
{
  
  redirecturl!:string;
  @Output() getLoggedInName: EventEmitter<any> = new EventEmitter();

  //private apiUrl=environment.apiUrl;

  constructor(private http:HttpClient/*injection of the services*/){ }

  loginUser(user:UserLogin)
  {
    return this.http.post<UserLogin>(`http://localhost:3000/login/user`, {
      User_id: user.User_id, Password: user.Password
    }).pipe(
          map((Users)=>
          {
            console.log(Users);

            //this.setSeesion();
            this.getLoggedInName.emit(true);
            //console.log('Following is Token '+this.setSeesion(user.User_id));
            //console.log("User id is "+Users.User_id);
            //console.log(Users.User_id);
            //console.log(Users.Password);
            
            
           // localStorage.setItem('token',token.token);
            return Users;
          })
        ) 
    /* return this.http.post(`http://localhost:3000/login/user`,user); */
  }


  /* setSeesion(token: string)
  {
    sessionStorage.setItem('token',token);
  } */
 /*  getToken() {
    localStorage.getItem('token');
  } */
  deleteToken() {
    localStorage.removeItem('token');
  }



/*   setToken(token: string)
  {
    localStorage.setItem('token',token);
  }
 /*  getToken() {
    localStorage.getItem('token');
  } 
  deleteToken() {
    localStorage.removeItem('token');
  } 
  */



  isLoggedIn()
  {
    return sessionStorage.getItem('user_id')!=null;
  }


/*   registerUser(user:RegisterUser)
  {
    return this.http.post<any>(`http://localhost:3000/add_user/user`,{firstNames:user.firstNames,lastName:user.lastName ,username:user.userId,password:user.password,cellphone:user.cellphone,email:user.email,campId:user.campId}).pipe(
      map((user)=>
      {
        console.log('user');
        return user;
      })
    )
  }  */

  registerUser(data : any)
  {
    return this.http.post<any>("http://localhost:3000/add_user/user",data)
  }





  
/*   getUsers():Observable<User[]>
  {
    return this.http.get<User[]>(`http://localhost:3000/viewall`)
  }
  */
  getUser(username:string):Observable<User>
  {
    return this.http.get<User>(`http://localhost:3000/view_user/user/${username}`)
  }



  getImage(imagename:number):Observable<Images>
  {
    return this.http.get<Images>(`http://localhost:3000/select_image/image/${imagename}`)
  }
 
  onView(username:string):Observable<ViewProfilePicture>
  {
    return this.http.get<ViewProfilePicture>(`http://localhost:3000/select_pp/view/${username}`);
  }

  updateRecord(officer: UpdateRecord, User_id:any):Observable<GetAllRecords[]>
  {
    return this.http.put<any>(`http://localhost:3000/updateRecord/record/${User_id}`, officer).pipe(
      map((record) => {
        //console.log(record);
        // console.log("This is the temperature "+officer.Tempareture);

        //console.log("This is the temperature "+officer.Record_id);
        return record;
      })
    )
    
  }
  updatePassword(email:string,User_id:any):Observable<User[]>{
    return this.http.put<any>(`http://localhost:3000/reset_password/reset_password/${User_id}`,email).pipe(
      map((record) => {
        console.log('tHE '+record);
        return record;
      })
    )
    

  }
 

  form(data:FormData)
  {
    return this.http.post<FormData>("http://localhost:3000/insert_healthform/user",{data})
  }  

  updateofficerInfo(officerdata: UpdateOfficer, id: string): Observable<UpdateOfficer[]> {
    {
      return this.http.put<UpdateOfficer[]>("http://localhost:3000/update/user/:"+ id,officerdata);
    }
  }
  

  
/*  
  getUsers():Observable<User[]>
  {
    return this.http.get<User[]>(`${this.apiUrl}/viewall`);
  }
  getUser():Observable<User> //getting only one user
  {
    return this.http.get<User>(`${this.apiUrl}/view_user/user/0000`);
  }
 */

/*   registerUser(user:any)
  {
    return this.http.post<any>(`${this.apiUrl}/add_user/user`,user);
  }

  postOfficer(data : any){
    return this.http.post<any>("http://localhost:3000/officers/",data);
  } */


}


  