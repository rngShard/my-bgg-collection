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
  categories: BggCategory[];
  mechanics: BggMechanic[];
  designers: String[];
  artists: String[];
  publishers: String[];
  numPlays?: Number;
  ratingAverage: Number;
  weightAverage: Number;
  rank: Number;

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
          console.log("(!) Invalid name for BGG-object-poll found!", poll['$']['name']); 
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
        case 'boardgameintegration': {   // Ignore ...
          break;
        }
        case 'boardgamecompilation': {   // Ignore ...
          break;
        }
        case 'boardgameexpansion': {   // Ignore ...
          break;
        }
        default: {
          console.log("(!) Invalid name for BGG-object-link found!", link['$']['type']); 
          break;
        }
      }
    }
    this.categories = categories;
    this.mechanics = mechanics;
    this.designers = designers;
    this.artists = artists;
    this.publishers = publishers;

    this.ratingAverage = Math.round(+BggXmlApiItemObj['statistics'][0]['ratings'][0]['average'][0]['$']['value'] * 10) / 10;
    this.weightAverage = Math.round(+BggXmlApiItemObj['statistics'][0]['ratings'][0]['averageweight'][0]['$']['value'] * 10) / 10;
    this.rank = +BggXmlApiItemObj['statistics'][0]['ratings'][0]['ranks'][0]['rank'][0]['$']['value'];
  }
}

