import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { map, mergeMap, toArray } from 'rxjs/operators'
import { IPatient } from '../Interfaces/IPatient';

const baseUrl = 'https://try.smilecdr.com/baseR4/Patient'

@Injectable({
  providedIn: 'root'
})
export class PatientService {

  private _patients = new Subject<IPatient[]>();

  constructor(private http: HttpClient) {
    this.initPatients();
  }

  private initPatients() {
    this.getPatients();
  }

  public getPatients(): void {

    this.http.get(baseUrl)
      .pipe(
        map(({ entry }: any) => entry),
        mergeMap((entries) => entries),
        map(({ resource }: any) => resource),
        toArray()
      )
      .subscribe((patientList: IPatient[]) => {
        this._patients.next(patientList);
      });
  }

  public searchPatient(patient): void {
    const { firstName, lastName } = patient;

    const given = firstName ? `given=${firstName}` : '';
    const family = lastName ? `family=${lastName}` : '';

    let queryParams = '';

    if (given && family) {
      queryParams = `?${given}&${family}`;
    }
    else if (given) {
      queryParams = `?${given}`;
    }
    else if (family) {
      queryParams = `?${family}`;
    }

    this.http.get(baseUrl + queryParams)
      .pipe(
        map(({ entry }: any) => entry),
        mergeMap((entries) => entries),
        map(({ resource }: any) => resource),
        toArray()
      )
      .subscribe((patientList) => {
        this._patients.next(patientList);
      });
  }

  public listenForChangesInPatientData(): Observable<IPatient[]> {
    return this._patients;
  }
}
