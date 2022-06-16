import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Paging } from 'src/transport/helper/paging.helper';

@Component({
  selector: 'app-sorting',
  templateUrl: './sorting.component.html'
})
export class SortingComponent {
  @Input() paging: Paging;
  @Input() label: string;
  @Input() sortField: string;
  @Output() emitSorting: EventEmitter<Paging> = new EventEmitter<Paging>();

  onSort() {
    // check if there is an order field
    if (this.sortField) {
      if (this.paging.$orderField === this.sortField) {
        if (this.paging.$orderDirection === 'DESC') {
          this.paging.$orderDirection = 'ASC';
        } else {
          this.paging.$orderDirection = 'DESC';
        }
      } else {
        this.paging.$orderDirection = 'DESC';
      }
      this.paging.$orderField = this.sortField;
      this.paging.$pageNumber = 1;
      this.emitSorting.emit(this.paging);
    }
  }
}
