import { AfterViewInit, Component, Input, OnInit, ViewChild } from '@angular/core';
import {animate, state, style, transition, trigger} from '@angular/animations';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { BggBoardgame, BggBoardgameThing } from '../bgg-objects';
import { BggApiService } from '../bgg-api.service';
import { ColumnDisplayToggleItem } from './columnDisplayToggleItem';

@Component({
  selector: 'app-table-boardgame-list',
  templateUrl: './table-boardgame-list.component.html',
  styleUrls: ['./table-boardgame-list.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class TableBoardgameListComponent implements OnInit, AfterViewInit {
  boardgames: BggBoardgame[] = [];
  fortrade: BggBoardgame[] = [];
  own: BggBoardgameThing[] = [];
  preordered: BggBoardgame[] = [];

  dataSource: MatTableDataSource<BggBoardgameThing>;
  availableColumns: ColumnDisplayToggleItem[] = [
    new ColumnDisplayToggleItem('yearPublished', 'Publishing year'),
    new ColumnDisplayToggleItem('numPlayersRecommended', 'Recommended number of players', true),
    new ColumnDisplayToggleItem('playingTime', 'Recommended number of players', true),
    new ColumnDisplayToggleItem('playerAge', 'Recommended player age'),
    new ColumnDisplayToggleItem('ratingAverage', 'Average rating on BGG', true),
    new ColumnDisplayToggleItem('weightAverage', 'Average weight (complexity / difficulty) on BGG', true),
    new ColumnDisplayToggleItem('rank', 'Rank on BGG', true),
    new ColumnDisplayToggleItem('numPlays', 'My logged plays number on BGG')
  ]
  columnsToDisplay = ['thumbnail', 'name'];
  expandedRow: BggBoardgameThing | null;
  
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
 
  constructor(private _bggApiService: BggApiService) {
    this.dataSource = new MatTableDataSource(this.own);
    for (let availCol of this.availableColumns) {
      if (availCol.defaultToggled) {
        this.columnsToDisplay.push(availCol.colName);
      }
    }
  }
  
  ngOnInit() {
    this._bggApiService.getBGGCollection().subscribe(stringXmlData => {
      this._bggApiService.parseBGGCollectionXML(stringXmlData).then((xmlData: BggBoardgame[]) => {
        this.boardgames = xmlData;
        console.log(`App retrieved ${this.boardgames.length} boardgames.`)

        this.sortBoardgamesByCollection();
      })
    });
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  // applyFilter(event: Event) {
  //   const filterValue = (event.target as HTMLInputElement).value;
  //   this.dataSource.filter = filterValue.trim().toLowerCase();

  //   if (this.dataSource.paginator) {
  //     this.dataSource.paginator.firstPage();
  //   }
  // }

  sortBoardgamesByCollection() {
    for (let game of this.boardgames) {
      if (game.status.fortrade) {
        this.fortrade.push(game);
      }
      if (game.status.own) {
        this._bggApiService.getBGGBoardgame(game.objectid).then((gameThing: BggBoardgameThing) => {
          gameThing.numPlays = game.numPlays;
          this.own.push(gameThing);
          this.dataSource.data = this.own;
        });
      }
      if (game.status.preordered) {
        this.preordered.push(game);
      }
      if (!game.status.fortrade && !game.status.own && !game.status.preordered) {
        console.log(`Found game without Collection-Array:`, game);
      }
    }
    console.log(`Sorted ${this.boardgames.length} games by collection:\nForTrade (${this.fortrade.length}), Own (follow-up API calls), Preordered (${this.preordered.length})`)
  }
}
