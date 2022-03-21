import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { PatientService } from 'src/app/services/patient.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  public num: number;

  @ViewChild('formData') private formData: NgForm;

  constructor(private pateintService: PatientService) { }

  ngOnInit(): void {
  }

  public onSubmit(): void {
    const patientData: { firstName?: string, lastName?: string } = this.formData.value;

    this.pateintService.searchPatient(patientData);
  }

}
