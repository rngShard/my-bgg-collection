import { Url } from 'url';

interface BggObject {
  objectid: Number;
  collid?: Number;
  objecttype?: String;
  subtype?: String;
}

class BggStatus {
  fortrade: Boolean;
  // lastmodified: Date
  own: Boolean;
  preordered: Boolean;
  prevowned: Boolean;
  want: Boolean;
  wanttobuy: Boolean;
  wanttoplay: Boolean;
  // wishlist: Boolean; (--> bool? string?)

  constructor(BggXmlApiItemStatusObj) {
    this.fortrade = +BggXmlApiItemStatusObj['fortrade'] === 1;
    // this.lastmodified = BggXmlApiItemStatusObj['lastmodified'];    // TBD: Proper conversion string (e.g. "2020-11-04 09:18:24") -> Date ?
    this.own = +BggXmlApiItemStatusObj['own'] === 1;
    this.preordered = +BggXmlApiItemStatusObj['preordered'] === 1;
    this.prevowned = +BggXmlApiItemStatusObj['prevowned'] === 1;
    this.want = +BggXmlApiItemStatusObj['want'] === 1;
    this.wanttobuy = +BggXmlApiItemStatusObj['wanttobuy'] === 1;
    this.wanttoplay = +BggXmlApiItemStatusObj['wanttoplay'] === 1;
  }
}

export class BggBoardgame implements BggObject {
  objectid: Number;
  name: String;
  yearPublished: Number;
  numPlays: Number;
  status: BggStatus;
  image: Url;
  thumbnail: Url;

  constructor(BggXmlApiItemObj) {
    this.objectid = +BggXmlApiItemObj['$']['objectid'];
    this.name = BggXmlApiItemObj['name'][0]['_'];
    this.yearPublished = +BggXmlApiItemObj['yearpublished'][0];
    this.numPlays = +BggXmlApiItemObj['numplays'][0];
    this.status = new BggStatus(BggXmlApiItemObj['status'][0]['$']);
    this.image = BggXmlApiItemObj['image'][0];
    this.thumbnail = BggXmlApiItemObj['thumbnail'][0];
  }
}