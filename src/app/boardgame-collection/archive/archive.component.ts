import { AfterViewInit, Component, Input, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { BggBoardgame } from 'src/app/bgg-objects';

@Component({
  selector: 'app-archive',
  templateUrl: './archive.component.html',
  styleUrls: ['./archive.component.scss']
})
export class ArchiveComponent implements OnInit, AfterViewInit, OnChanges {
  @Input() games: BggBoardgame[];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  
  dataSource: MatTableDataSource<BggBoardgame>;
  columnsToDisplay = ['thumbnail', 'name', 'yearPublished', 'numPlays'];

  constructor() {
    this.dataSource = new MatTableDataSource([]);
  }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  ngOnChanges(changes: SimpleChanges) {
    this.dataSource.data = this.games;
  }

}
