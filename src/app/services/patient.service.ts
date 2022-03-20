import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, mergeMap, tap, toArray } from 'rxjs/operators'

const baseUrl = 'https://try.smilecdr.com/baseR4/Patient'

@Injectable({
  providedIn: 'root'
})
export class PatientService {

  constructor(private http: HttpClient) { }

  public getPatients(): Observable<any> {

    return this.http.get(baseUrl)
      .pipe(
        map(({ entry }: any) => entry),
        mergeMap((entries) => entries),
        map(({ resource }: any) => resource),
        toArray()
      );
  }
}