function fromNestedPollReturnRecommendations(BggXmlApiItemObjPollResults: any, key: String): String[] {
  let voteOptions = [], ratios = [];
  for (let result of BggXmlApiItemObjPollResults) {
    let voteOption = result['$'][`${key}`];

    if (!result['result']) {
      console.log(`In resolving poll-result ${result}, found results as 'undefined', because only single option`);
      let onlyResult = result['$'][`${key}`];
      return [onlyResult];
    }
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

export enum BggCategory {
"Abstract Strategy",
"Action / Dexterity",
"Adventure",
"Age of Reason",
"American Civil War",
"American Indian Wars",
"American Revolutionary War",
"American West",
"Ancient",
"Animals",
"Arabian",
"Aviation / Flight",
"Bluffing",
"Book",
"Card Game",
"Children's Game",
"City Building",
"Civil War",
"Civilization",
"Collectible Components",
"Comic Book / Strip",
"Deduction",
"Dice",
"Economic",
"Educational",
"Electronic",
"Environmental",
"Expansion for Base-game",
"Exploration",
"Fan Expansion",
"Fantasy",
"Farming",
"Fighting",
"Game System",
"Horror",
"Humor",
"Industry / Manufacturing",
"Korean War",
"Mafia",
"Math",
"Mature / Adult",
"Maze",
"Medical",
"Medieval",
"Memory",
"Miniatures",
"Modern Warfare",
"Movies / TV / Radio theme",
"Murder/Mystery",
"Music",
"Mythology",
"Napoleonic",
"Nautical",
"Negotiation",
"Novel-based",
"Number",
"Party Game",
"Pike and Shot",
"Pirates",
"Political",
"Post-Napoleonic",
"Prehistoric",
"Print & Play",
"Puzzle",
"Racing",
"Real-time",
"Religious",
"Renaissance",
"Science Fiction",
"Space Exploration",
"Spies/Secret Agents",
"Sports",
"Territory Building",
"Trains",
"Transportation",
"Travel",
"Trivia",
"Video Game Theme",
"Vietnam War",
"Wargame",
"Word Game",
"World War I",
"World War II",
"Zombies"
}

export enum BggMechanic {
  "Acting",
  "Action Drafting",
  "Action Points",
  "Action Queue",
  "Action Retrieval",
  "Action Timer",
  "Action/Event",
  "Advantage Token",
  "Alliances",
  "Area Majority / Influence",
  "Area Movement",
  "Area-Impulse",
  "Auction/Bidding",
  "Auction: Dexterity",
  "Auction: Dutch",
  "Auction: Dutch Priority",
  "Auction: English",
  "Auction: Fixed Placement",
  "Auction: Once Around",
  "Auction: Sealed Bid",
  "Auction: Turn Order Until Pass",
  "Automatic Resource Growth",
  "Betting and Bluffing",
  "Bias",
  "Bingo",
  "Bribery",
  "Campaign / Battle Card Driven",
  "Card Drafting",
  "Card Play Conflict Resolution",
  "Catch the Leader",
  "Chaining",
  "Chit-Pull System",
  "Closed Economy Auction",
  "Command Cards",
  "Commodity Speculation",
  "Communication Limits",
  "Connections",
  "Constrained Bidding",
  "Contracts",
  "Cooperative Game",
  "Crayon Rail System",
  "Critical Hits and Failures",
  "Cube Tower",
  "Deck Construction",
  "Deck, Bag, and Pool Building",
  "Deduction",
  "Delayed Purchase",
  "Dice Rolling",
  "Die Icon Resolution",
  "Different Dice Movement",
  "Drafting",
  "Elapsed Real Time Ending",
  "Enclosure",
  "End Game Bonuses",
  "Events",
  "Finale Ending",
  "Flicking",
  "Follow",
  "Force Commitment",
  "Grid Coverage",
  "Grid Movement",
  "Hand Management",
  "Hexagon Grid",
  "Hidden Movement",
  "Hidden Roles",
  "Hidden Victory Points",
  "Highest-Lowest Scoring",
  "Hot Potato",
  "I Cut, You Choose",
  "Impulse Movement",
  "Income",
  "Increase Value of Unchosen Resources",
  "Induction",
  "Interrupts",
  "Investment",
  "Kill Steal",
  "King of the Hill",
  "Ladder Climbing",
  "Layering",
  "Legacy Game",
  "Line Drawing",
  "Line of Sight",
  "Loans",
  "Lose a Turn",
  "Mancala",
  "Map Addition",
  "Map Deformation",
  "Map Reduction",
  "Market",
  "Matching",
  "Measurement Movement",
  "Melding and Splaying",
  "Memory",
  "Minimap Resolution",
  "Modular Board",
  "Move Through Deck",
  "Movement Points",
  "Movement Template",
  "Moving Multiple Units",
  "Multiple Maps",
  "Multiple-Lot Auction",
  "Narrative Choice / Paragraph",
  "Negotiation",
  "Network and Route Building",
  "Once-Per-Game Abilities",
  "Order Counters",
  "Ownership",
  "Paper-and-Pencil",
  "Passed Action Token",
  "Pattern Building",
  "Pattern Movement",
  "Pattern Recognition",
  "Physical Removal",
  "Pick-up and Deliver",
  "Pieces as Map",
  "Player Elimination",
  "Player Judge",
  "Point to Point Movement",
  "Predictive Bid",
  "Prisoner's Dilemma",
  "Programmed Movement",
  "Push Your Luck",
  "Race",
  "Random Production",
  "Ratio / Combat Results Table",
  "Re-rolling and Locking",
  "Real-Time",
  "Relative Movement",
  "Resource to Move",
  "Rock-Paper-Scissors",
  "Role Playing",
  "Roles with Asymmetric Information",
  "Roll / Spin and Move",
  "Rondel",
  "Scenario / Mission / Campaign Game",
  "Score-and-Reset Game",
  "Secret Unit Deployment",
  "Selection Order Bid",
  "Semi-Cooperative Game",
  "Set Collection",
  "Simulation",
  "Simultaneous Action Selection",
  "Singing",
  "Single Loser Game",
  "Slide/Push",
  "Solo / Solitaire Game",
  "Speed Matching",
  "Square Grid",
  "Stacking and Balancing",
  "Stat Check Resolution",
  "Static Capture",
  "Stock Holding",
  "Storytelling",
  "Sudden Death Ending",
  "Take That",
  "Targeted Clues",
  "Team-Based Game",
  "Tech Trees / Tech Tracks",
  "Three Dimensional Movement",
  "Tile Placement",
  "Time Track",
  "Track Movement",
  "Trading",
  "Traitor Game",
  "Trick-taking",
  "Tug of War",
  "Turn Order: Auction",
  "Turn Order: Claim Action",
  "Turn Order: Pass Order",
  "Turn Order: Progressive",
  "Turn Order: Random",
  "Turn Order: Role Order",
  "Turn Order: Stat-Based",
  "Variable Phase Order",
  "Variable Player Powers",
  "Variable Set-up",
  "Victory Points as a Resource",
  "Voting",
  "Worker Placement",
  "Worker Placement with Dice Workers",
  "Worker Placement, Different Worker Types",
  "Zone of Control"
}