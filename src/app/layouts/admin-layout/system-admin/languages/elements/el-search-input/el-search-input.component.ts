import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-el-search-input',
  templateUrl: './el-search-input.component.html',
  styleUrls: ['./el-search-input.component.scss']
})
export class ElSearchInputComponent implements OnInit {

  @Input() public placeholder: string;
  @Input() public icon: string;

  @Output() public onChange = new EventEmitter<string>();
  @Output() public onAction = new EventEmitter<string>();
  @Output() public onReset = new EventEmitter();
  
  // For Searching Term
  public term: string | undefined;

  constructor() { }

  ngOnInit(): void {
  }

  // Continues Search on Search Term Change
  termChange($event) {
    this.onChange.emit($event);
  }

  // Non-Continues Search on Press Button
  action() {
    this.onAction.emit(this.term);
  }

  reset() {
    this.term = null;
    this.onReset.emit();
  }

}
