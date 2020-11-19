import { Component, OnInit } from '@angular/core';
import { BggApiService } from './bgg-api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'mbgc-app';
  
  constructor(private _bggApiService: BggApiService) {}

  ngOnInit() {
    this._bggApiService.getBGGCollection().subscribe(data => {
      console.log(data);
    });
  }
}
