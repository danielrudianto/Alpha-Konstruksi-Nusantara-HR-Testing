import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { debounceTime } from 'rxjs';

@Component({
  selector: 'app-data-header',
  templateUrl: './data-header.component.html',
  styleUrls: ['./data-header.component.css'],
})
export class DataHeaderComponent implements OnInit {
  @Input('onSearch') onSearch!: Function;
  @Input('addAvailable') addAvailable: boolean = false;
  @Input('onAdd') onAdd: Function = () => {};
  @Input('createLabel') createLabel!: string;

  @Output('onAddData') onAddData: EventEmitter<any> = new EventEmitter<any>();

  searchFormGroup: FormGroup = new FormGroup({
    search: new FormControl(''),
  });

  addData() {
    this.onAddData.emit();
  }

  constructor() {}

  ngOnInit(): void {
    this.onSearch();
    
    this.searchFormGroup.controls['search'].valueChanges
      .pipe(debounceTime(500))
      .subscribe({
        next: (data) => {
          console.log(data);
        },
      });
  }
}
