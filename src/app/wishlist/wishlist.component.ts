import { Component, OnInit } from '@angular/core';
import { BggApiService } from '../bgg-api.service';
import { BggBoardgame } from '../bgg-objects';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Http202Dialog } from '../http202dialog/http202dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.scss']
})
export class WishlistComponent implements OnInit {
  wishlists: { prio: number, games: BggBoardgame[] }[];

  WISHLIST_TITLES = [
    "Wishlist 1 (Must have)",
    "Wishlist 2 (Love to have)",
    "Wishlist 3 (Like to have)",
    "Wishlist 4 (Thinking about it)" 
  ]

  constructor(
    private _bggApiService: BggApiService,
    private _snackbar: MatSnackBar,
    public dialog: MatDialog
  ) {
    this.wishlists = [
      { "prio": 1, "games": [] },
      { "prio": 2, "games": [] },
      { "prio": 3, "games": [] },
      { "prio": 4, "games": [] },
    ];
  }

  ngOnInit(): void {
    for (let wishlist of this.wishlists) {
      this.retrieveAndProcessWishlist(wishlist.prio);
    }
  }

  retrieveAndProcessWishlist(prio: number): void {
    this._bggApiService.getBGGWishlist(prio).subscribe(response => {
      if (response.status === 202) {
        this.open202Dialog();
      } else if (response.status === 200) {
        this._snackbar.open("Wishlist retrieved from BGG");
        const stringXmlData = response.body;
        this._bggApiService.parseBGGCollectionXML(stringXmlData).then((xmlData: BggBoardgame[]) => {
          console.log(`App retrieved ${xmlData.length} items for wishlist (prio: ${prio}).`)
          for (let wishlist of this.wishlists) {
            if (wishlist.prio === prio) { wishlist.games = xmlData;}
          }
        });
      } else {
        console.error("ERROR: _bggApiService.getBGGCollection() returned HTTP != 200/202", response);
      }
    });
  }

  open202Dialog() {
    const dialogRef = this.dialog.open(Http202Dialog);

    dialogRef.afterClosed().subscribe(result => {
      window.location.reload();
    });
  }
}
