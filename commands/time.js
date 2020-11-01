module.exports = {
  name: 'time',
  description: "This returns the corrent time",
  execute(message, args)
  {
    const date = new Date();
    
    if(date.getMinutes() < 10)
    {
      message.channel.send(date.getHours() + ":0" + date.getMinutes());
    }
    else
    {
      message.channel.send(date.getHours() + ":" + date.getMinutes());
    }
  }
}
