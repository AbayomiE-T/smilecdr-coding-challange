import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PatientService {

  constructor(private http: HttpClient) { }

  public getPatients(): Observable<any> {
    const baseUrl = 'https://try.smilecdr.com/baseR4/Patient'

    return this.http.get(baseUrl);
  }
}
