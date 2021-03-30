import { Component, Input, OnChanges } from '@angular/core';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss'],
})
export class HistoryComponent implements OnChanges {
  @Input() actionString: string;

  historyArray: Array<string> = [];

  ngOnChanges() {
    this.historyArray.push(this.actionString);
  }
  removeHistory() {
    this.historyArray = [''];
  }
}
