const tmi = require('tmi.js');
const {exec} = require("child_process")
const {isAudioCommand, executeAudioCommand} = require('./audio_commands')

// Define configuration options
const opts = {
  identity: {
    username: process.env.BOT_USERNAME,
    password: process.env.OAUTH_TOKEN,
  },
  channels: [
    process.env.CHANNEL_NAME
  ]
};

const isMod = ((context) => context['mod'] || context['subscriber'])

// Create a client with our options
const client = new tmi.client(opts);

// Register our event handlers (defined below)
client.on('message', onMessageHandler);
client.on('connected', onConnectedHandler);

// Connect to Twitch:
client.connect();

// Called every time a message comes in
function onMessageHandler (target, context, msg, self) {
    console.log("--------------")
    console.log(context)
    console.log("--------------")
    
  if (self) { return; } // Ignore messages from the bot

  // Remove whitespace from chat message
  const commandName = msg.trim();

  // If the command is known, let's execute it
  
  if(commandName === '!blastCorn') {
      client.say(target, 'cornblCorn3 cornblCorn3 cornblCorn3 cornblCorn3 cornblCorn3 cornblCorn3 cornblCorn3 cornblCorn3 cornblCorn3 cornblCorn3')
  }

  else if(commandName.match(/fart/i) && isMod(context)) {
    if(isAudioCommand(commandName)) {
      executeAudioCommand(commandName)
    } 
    client.say(target, context['username'] + " farted.  LOLOLOL!")
  }

  else if(commandName.match(/fart/i) && !isMod(context)) {
    client.say(target, "only mods may fart.")
  }

  else if((isMod(context) || !isMod(context)) && isAudioCommand(commandName)) {
      console.log("executing " + commandName)
      executeAudioCommand(commandName)
  }


  else {
    console.log(`* Unknown command ${commandName}`);
  }
}

// Function called when the "dice" command is issued
function rollDice () {
  const sides = 6;
  return Math.floor(Math.random() * sides) + 1;
}

// Called every time the bot connects to Twitch chat
function onConnectedHandler (addr, port) {
  console.log(`* Connected to ${addr}:${port}`);
}