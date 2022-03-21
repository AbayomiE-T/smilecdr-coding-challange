import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { PatientService } from 'src/app/services/patient.service';

@Component({
  selector: 'app-patient-list',
  templateUrl: './patient-list.component.html',
  styleUrls: ['./patient-list.component.css']
})
export class PatientListComponent implements OnInit, OnDestroy {
  public patients: any
  private _onDestroy$ = new Subject();

  constructor(private patientService: PatientService) { }

  ngOnInit(): void {
    this.patientService.listenForChangesInPatientData()
      .pipe(takeUntil(this._onDestroy$))
      .subscribe((patients) => {
        this.patients = patients;
      })
  }

  ngOnDestroy(): void {
    this._onDestroy$.next();
  }

}
