import { Component, EventEmitter, Input, Output, OnChanges } from '@angular/core';
@Component({
  selector: 'dropdown-paging',
  templateUrl: './dropdown-paging.component.html',
})
export class DropdownPagingComponent implements OnChanges {
  @Input() itemsPerPage: number;
  @Input() allPagesNumber: number;
  @Output() changePage: EventEmitter<number> = new EventEmitter<number>();
  private _currentPage: number = 1;

  constructor() {}

  ngOnChanges(): void {}

  get currentPage(): number {
    if (this._currentPage >  this.allPagesNumber) {
      this._currentPage = 1;
    }
    return this._currentPage;
  }

  set currentPage(page) {
    this._currentPage = page;
    this.changePage.emit(this.currentPage);
  }

  onNextPage(): void {
    this.currentPage += 1;
  }

  onPreviousPage(): void {
    this.currentPage -= 1;
  }
}
