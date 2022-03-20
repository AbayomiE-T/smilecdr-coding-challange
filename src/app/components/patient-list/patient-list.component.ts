import { Component, OnInit } from '@angular/core';
import { PatientService } from 'src/app/services/patient.service';

@Component({
  selector: 'app-patient-list',
  templateUrl: './patient-list.component.html',
  styleUrls: ['./patient-list.component.css']
})
export class PatientListComponent implements OnInit {
  public patients: any

  constructor(private patientService: PatientService) { }

  ngOnInit(): void {
    this.patientService.getPatients()
      .subscribe((patients) => {
        console.log(patients);
      })
  }

}
