import { Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Viv } from "../models/viv";

@Injectable({
    providedIn: "root",
})
export class VivService {
    // private readonly url: string = "https://localhost:8947";
    private readonly url: string = "https://kimbumjun.com";

    constructor(private http: HttpClient) { }

    // Get All Data List
    getAll(): Observable<Viv[]> {
        return this.http.get<Viv[]>(`${this.url}/api/viv/getAll`);
    }

    // Get Category Data List
    getCategoryDataList(category: number): Observable<Viv[]> {
        return this.http.get<Viv[]>(`${this.url}/api/viv/getCategoryDataList/${category}`);
    }

    // Post Data
    postData(data: Viv): Observable<Viv> {
        return this.http.post<Viv>(`${this.url}/api/viv/postData`, data);
    }

    // Put Data
    putData(id: number, data: Viv): Observable<Viv> {
        return this.http.put<Viv>(`${this.url}/api/viv/putData/${id}`, data);
    }

    // Delete Data
    deleteData(id: number): Observable<Viv> {
        return this.http.delete<Viv>(`${this.url}/api/viv/deleteData/${id}`);
    }
}
