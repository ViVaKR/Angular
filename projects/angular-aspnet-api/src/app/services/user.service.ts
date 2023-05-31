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
  private readonly url: string = "https://localhost:8947/api/user";
  // private readonly url: string = "https://kimbumjun.com/api/user";

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

