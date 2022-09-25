const readline = require('readline');
const readlineInterface = readline.createInterface(process.stdin, process.stdout);

function ask(questionText) {
  return new Promise((resolve, reject) => {
    readlineInterface.question(questionText, resolve);
  });
};

let roomDescriptions = {
  doorstepDescription: `\nYou are on the doorstep of a spooky old manor. Thunder claps around you and lightning flashes. The sky is gray with no end in sight and a deluge of rain spills from the clouds. You need to get under cover, but the manor is the only shelter nearby. Inexplicably, it seems to draw you in. Then a voice as ephemeral as the wind whispers in your ear. ‘Hello and welcome to Chestnut Hill Manor.  I see that another wandering soul has found their way to my doorstep. Before you try to enter, I must know your name.’\n---\n>`,
  foyerDescription: `\nYou’re in the foyer. From the vaulted ceiling of this lavish room hangs an ornate chandelier. Some of the bulbs of the chandelier flicker to life, illuminating the rest of the room. At the very center of the floor there is a round marble table with a tarnished silver base. Atop the table sits a vase supporting a bouquet long dead. The glint of a lighter next to the vase catches your eye. There are two large doors in the room; one is on the right, the other on the left. Two staircases climb from either side of the foyer, connecting at the upstairs hallway landing. There is one more door in the back of the room, but it is boarded up. with rusty nails. With the right tool maybe it could be open...`,
  boardedDoorDescriptionOne: `\nThe boarded up door has rusty nails protruding from it. You try to pull the boards off but you are unsuccessful. If only you had a tool to help you.\n---\n`,
  boardedDoorDescriptionTwo: `\nThe boarded up door has rusty nails protruding from it. You take the hammer out of the pack and pry the nails out. The boards clatter to the floor revealing a stairwell with a dim light. Would you like to go down the stairs to the basement?\n---\nType 'Yes' or 'No'.\n---\n>`,
  kitchenDescription: `\nYou are in the kitchen. The room is drab and dusty. Cobwebs cascade from the corners of the walls and dust coats the ancient cooking appliances. The glow from the pilot light glows ominously from the range. The range lets out a low and peculiar groan as if calling for your help. On the far wall, a dumbwaiter’s mouth gapes open. There seems to be enoug space for a person to fit inside.`
  //more rooms!
};

let currentRoom = 'doorstep';

let alive = true;

let basementBoarded = true;
//Item Booleans
let hasLighter = false;
let hasHammer = false;
let hasSilverBook = false;
let hasDumbwaiterKey = false;
let hasSealedUrn = false;
  
