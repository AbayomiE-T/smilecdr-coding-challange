import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  public num: number;

  @ViewChild('formData') private formData: NgForm;

  constructor() { }

  ngOnInit(): void {
  }

  public onSubmit(): void {
    console.log(this.formData);
  }

}
