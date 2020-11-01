const Discord = require('discord.js');
const client = new Discord.Client();
const prefix = "s!";
const fs = require("fs");

client.commands = new Discord.Collection();

const commandFiles = fs.readdirSync('./commands/').filter(file => file.endsWith('.js'));

for(const file of commandFiles)
{
  const command = require(`./commands/${file}`);

  client.commands.set(command.name, command);
}

client.once('ready', () => {
  console.log('Online!');
});

var classes = [];
var alarm  = [-1, -1];
var day = 0;

client.on('message', async message => {
  if (!message.content.startsWith(prefix) || message.author.bot) return;

  const args = message.content.slice(prefix.length).trim().split(/ +/);
  const command = args.shift().toLowerCase();

  const date = new Date();


  if(command === 'ping')
  {
    client.commands.get('ping').execute(message, args);
  }

  else if(command === 'time')
  {
    client.commands.get('time').execute(message, args);
  }

  else if(command === 'setalarm')
  {
    if(!args.length)
    {
      return message.channel.send("You didn't provide any arguments.");
    }
    else if(args.length != 2)
    {
      return message.channel.send("Incorrect number of arguments.");
    }

    for(var i = 0; i < 2; i++)
    {
      alarm[i] = `${args[i]}`;
    }

    message.channel.send("Alarm set for " + alarm[0] + ":" + alarm[1]);
  }


  else if (command === 'alarm')
  {
    if(alarm[0] == -1 && alarm[1] == -1)
    {
      message.channel.send("Alarm has not been set yet");
    }
    else
    {
      message.channel.send("Alarm is set for " + alarm[0] + ":" + alarm[1]);
    }
  }

  else if(command === 'setschedule')
  {
    if(!args.length)
    {
      return message.channel.send("You didn't provide any arguments.");
    }
    else if(args.length != 12)
    {
      return message.channel.send("Incorrect number of arguments.");
    }

    for(var i = 0; i < 12; i++)
    {
      classes[i] = `${args[i]}`;
    }

    message.channel.send("Classes Set");


  }

  else if(command == 'fullschedule')
  {
    message.channel.send("**Class 1: **" + `${classes[0]}` +
      "\n **Class 2: **" + `${classes[1]}` +
      "\n **Class 3: **" + `${classes[2]}` +
      "\n **Class 4: **" + `${classes[3]}` +
      "\n **Class 5: **" + `${classes[4]}` +
      "\n **Class 6: **" + `${classes[5]}` +
      "\n **Class 7: **" + `${classes[6]}` +
      "\n **Class 8: **" + `${classes[7]}` +
      "\n **Monday Club: **" + `${classes[8]}` +
      "\n **Wednesday Club: **" + `${classes[9]}` +
      "\n **Friday Club: **" + `${classes[10]}` +
      "\n **Advisory: **" + `${classes[11]}`);
  }

  else if(command == 'setday')
  {
    if(!args.length)
    {
      return message.channel.send("You didn't provide any arguments.");
    }
    else if(args.length != 1)
    {
      return message.channel.send("Incorrect number of arguments.");
    }

    day = `${args[0]}`;

    return message.channel.send("The day has been set as " + day);
  }

  else if(command === 'schedule')
  {
    if(parseInt(day) === 1)
    {
      message.channel.send("**Class 1: **" + `${classes[0]}` +
        "\n **Class 2: **" + `${classes[1]}` +
        "\n **Class 3: **" + `${classes[2]}` +
        "\n **Class 4: **" + `${classes[3]}`);
    }
    else if(parseInt(day) === 2)
    {
      message.channel.send("**Class 5: **" + `${classes[4]}` +
      "\n **Class 6: **" + `${classes[5]}` +
      "\n **Class 7: **" + `${classes[6]}` +
      "\n **Class 8: **" + `${classes[7]}`);
    }

    if(date.getDay() == 1)
    {
      message.channel.send("**Monday Club: **" + `${classes[8]}`);
    }
    else if(date.getDay() == 3)
    {
      message.channel.send("**Wednesday Club: **" + `${classes[9]}`);
    }
    else if(date.getDay() == 5)
    {
      message.channel.send("**Friday Club: **" + `${classes[10]}`);
    }
    else
    {
      message.channel.send("**Advisory: **" + `${classes[11]}`);
    }
  }

  else if(command === 'help')
  {
    message.channel.send("**s!setschedule** - This allows you to set your schedule. Enter the zoom links for blocks 1-8 and then Monday, Wednesday, Friday Clubs, and finally your advisory.\n"
      + "**s!setday** - This allows you to set the day which the schedule follows (A - F). Please enter the day as an integer from 1 - 6.\n "
      + "**s!setalarm** - This allows you to set off an alarm which will ping you when the time comes. Enter the hour and minutes in that order as two arguments.\n"
      + "**s!time** - This gives you the current time.\n"
      + "**s!alarm** - This will give you an update on any set alarm you have.\n"
      + "**s!fullschedule** - This will give you your entire schedule including the links if you have set them.\n"
      + "**s!schedule** - This will give you your schedule for the day, depending on the day you set and the day of the week.");
  }


  setInterval(function(){
    if(date.getHours() === parseInt(alarm[0]) && date.getMinutes() === parseInt(alarm[1]))
    {
      alarm[0] = -1; alarm[1] = -1;
      return message.channel.send("<@" + message.author + ">, Alarm is up!");
    }

    else if(date.getHours() === 7 && date.getMinutes() === 55)
    {
      return message.channel.send("<@" + message.author + ">, 5 minutes until your first class!");
    }
    else if(date.getHours() === 9 && date.getMinutes() === 23)
    {
      return message.channel.send("<@" + message.author + ">, 5 minutes until your second class!");
    }
    else if(date.getHours() === 11 && date.getMinutes() === 25)
    {
      return message.channel.send("<@" + message.author + ">, 5 minutes until HS activity!");
    }
    else if(date.getHours() === 12 && date.getMinutes() === 8)
    {
      return message.channel.send("<@" + message.author + ">, 5 minutes until your third class!");
    }
    else if(date.getHours() === 1 && date.getMinutes() === 35)
    {
      return message.channel.send("<@" + message.author + ">, 5 minutes until your fourth class!");
    }

  }, 5000);

});



client.login('NzcyMTE5NzYyNzc5MjQyNTA4.X52CkA.g0M5PX_Q-X-LGUdK4VLkYSokhbo');
