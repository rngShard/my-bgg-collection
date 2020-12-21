import { AfterViewInit, Component, Input, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { BggBoardgame } from 'src/app/bgg-objects';

@Component({
  selector: 'app-archive-table',
  templateUrl: './archive-table.component.html',
  styleUrls: ['./archive-table.component.scss']
})
export class ArchiveTableComponent implements OnInit, AfterViewInit, OnChanges {
  @Input() games: BggBoardgame[];
  tableDataSourceGames: BggBoardgame[];
  
  dataSource: MatTableDataSource<BggBoardgame>;
  columnsToDisplay = ['thumbnail', 'name', 'yearPublished', 'numPlays'];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
 
  constructor() {
    this.games = [];
    this.dataSource = new MatTableDataSource([]);
    this.tableDataSourceGames = [];
  }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges) {
    // for (const propName in changes) {
    //   const chng = changes[propName];
    //   if (propName === 'games') {
        this.dataSource.data = this.games;
    //     this.tableDataSourceGames = chng.currentValue;
    //   }
    // }
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

}
