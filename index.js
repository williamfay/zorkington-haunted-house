const readline = require('readline');
const readlineInterface = readline.createInterface(process.stdin, process.stdout);

function ask(questionText) {
  return new Promise((resolve, reject) => {
    readlineInterface.question(questionText, resolve);
  });
};

let roomDescriptions = {
  doorstepDescription: `You are on the doorstep of a spooky old manor. Thunder claps around you and lightning flashes. The sky is gray with no end in sight and a deluge of rain spills from the clouds. You need to get under cover, but the manor is the only shelter nearby. Inexplicably, it seems to draw you in. Then a voice as ephemeral as the wind whispers in your ear. ‘Hello and welcome to Chestnut Hill Manor.  I see that another wandering soul has found their way to my doorstep. Before you try to enter, I must know your name.’\n---\n>`,
  foyerDescription: `You’re in the foyer. From the vaulted ceiling of this lavish room hangs an ornate chandelier. Some of the bulbs of the chandelier flicker to life, illuminating the rest of the room. At the very center of the floor there is a round marble table with a tarnished silver base. Atop the table sits a vase supporting a bouquet long dead. The glint of a lighter next to the vase catches your eye. There are two large doors in the room; one is on the right, the other on the left. Two staircases climb from either side of the foyer, connecting at the upstairs hallway landing. There is one more door in the back of the room, but it is boarded up with rusty nails. With the right tool maybe it could be open...`,

  //more rooms!
};

let currentRoom = 'doorstep';

let alive = true;
  
class Room {
  constructor(location, description, possiblePaths, roomInventory) {
    this.location = location;
    this.description = description;
    this.possiblePaths = possiblePaths
    this.roomInventory = roomInventory
  }
};

//Consider using one large Machine function for everything

class Player {
  constructor(name, playerInventory, playerStatus) {
    this.name = name;
    this.playerInventory = playerInventory;
    this.playerStatus = playerStatus;
  
  };
};
//CREATE PLAYER CLASS
let playerStats = new Player(null, [], currentRoom)
//let doorstep = new Room(doorstep, doorstepDescription, ['foyer'], '');
  
//CREATE ROOM CLASSES
  //new Room();


start();
/*create a check inventory function*/
/*Build command function that references lookup array*/
/*known command object if I want to go this route*/
/*Hint command??*/


//FUNCTIONS
//Start - this will have all other functions inside of it
async function start() {
  
  if (currentRoom === `doorstep`) {
    await newPlayer();
    await playDoorstep();
  };
  if (currentRoom === `foyer`) {
    console.log(roomDescriptions.foyerDescription);
  }

  while (alive === false) {
    await playAgain();
  };
  process.exit();
}
//playAgain - function that allows you to restart
async function playAgain() {
  let playAgain = await ask(`Would you like to play again? Type 'Yes' or 'No'.\n---    \n>`)
  if (playAgain.toLowerCase() === `yes`) {
  alive = true;
  await start();
  };
  if (playAgain.toLowerCase() === `no`) {
  process.exit();
  };
}
//New Player - this will ask the players name for new Player class
async function newPlayer() {
  let playerName = await ask(roomDescriptions.doorstepDescription);
  console.log(`'Good luck ${playerName}... Getting out will be much harder than getting in...' the voice drifts around you.\n---\n`);
  playerStats.name = playerName;
  return playerName;
}
//playDoorstep - this will allow the player to either enter the house or get struck by ligthning
async function playDoorstep() {
  let doorstepResponse = await ask(`Would you like to enter? Type 'Yes' or 'No'.\n---\n`)
  if (doorstepResponse.toLowerCase() === `yes`) {
    console.log(`You enter. The door clicks behind you.\n---\n`);
    currentRoom = `foyer`
    return
  };
  if (doorstepResponse.toLowerCase() === `no`) {
    console.log(`Lightning strikes you. Everything goes black. You should've found shelter... A voice like wind cackles at your misfortune.\n---\n`);
    alive = false;
    return;
  }
  else {
    console.log(`That is not a valide response. You must respond 'Yes' or 'No'.\n---\n`);
    await playDoorstep();
  }
}
//playFoyer - this will allow you to interact with the foyer
async function playFoyer() {
  console.log(roomDescriptions.foyerDescription);
  await foyerOptionsOne();
}
//foyerOptionsOne - first list of foyer options (with lighter)
async function foyerOptionsOne() {
  let nextStep = await ask(`\n---\nWhat would you like to do?\n\n>Right door\n>Left door\n>Climb stairs\n>Take lighter\n---`)
} if (nextStep.toLowerCase() === `right door`) {
  console.log(`KITCHEN`); 
};
if (nextStep.toLowerCase() === `left door`) {
  console.log(`LOUNGE`);
};
if (nextStep.toLowerCase() === `climb stairs`) {
  console.log(`UPSTAIRS`);
};
if (nextStep.toLowerCase() === `take lighter`) {
  console.log(`You pick up the lighter. It's brass exterior is green with age. You flick the rough wheel. It sparks into a diamond shape flame. It works. You add it to your pack.`)
  playerStats.playerInventory.push(`lighter`);
  await foyerOptionsTwo();
}
else {
  console.log(`${nextStep} is not a valid option.`);
  await foyerOptionsOne();
};
//foyerOptionsTwo - second list of foyer options (you took the lighter)
async function foyerOptionsTwo() {
  let nextStep = await ask(`\n---\nWhat would you like to do?\n\n>Right door\n>Left door\n>Climb stairs\n>Take lighter\n---\n`)
} if (nextStep.toLowerCase() === `right door`) {
  console.log(`KITCHEN`);
  
};
if (nextStep.toLowerCase() === `left door`) {
  console.log(`LOUNGE`);
  
};
if (nextStep.toLowerCase() === `climb stairs`) {
  console.log(`UPSTAIRS`);
  
};
//ITEMS OBJECT