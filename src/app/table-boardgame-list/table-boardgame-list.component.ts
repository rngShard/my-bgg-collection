import { AfterViewInit, Component, Input, OnInit, ViewChild } from '@angular/core';
import {animate, state, style, transition, trigger} from '@angular/animations';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { BggBoardgame, BggBoardgameThing } from '../bgg-objects';
import { BggApiService } from '../bgg-api.service';
import { ColumnDisplayToggleItem } from './columnDisplayToggleItem';
import { AbstractControl, FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';

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
    new ColumnDisplayToggleItem('playingTime', 'Expected playing time', true),
    new ColumnDisplayToggleItem('playerAge', 'Recommended player age'),
    new ColumnDisplayToggleItem('ratingAverage', 'Average rating on BGG'),
    new ColumnDisplayToggleItem('weightAverage', 'Average weight (complexity / difficulty) on BGG', true),
    new ColumnDisplayToggleItem('rank', 'Rank on BGG', true),
    new ColumnDisplayToggleItem('numPlays', 'My logged plays number on BGG')
  ]
  columnsToDisplay = ['thumbnail', 'name'];
  expandedRow: BggBoardgameThing | null;
  readonly formControl: AbstractControl;
  
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
 
  constructor(
    private _bggApiService: BggApiService,
    formBuilder: FormBuilder,
    public dialog: MatDialog
  ) {
    this.dataSource = new MatTableDataSource(this.own);

    for (let availCol of this.availableColumns) {
      if (availCol.defaultToggled) {
        this.columnsToDisplay.push(availCol.colName);
      }
    }

    this.dataSource.filterPredicate = ((data, filter) => {
      const nameContains = !filter.name || data.name.toLowerCase().includes(filter.name);
      const numPlayers = !filter.numPlayers || data.numPlayersRecommended.includes(+filter.numPlayers);
      const weightInRange = !filter.weight || (+filter.weight - 0.6 <= data.weightAverage && data.weightAverage <= +filter.weight + 0.6);
      return nameContains && numPlayers && weightInRange;
    }) as (BggBoardgameThing, string) => boolean;

    this.formControl = formBuilder.group({
      name: '',
      numPlayers: '',
      weight: '',
    });
    this.formControl.valueChanges.subscribe(value => {
      const filter = {...value, name: value.name.trim().toLowerCase()} as string;
      this.dataSource.filter = filter;
    });
  }
  
  ngOnInit() {
    this._bggApiService.getBGGCollection().subscribe(response => {
      if (response.status === 202) {
        this.open202Dialog();
      } else if (response.status === 200) {
        const stringXmlData = response.body;
        this._bggApiService.parseBGGCollectionXML(stringXmlData).then((xmlData: BggBoardgame[]) => {
          this.boardgames = xmlData;
          console.log(`App retrieved ${this.boardgames.length} boardgames.`)
  
          this.sortBoardgamesByCollection();
        })
      } else {
        console.error("ERROR: _bggApiService.getBGGCollection() returned HTTP != 200/202", response);
      }
    });
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

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

  open202Dialog() {
    const dialogRef = this.dialog.open(Http202Dialog);

    dialogRef.afterClosed().subscribe(result => {
      window.location.reload();
    });
  }

}

@Component({
  selector: 'http-202-dialog',
  templateUrl: 'http-202-dialog.html',
})
export class Http202Dialog {}