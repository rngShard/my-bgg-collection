import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import Config from '../../config.json';

@Injectable({
  providedIn: 'root'
})
export class BggApiService {
  public BGG_API_ENDPOINT = "https://www.boardgamegeek.com/xmlapi2";

  constructor(private _http: HttpClient) {}

  getBGGCollection() {
    return this._http.get(`${this.BGG_API_ENDPOINT}/collection?username=${Config.bgg.username}`, {
      responseType: 'text'
    });
  }
}
