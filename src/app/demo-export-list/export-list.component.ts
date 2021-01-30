import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-export-list',
  templateUrl: './export-list.component.html',
  styleUrls: ['./export-list.component.css']
})
export class ExportListComponent implements OnInit {

  totalItemsInList!: any[];
  dailog: any;
  sampleForm!: FormGroup;
  
  constructor( private _fb: FormBuilder ) {
   }

  ngOnInit() {
    this.sampleForm = this._fb.group({
      totalItemsInList: [{value: ''}]
    });
    this.sampleForm.controls['totalItemsInList'].setValue(this.formData);
    this.dailog = {title: "Export Table", subTitle1:"Available Columns for Exports", subTitle2: "Selected Columns for Exports"}
  }
  formData = [
    {id: 0, name: "Child Account Name", selected: false},
    {id: 1, name: "Visit Initiator", selected: false},
    {id: 2, name: "Account Type", selected: false},
    {id: 3, name: "Industry", selected: false},
    {id: 4, name: "Industry Segment", selected: false},
    {id: 5, name: "Regions", selected: false},
    {id: 6, name: "Offerings", selected: false},
    {id: 7, name: "TCV Currency", selected: false},
    {id: 8, name: "TCV", selected: false},
    {id: 9, name: "Visit Status", selected: false},
    {id: 10, name: " Competitor", selected: false},
    {id: 11, name: "Cities", selected: false},
    {id: 12, name: "Visit Dates", selected: false},
    {id: 13, name: "Visit Managers", selected: false},
    {id: 14, name: "Client Objective", selected: false},
    {id: 15, name: " Objective", selected: false},
    {id: 16, name: "Billable Type", selected: false},
    {id: 17, name: "WBS Code", selected: false},
    {id: 18, name: "SFDC Code", selected: false},
    {id: 19, name: "Current Team Size", selected: false},
    {id: 20, name: "Current Technologies ", selected: false},
    {id: 21, name: "Client Visitors", selected: false},
    {id: 22, name: "Client Visitor Roles", selected: false},
    {id: 23, name: " Visitors", selected: false},
    {id: 24, name: " Visitor Roles", selected: false},
    {id: 25, name: " Account Executives", selected: false},
    {id: 26, name: " Account Executive Roles", selected: false}
  ]

}
