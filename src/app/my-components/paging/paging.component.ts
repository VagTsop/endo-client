import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Paging } from 'src/transport/helper/paging.helper';

@Component({
  selector: 'app-paging',
  templateUrl: './paging.component.html'
})
export class PagingComponent {
  @Input() paging: Paging;
  @Output() emitPaging: EventEmitter<Paging> = new EventEmitter<Paging>();

  private pageSizeList: Array<number> = [5, 10, 20, 50, 100];


  public onNextPage() {
    this.paging.$pageNumber = this.paging.$pageNumber + 1;
    this.emitPaging.emit(this.paging);
  }

  public onPreviousPage() {
    this.paging.$pageNumber = this.paging.$pageNumber - 1;
    this.emitPaging.emit(this.paging);
  }

  public onFirstPage() {
    this.paging.$pageNumber = 1;
    this.emitPaging.emit(this.paging);
  }

  public onLastPage() {
    this.paging.$pageNumber = Math.ceil(this.paging.$totalSize / this.paging.$pageSize);
    this.emitPaging.emit(this.paging);
  }

  public onPageSize(size: number) {
    this.paging.$pageSize = size;
    this.paging.$pageNumber = 1;
    this.emitPaging.emit(this.paging);
  }

  public get $pageSizeList(): Array<number> {
    return this.pageSizeList;
  }

  public set $pageSizeList(value: Array<number>) {
    this.pageSizeList = value;
  }
}
