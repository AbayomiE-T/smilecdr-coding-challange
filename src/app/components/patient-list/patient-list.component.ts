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
  public isSorted: boolean = false;
  private _onDestroy$ = new Subject();

  constructor(private patientService: PatientService) { }

  ngOnInit(): void {
    this.patientService.listenForChangesInPatientData()
      .pipe(takeUntil(this._onDestroy$))
      .subscribe((patients) => {
        this.patients = this.sortPatients(patients);
      })
  }

  ngOnDestroy(): void {
    this._onDestroy$.next();
  }

  public formatName(name): string {
    const { family, given } = name[0];

    return `${given[0]} ${family}`;
  }

  public formatAddress(address): string {

    let fullAddress = 'N/A';

    if (!address) {
      return fullAddress
    }

    const { line, city, state, postalCode } = address[0];

    fullAddress = `${line[0].trim()}, ${city}, ${state} ${postalCode}`;

    return fullAddress;
  }

  public formatPhoneNumber(telecom): string {
    let phoneNumber: string = 'N/A';
    if (!telecom) {
      return phoneNumber;
    }

    phoneNumber = '';

    telecom.forEach((telecom, index, array) => {
      if (index === array.length - 1) {
        phoneNumber += telecom.value;
      }

      else {
        phoneNumber += telecom.value + ", "
      }
    });

    return phoneNumber;
  }

  private sortPatients(patients): any {

    const sortedPatients = [...patients].sort((patientA, patientB) => {
      const patientAlastName = patientA.name[0].family.toLowerCase();
      const patientBlastName = patientB.name[0].family.toLowerCase();

      if (patientAlastName < patientBlastName) {
        return -1;
      }

      if (patientAlastName > patientBlastName) {
        return 1;
      }

      else {
        return 0;
      }
    })

    this.isSorted = true;
    return sortedPatients;
  }

}
