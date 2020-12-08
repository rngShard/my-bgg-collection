import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
  @Input() username: String;
  bggUserURL: String;

  constructor() { }

  ngOnInit(): void {
    this.bggUserURL = `https://boardgamegeek.com/user/${this.username}`;
  }

}
