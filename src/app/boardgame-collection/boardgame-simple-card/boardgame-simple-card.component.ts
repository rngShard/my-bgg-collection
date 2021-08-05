import { Component, Input, OnInit } from '@angular/core';
import { DomSanitizer, SafeStyle } from '@angular/platform-browser';
import { BggBoardgame } from 'src/app/bgg-objects';

@Component({
  selector: 'app-boardgame-simple-card',
  templateUrl: './boardgame-simple-card.component.html',
  styleUrls: ['./boardgame-simple-card.component.scss']
})
export class BoardgameSimpleCardComponent implements OnInit {
  @Input() game: BggBoardgame;
  gameUrl: String;
  gameImageUrl: SafeStyle;

  constructor(
    private sanitization: DomSanitizer
  ) { }

  ngOnInit(): void {
    this.gameUrl = `https://boardgamegeek.com/boardgame/${this.game.objectid}`;
    this.gameImageUrl = this.sanitization.bypassSecurityTrustStyle(`url('${this.game.image}')`);
  }

  getAvatarImgStyle(thumbnailUrl): string {
    return `background-image: url('${thumbnailUrl}');`
  }
}
