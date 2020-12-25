import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { BggApiService } from '../bgg-api.service';
import { BggBoardgame } from '../bgg-objects';

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

  constructor(private _bggApiService: BggApiService) {
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
        console.log("HTTP 202");
        // setTimeout(this.retrieveAndProcessWishlist, 1000);
      } else if (response.status === 200) {
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

}
