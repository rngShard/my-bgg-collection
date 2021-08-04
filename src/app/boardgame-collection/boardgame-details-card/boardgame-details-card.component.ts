import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DomSanitizer, SafeStyle } from '@angular/platform-browser';
import { BggBoardgameThing } from 'src/app/bgg-objects';
import { Url } from 'url';

@Component({
  selector: 'app-boardgame-details-card',
  templateUrl: './boardgame-details-card.component.html',
  styleUrls: ['./boardgame-details-card.component.scss']
})
export class BoardgameDetailsCardComponent implements OnInit { 
  game: BggBoardgameThing;
  gameUrl: String;
  gameImageUrl: SafeStyle;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private sanitization: DomSanitizer
  ) {}

  ngOnInit(): void {
    this.game = this.data['game'];
    this.gameUrl = `https://boardgamegeek.com/boardgame/${this.game.objectid}`;
    this.gameImageUrl = this.sanitization.bypassSecurityTrustStyle(`url('${this.game.image}')`);
  }

  logPlusOne(): void {
    window.alert('TODO');
  }
}
