import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'; 
import xml2js from 'xml2js';  

import Config from '../../config.json';
import { BggBoardgame, BggBoardgameThing } from './bgg-objects';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BggApiService {
  public BGG_API_ENDPOINT = "https://www.boardgamegeek.com/xmlapi2";

  constructor(private _http: HttpClient) {}

  getBGGCollection(excludeExpansions: Boolean = true, excludeWishlist: Boolean = true): Observable<any> {
    let url = `${this.BGG_API_ENDPOINT}/collection?username=${Config.bgg.username}`;
    if (excludeExpansions) { url += "&excludesubtype=boardgameexpansion"}
    if (excludeWishlist) { url += "&wishlist=0"}
    
    return this._http.get(url, {
      responseType: 'text',
      observe: 'response'
    });
  }

  parseBGGCollectionXML(data): Promise<BggBoardgame[]> {
    return new Promise(resolve => {
      let k: string | number, arr = [];
      let parser = new xml2js.Parser({
        trim: true,  
        explicitArray: true  
      });  
      parser.parseString(data, function (err, result) {
        let items = result.items.item;
        for (let i = 0; i < items.length; i++) {
          let item = items[i];
          let boardgame = new BggBoardgame(item);
          arr.push(boardgame);  
        }
        resolve(arr);  
      });  
    });  
  }

  getBGGBoardgame(objectid: Number): Promise<BggBoardgameThing> {
    return new Promise(resolve => {
      let url = `${this.BGG_API_ENDPOINT}/thing?id=${objectid}`;
      url += "&stats=1";

      this._http.get(url, {
        responseType: 'text'
      }).subscribe(stringXmlData => {
        let k: string | number;
        let thing: BggBoardgameThing;
        let parser = new xml2js.Parser({
          trim: true,  
          explicitArray: true  
        });  
        parser.parseString(stringXmlData, function (err, result) {
          let items = result.items.item;
          let i = 0;
          let item = items[i];
          let thing = new BggBoardgameThing(item);
          resolve(thing);
        });
      })
    });
  }
}