class Room {
  constructor(location, description, possiblePaths, roomInventory) {
    this.location = location;
    this.description = description;
    this.possiblePaths = possiblePaths
    this.roomInventory = roomInventory
  }
};
class Player {
  constructor(name, playerInventory, playerStatus) {
    this.name = name;
    this.playerInventory = playerInventory;
    this.playerStatus = playerStatus;
  
  };
};
let playerStats = new Player(null, [], currentRoom)  
//CREATE ROOM CLASSES
let foyer = new Room('foyer', roomDescriptions.foyerDescription, ['kitchen', 'lounge', 'upstairs', 'boardedDoor'], [`lighter`])
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
    await playFoyer();
  };
  if (currentRoom === 'kitchen') {
    await playKitchen();
  };
  while (alive === false) {
    await playAgain();
  };
  //process.exit();
};
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
    start();
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
  if (hasLighter === false && basementBoarded === true) {
  console.log(roomDescriptions.foyerDescription);
  await foyerOptionsOne();
  };
  if (hasLighter === true && basementBoarded === true) {
    console.log(`You are in the foyer.\n`);
    await foyerOptionsTwo();
  } if (basementBoarded === false && hasLighter === true) {
    console.log(`You are in the foyer.\n\n`);
    await foyerOptionsThree();
  }
}
//foyerOptionsOne - first list of foyer options (with lighter)
async function foyerOptionsOne() {
  let nextStep = await ask(`\n---\nWhat would you like to do?\n\n>Right door\n>Left door\n>Climb stairs\n>Take lighter\n>Check boarded door\n---\n>`)
  if (nextStep.toLowerCase() === `right door`) {
    currentRoom = `kitchen`;
    return;
  };
  if (nextStep.toLowerCase() === `left door`) {
    currentRoom = `lounge`;
    console.log(`LOUNGE`);
    return;
  };
  if (nextStep.toLowerCase() === `climb stairs`) {
    currentRoom = `upstairs`;
    console.log(`UPSTAIRS`);
    return;
  };
  if (nextStep.toLowerCase() === `take lighter`) {
  console.log(`You pick up the lighter. It's brass exterior is green with age. You flick the rough wheel. It sparks into a diamond shaped flame. It works. You add it to your pack.`)
  playerStats.playerInventory.push(`lighter`);
  hasLighter = true;
  console.log(`\n${playerStats.playerInventory}\n`);
  console.log(hasLighter);
  await playFoyer();
  };
  if (nextStep.toLowerCase() === `check boarded door`) {
    playBoardedDoorOne();
  }
  else {
  console.log(`${nextStep} is not a valid option.`);
  await playFoyer();
  return
  };
};
//foyerOptionsTwo - second list of foyer options (you took the lighter)
async function foyerOptionsTwo() {
  currentRoom = `foyer`;
  let nextStep = await ask(`\n---\nWhat would you like to do?\n\n>Right door\n>Left door\n>Climb stairs\n>Check boarded door\n---\n`)
  if (nextStep.toLowerCase() === `right door`) {
    return
  };
  if (nextStep.toLowerCase() === `left door`) {
  console.log(`LOUNGE`);
    return
  };
  if (nextStep.toLowerCase() === `climb stairs`) {
  console.log(`UPSTAIRS`);
    return
  };
  if (nextStep.toLowerCase() === `check boarded door`) {
    if (playerStats.playerInventory.includes(`hammer`)){
      await playBoardedDoorTwo();
    } else {
      playBoardedDoorOne();
    }
  }
};
//Foyer Options Three - if the door is no long boarded
async function foyerOptionsThree() {
  let nextStep = await ask(`\n---\nWhat would you like to do?\n\n>Right door\n>Left door\n>Climb stairs\n>Go to basement\n---\n`)
  if (nextStep.toLowerCase() === `right door`) {
    currentRoom = `kitchen`;
    return;
  };
  if (nextStep.toLowerCase() === `left door`) {
    currentRoom = `lounge`;
    console.log(`LOUNGE`);
    return;
  };
  if (nextStep.toLowerCase() === 'go to basement') {
    currentRoom = `basement`;
    console.log('BASEMENT');
    return;
  } else {
    console.log(`${nextStep} is not a valid option.`);
    await playFoyer();
  };
};
//Play Boarded Door One - no Hammer
function playBoardedDoorOne() {
  console.log(roomDescriptions.boardedDoorDescriptionOne)
  playFoyer();
};
//Play Boarded Door Two - hammer
async function playBoardedDoorTwo() {
  let nextStep = await ask(boardedDoorDescriptionTwo);
    if (nextStep.toLowerCase() === `yes`) {
      currentRoom = `basement`;
      console.log(`BASEMENT`);
      return;
    } if (nextStep.toLowerCase() === `no`) {
      playFoyer();
    } else {
      console.log(`${nextStep} is not a valid option.`);
      playFoyer();
    };
  };
//Play kitchen
async function playKitchen() {
  console.log(roomDescriptions.kitchenDescription);
  let nextStep = await ask(`What would you like to do?\n\n>Check Oven\n>Check Dumbwaiter\n>Back to Foyer\n---\n`);
  if (nextStep.toLowerCase() === 'check oven') {
    ovenAction();
    //dies or gets info
  };
  if (nextStep.toLowerCase() === `check dumbwaiter`) {
    console.log(`This is the dumbwaiter`)
    start();
    //something happens
  };
  if (nextStep.toLowerCase() === `back to foyer`) {
    currentRoom = `foyer`;
    start();
  };
};
async function ovenAction() {
  let response = await ask(`The oven belches and grunts. The pilot light grows rapidly, its flame white hot. A face of an angry woman appears in the flame. She cries out, "Return my body to my soul!" It is the same voice from the doorstep... Will you help? Yes or no?\n---\n`);
  if (response.toLowerCase() === `yes`) {
    console.log(`The voice begins to cackle hysterically. You back away.`);
    playKitchen();
  }
  if (respon.toLowerCase() === `no`) {
    console.log(`A hysterical screech pierces your ears as the flame before you engulfs your body. With searing pain, your vision goes black.`)
    alive = false;
    start();
  }
  else {
    console.log(`${response} is not a valid option.`);
    ovenAction();
  };
};
async function dumbwaiterAction() {
  if (hasDumbwaiterKey === false) {
    console.log(`There's space enough for this dumbwaiter for a person and a slot for a key.`);
    playKitchen();
  };
  if (hasDumbwaiterkey === true) {
    console.log(`You put the key in the slot and turn it. A button above the key slot lights up.`);
    rideDumbwaiter();
  };
};
async function rideDumbwaiter() {
  response = await ask(`Would you like to ride the dumbwaiter to the second floor? Respond yes or no.\n`);
  if (response.toLowerCase() === `no`) {
    playKitchen();
  };
  if (response.toLowerCase() === `yes`) {
    console.log(`You climb in the dumbwaiter, reach around the edge and press the lit button. The lift lurches you upward, unevenly and precariously. It takes you all the way up.`)
    currentRoom = `firstBedroom`;
    start();
  };
};