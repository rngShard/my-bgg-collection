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

export class BggBoardgameThing implements BggObject {
  objectid: Number;
  thumbnail: Url;
  image: Url;
  name: String;
  description: String;
  yearPublished: Number;
  numPlayersMin: Number;
  numPlayersMax: Number;
  numPlayersRecommended: Number[];
  playingTimeMin: Number;
  playingTimeMax: Number;
  playingTime: Number;
  playerAge: Number;
  categories: String[];
  mechanics: String[];
  designers: String[];
  artists: String[];
  publishers: String[];

  constructor(BggXmlApiItemObj) {    
    this.objectid = +BggXmlApiItemObj['$']['id'];
    this.thumbnail = BggXmlApiItemObj['thumbnail'][0];
    this.image = BggXmlApiItemObj['image'][0];
    this.name = BggXmlApiItemObj['name'][0]['$']['value'];
    this.description = BggXmlApiItemObj['description'][0];
    this.yearPublished = +BggXmlApiItemObj['yearpublished'][0]['$']['value'];
    this.numPlayersMin = +BggXmlApiItemObj['minplayers'][0]['$']['value'];
    this.numPlayersMax = +BggXmlApiItemObj['maxplayers'][0]['$']['value'];
    this.playingTimeMin = +BggXmlApiItemObj['minplaytime'][0]['$']['value'];
    this.playingTimeMax = +BggXmlApiItemObj['maxplaytime'][0]['$']['value'];
    this.playingTime = +BggXmlApiItemObj['playingtime'][0]['$']['value'];
    this.playerAge = +BggXmlApiItemObj['minage'][0]['$']['value'];

    for (let poll of BggXmlApiItemObj['poll']) {
      switch(poll['$']['name']) {
        case 'suggested_numplayers': {
          let recommendationStrings = fromNestedPollReturnRecommendations(poll['results'], 'numplayers');
          this.numPlayersRecommended = recommendationStrings.map(str => +str);
          break;
        }
        case 'suggested_playerage': {   // Ignore ...
          break;
        }
        case 'language_dependence': {   // Ignore ...
          break;
        }
        default: { 
          console.log("(!) Invalid name for BGG-object-poll found!"); 
          break;
       }
      }
    }

    let categories = [], mechanics = [], designers = [], artists = [], publishers = [];
    for (let link of BggXmlApiItemObj['link']) {
      switch(link['$']['type']) {
        case 'boardgamecategory': {
          categories.push(link['$']['value']);
          break;
        }
        case 'boardgamemechanic': {
          mechanics.push(link['$']['value']);
          break;
        }
        case 'boardgamefamily': {   // Ignore ...
          break;
        }
        case 'boardgameimplementation': {   // Ignore ...
          break;
        }
        case 'boardgamedesigner': {
          designers.push(link['$']['value']);
          break;
        }
        case 'boardgameartist': {
          artists.push(link['$']['value']);
          break;
        }
        case 'boardgamepublisher': {
          publishers.push(link['$']['value']);
          break;
        }
        default: {
          console.log("(!) Invalid name for BGG-object-link found!"); 
          break;
        }
      }
    }
    this.categories = categories;
    this.mechanics = mechanics;
    this.designers = designers;
    this.artists = artists;
    this.publishers = publishers;

  }
}

function fromNestedPollReturnRecommendations(BggXmlApiItemObjPollResults: any, key: String): String[] {
  let voteOptions = [], ratios = [];
  for (let result of BggXmlApiItemObjPollResults) {
    let voteOption = result['$'][`${key}`];
    
    let votesBest = +result['result'][0]['$']['numvotes'];
    let votesRecommended = +result['result'][1]['$']['numvotes'];
    let votesNotRecommended = +result['result'][2]['$']['numvotes'];
    let ratioGoodVsBad = (votesBest + votesRecommended) / (votesBest + votesRecommended + votesNotRecommended)

    voteOptions.push(voteOption);
    ratios.push(ratioGoodVsBad);
  }

  let recommendedOptions = []
  for (let i in ratios) {
    if (ratios[i] > 0.8) {
      recommendedOptions.push(voteOptions[i]);
    }
  }
  return recommendedOptions;
}
