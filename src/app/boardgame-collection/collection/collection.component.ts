import { AfterViewInit, Component, Input, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { BggBoardgame, BggBoardgameThing, BggCategory, BggMechanic } from 'src/app/bgg-objects';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { ColumnDisplayToggleItem } from './columnDisplayToggleItem';
import { AbstractControl, FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { BggApiService } from 'src/app/bgg-api.service';
import { animate, state, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-collection',
  templateUrl: './collection.component.html',
  styleUrls: ['./collection.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ])
  ]
})
export class CollectionComponent implements OnInit, AfterViewInit, OnChanges {
  BGG_MECHANICS: string[];
  BGG_CATEGORIES: string[];
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
  formControl: AbstractControl;
  advancedFiltersToggled: boolean;
  
  constructor(
    formBuilder: FormBuilder,
    public dialog: MatDialog,
    private _bggApiService: BggApiService
  ) {
    this.BGG_CATEGORIES = [];
    for (var enumMember in BggCategory) {
      let isValueProperty:boolean = parseInt(enumMember, 10) >= 0;
      if (isValueProperty) { this.BGG_CATEGORIES.push(BggCategory[enumMember]); }
    }
    this.BGG_MECHANICS = [];
    for (var enumMember in BggMechanic) {
      let isValueProperty:boolean = parseInt(enumMember, 10) >= 0;
      if (isValueProperty) { this.BGG_MECHANICS.push(BggMechanic[enumMember]); }
    }
    this.gameThings = []
    this.dataSource = new MatTableDataSource(this.gameThings);
    this.formControl = formBuilder.group({
      name: '',
      numPlayers: '',
      time: '',
      categories: '',
      mechanics: ''
    });
    this.advancedFiltersToggled = false;
  }

  ngOnInit() {
    for (let availCol of this.availableColumns) {
      if (availCol.defaultToggled) {
        this.columnsToDisplay.push(availCol.colName);
      }
    }

    this.dataSource.filterPredicate = ((data:BggBoardgameThing, filter) => {
      const nameContains = !filter.name || data.name.toLowerCase().includes(filter.name);
      const numPlayers = !filter.numPlayers || data.numPlayersRecommended.includes(+filter.numPlayers)
      const time = !filter.time || (data.playingTimeMin <= +filter.time && +filter.time <= data.playingTimeMax);
      const categoryOf = !filter.categories || filter.categories.every(x => data.categories.includes(x));
      const mechanicOf = !filter.mechanics || filter.mechanics.every(x => data.mechanics.includes(x));
      return nameContains && numPlayers && time && categoryOf && mechanicOf;
    }) as (BggBoardgameThing, string) => boolean;

    this.formControl.valueChanges.subscribe(value => {
      const filter = {...value, name: value.name.trim().toLowerCase()} as string;
      this.dataSource.filter = filter;
    });
    
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

  resetForm(): void {
    this.formControl.reset({
      name: '',
      numPlayers: '',
      time: '',
      categories: '',
      mechanics: ''
    });
  }

  toggleAdvancedFilters(): void {
    this.advancedFiltersToggled = !this.advancedFiltersToggled;
  }

}
