import { Component, OnInit, forwardRef, Input } from '@angular/core';
import { NG_VALUE_ACCESSOR, FormBuilder, ControlValueAccessor } from '@angular/forms';
import * as _ from 'underscore';
@Component({
  selector: 'app-main-export-list',
  templateUrl: './main-export-list.component.html',
  styleUrls: ['./main-export-list.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => MainExportListComponent),
      multi: true
    }
  ]
})
export class MainExportListComponent implements OnInit, ControlValueAccessor {
  @Input() _value!: any[];
  @Input() dailog: any;
  constructor(private _fb: FormBuilder) { }
  totalSelectedItems!: any[];
  totalItemsInList!: any[];
  indexValue: any;
  // this method sets the value programmatically
  writeValue(value: any): void {
    if (value) {
      this.totalItemsInList = value;
    }
  }

  // upon UI element value changes, this method gets triggered
  registerOnChange(fn: any): void {
    this.onChange = fn
  }

  // upon touching the element, this method gets triggered
  registerOnTouched(fn: any): void {
    this.onTouch = fn
  }

  setDisabledState?(isDisabled: boolean): void {
    throw new Error("Method not implemented.");
  }

  onChange: any = () => { }
  onTouch: any = () => { }
  val = "" // this is the updated value that the class accesses
  set value(val:any) {  // this value is updated by programmatic changes if( val !== undefined && this.val !== val){
    this.val = val
    this.onChange(val)
    this.onTouch(val)
  }

  ngOnInit() {
    this.totalItemsInList = this._value;
    this.totalSelectedItems = [];
  }
  isSelected(ExportArray:any, ExportIndex:any) {
    if (ExportArray[ExportIndex].selected === false) {
      ExportArray[ExportIndex].selected = true;
    } else {
      ExportArray[ExportIndex].selected = false;
    }
  }
  onSelectionRightMove(selection:any) {
    if (selection == 'all') {
      for (let item of this.totalItemsInList) {
        item.selected = true;
      }
      [this.totalItemsInList, this.totalSelectedItems] = this.generateColumnsForExport(this.totalItemsInList, this.totalSelectedItems);
      this.totalItemsInList = [];
    } else {
      [this.totalItemsInList, this.totalSelectedItems] = this.generateColumnsForExport(this.totalItemsInList, this.totalSelectedItems);
    }
    console.log(this.totalItemsInList);
    console.log(this.totalSelectedItems);
  }

  onSelectionLeftMove(selection:any) {
    if (selection == 'all') {
      for (let item of this.totalSelectedItems) {
        item.selected = true;
      }
      [this.totalSelectedItems, this.totalItemsInList] = this.generateColumnsForExport(this.totalSelectedItems, this.totalItemsInList);
      this.totalSelectedItems = [];
    } else {
      [this.totalSelectedItems, this.totalItemsInList] = this.generateColumnsForExport(this.totalSelectedItems, this.totalItemsInList);
    }
    console.log(this.totalItemsInList);
    console.log(this.totalSelectedItems);
  }
  onSelectionUpMove(selection:any) {
    let array = [];
    if (selection == 'single') {
      for (let [index, item] of this.totalSelectedItems.entries()) {
        if (item.selected) {
          array.push(item);
          item.selected = false;
          if (index !== 0) {
            this.indexValue = index - 1;
            console.log(" indexValue" + this.indexValue);
            this.moveUpAndDown(index, this.indexValue)
          }
        }
      }
      for (let value of array) {
        value.selected = true;
      }
      Object.assign(array, this.totalSelectedItems);
    }
  }

  onSelectionDownMove(selection:any) {
    let array = [];
    if (selection == 'single') {
      for (let [index, item] of this.totalSelectedItems.entries()) {
        if (item.selected) {
          array.push(item);
          item.selected = false;
          if (index !== this.totalSelectedItems.length - 1) {
            this.indexValue = index + 1;
            this.moveUpAndDown(index, this.indexValue);
          }
        }
      }
      for (let value of array) {
        value.selected = true;
      }
      Object.assign(array, this.totalSelectedItems);
    }
  }
  moveUpAndDown(index:any, indexValue:any) {
    [this.totalSelectedItems[indexValue], this.totalSelectedItems[index]] =
      [this.totalSelectedItems[index], this.totalSelectedItems[indexValue]]
    return false;

  }


  generateColumnsForExport(arr1:any, arr2:any) {
    console.log(arr1)
    var tempArray = arr1.map((item:any) => {
      if (item.selected === true) {
        return item;
      }
    });
    arr2 = arr2.concat(_.compact(tempArray));
    var arr2: any = _.map(arr2, function (item: any) {
      item.selected = false;
      return item;
    })
    arr1 = _.difference(arr1, arr2);

    console.log("array1", arr1);
    console.log("array2", arr2);
    return [arr1, arr2];
  }

}
