import { AfterViewInit, Component, Input, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { BggBoardgame, BggBoardgameThing } from 'src/app/bgg-objects';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { ColumnDisplayToggleItem } from './columnDisplayToggleItem';
import { AbstractControl, FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { BggApiService } from 'src/app/bgg-api.service';

@Component({
  selector: 'app-collection',
  templateUrl: './collection.component.html',
  styleUrls: ['./collection.component.scss']
})
export class CollectionComponent implements OnInit, AfterViewInit, OnChanges {
  @Input() games: BggBoardgame[];
  gameThings: BggBoardgameThing[];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
 
  dataSource: MatTableDataSource<BggBoardgameThing>;
  availableColumns: ColumnDisplayToggleItem[] = [
    new ColumnDisplayToggleItem('yearPublished', 'Publishing year'),
    new ColumnDisplayToggleItem('numPlayersRecommended', 'Recommended number of players'),
    new ColumnDisplayToggleItem('playingTime', 'Expected playing time'),
    new ColumnDisplayToggleItem('playerAge', 'Recommended player age'),
    new ColumnDisplayToggleItem('ratingAverage', 'Average rating on BGG'),
    new ColumnDisplayToggleItem('weightAverage', 'Average weight (complexity / difficulty) on BGG'),
    new ColumnDisplayToggleItem('rank', 'Rank on BGG', true),
    new ColumnDisplayToggleItem('numPlays', 'My logged plays number on BGG', true)
  ];
  columnsToDisplay = ['thumbnail', 'name'];
  expandedRow: BggBoardgameThing | null;
  // readonly formControl: AbstractControl;
  
  constructor(
    // formBuilder: FormBuilder,
    public dialog: MatDialog,
    private _bggApiService: BggApiService
  ) {
    this.gameThings = []
    this.dataSource = new MatTableDataSource(this.gameThings);

    // this.formControl = formBuilder.group({
    //   name: '',
    //   numPlayers: '',
    //   weight: '',
    // });
  }

  ngOnInit() {
    for (let availCol of this.availableColumns) {
      if (availCol.defaultToggled) {
        this.columnsToDisplay.push(availCol.colName);
      }
    }

    // this.dataSource.filterPredicate = ((data, filter) => {
    //   const nameContains = !filter.name || data.name.toLowerCase().includes(filter.name);
    //   const numPlayers = !filter.numPlayers || data.numPlayersRecommended.includes(+filter.numPlayers);
    //   const weightInRange = !filter.weight || (+filter.weight - 0.6 <= data.weightAverage && data.weightAverage <= +filter.weight + 0.6);
    //   return nameContains && numPlayers && weightInRange;
    // }) as (BggBoardgameThing, string) => boolean;

    // this.formControl.valueChanges.subscribe(value => {
    //   const filter = {...value, name: value.name.trim().toLowerCase()} as string;
    //   this.dataSource.filter = filter;
    // });
    
  }

  ngAfterViewInit() {
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.games.currentValue.length > 0) {    // if changes non-empty
      this.getBggThingsFromGames(this.games).then(gameThings => {
        this.gameThings = gameThings;
        this.dataSource.data = this.gameThings;
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      });
    }
  }

  private getBggThingsFromGames(games: BggBoardgame[]): Promise<BggBoardgameThing[]> {
    return new Promise(resolve => {
      let collectedGameThings: BggBoardgameThing[] = [];
      for (let game of games) {
        this._bggApiService.getBGGBoardgame(game.objectid).then((gameThing: BggBoardgameThing) => {
          gameThing.numPlays = game.numPlays;
          collectedGameThings.push(gameThing);
          if (collectedGameThings.length === games.length) {
            resolve(collectedGameThings);
          }
        });
      }
    });
  }

}