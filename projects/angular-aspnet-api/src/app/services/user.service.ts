import { Role } from "./../models/role";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { HostListener, Injectable } from "@angular/core";
import { Observable, Subject } from "rxjs";
import { IRegister } from "../models/i-register";
import { Login } from "../models/login";
import { ResponseModel } from "../models/response-model";
import { UserDTO } from "../models/user-dto";

@Injectable({
  providedIn: "root",
})
export class UserService {
  // private readonly url: string = "https://localhost:8947/api/user";
  private readonly url: string = "https://kimbumjun.com/api/user";
  
  public loggedIn!: boolean;
  public logger = new Subject<boolean>();
  public loginName = new Subject<string | undefined>();
  public loginRole = new Subject<string | undefined>();

  public userDataSet: string = "userDataSet";
  public userToken: string = "userToken";
  public fullName: string = "userName";
  public userRole: string = "userRole";

  logIn(dataSet: UserDTO) {
    localStorage.setItem(this.userDataSet, JSON.stringify(dataSet));
    localStorage.setItem(this.userToken, dataSet.token);
    localStorage.setItem(this.fullName, dataSet.fullName);
    localStorage.setItem(this.userRole, dataSet.role);

    this.loggedIn = true;
    this.logger.next(this.loggedIn);
    this.loginName.next(localStorage.getItem(this.fullName)?.toString());
    this.loginRole.next(localStorage.getItem(this.userRole)?.toString());
  }

  logOut() {
    localStorage.removeItem(this.userDataSet);
    localStorage.removeItem(this.userToken);
    localStorage.removeItem(this.fullName);
    this.loggedIn = false;
    this.logger.next(this.loggedIn);
    this.loginName.next(undefined);
  }

  @HostListener("window:beforeunload") getStorageName() {
    this.loginName.next(localStorage.getItem(this.fullName)?.toString());
  }

  @HostListener("window.beforeunload") getRole() {
    this.loginRole.next(localStorage.getItem(this.userRole)?.toString());
  }

  constructor(private http: HttpClient) {
    const check: string | null = localStorage.getItem(this.userToken);
    this.loggedIn = check != null && check?.length > 0;
  }

  // GetAllUser
  public getAllUser(): Observable<UserDTO[]> {
    const header = new HttpHeaders({
      Authorization: `Bearer ${localStorage.getItem(this.userToken)}`,
    });
    return this.http.get<UserDTO[]>(`${this.url}/getalluser`, {
      headers: header,
    });
  }

  // Get All Role
  public getAllRole(): Observable<string[]> {
    let userInfo = localStorage.getItem(this.userToken);
    const header = new HttpHeaders({
      Authorization: `Bearer ${userInfo}`,
    });

    return this.http.get<string[]>(`${this.url}/getRoles`, {
      headers: header,
    });
  }

  // Login
  public loginRequest(body: Login): Observable<ResponseModel> {
    return this.http.post<ResponseModel>(`${this.url}/login`, body);
  }

  // Register User
  public registerRequest(body: IRegister): Observable<IRegister> {
    body.role = "User";
    return this.http.post<IRegister>(`${this.url}/registerUser`, body);
  }

  // Update User with role
  public putUser(body: IRegister): Observable<IRegister> {
    return this.http.post<IRegister>(`${this.url}/updateUser`, body);
  }
}

// 'Authorization': `Bearer ${JSON.parse(JSON.stringify(localStorage.getItem('userInfo')))?.token}`
/*
 1. kimburmjun : 		43 날도끼		(아카이브), 피골
 2. vivakbj : 			43 검은늑대 	(아카이브), 티달라 => User
 3. forbmgame : 			43 붉은사자 	(아카이브), 비샵 => User
 4. hellomybj : 			43 석양의쌍칼 	(아카이브), 티달라 => User
 5. hellobuddham : 		43 황야의무법자 	(아카이브), 티달라 => User
 6. kim.bum.jun.kr : 		43 해품은도끼 	(아카이브), 티달라 => User
 7. bmbizmail :			43 낡은망또 	(아카이브), 티달라 => User
 8. bravokbj :  			43 수부타이 	(아카이브), 티달라 => User

 9. viva.viva.bm : 		43 칼바람	(아카이브), 비샵
 10. viva.viva.kr : 		43 늑대와춤을 	(아카이브), 비샵
 11. viva.viva.hello : 		43 능선따라	(아카이브), 비샵 => Admin
 12. viva.viva.project : 	43 백상아리 	(아카이브), 비샵
 13. viva.viva.world : 		43 백두대간 	(아카이브), 비샵
 14. viva.viva.vivabm :		43 터미레이러	(아카이브), ^ => Admin, V^
*/
