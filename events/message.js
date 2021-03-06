const Discord = require("discord.js");
const { prefix } = require("../config.json");
const ytdl = require("ytdl-core");

module.exports = async (client, message) => {
  if (message.author.bot) return;

  const args = message.content.slice(prefix.length).trim().split(/ +/g);

  if (message.content.toLowerCase().includes("conga")) {
    const voiceChannel = message.member.voice.channel;
    if (voiceChannel) {
      const permissions = voiceChannel.permissionsFor(message.client.user);
      if (permissions.has("CONNECT") && permissions.has("SPEAK")) {
        const connection = await voiceChannel.join();
        videoPlayer(connection);
      }
    }
  }

  if (!message.content.startsWith(prefix)) return;

  const command = args.shift();
  const cmd = client.commands.get(command);
  if (!cmd) return;
  return cmd.run(client, message, args);
};

function videoPlayer(connection) {
  const stream = ytdl(
    "https://www.youtube.com/watch?v=5SXX-pWzOY8&feature=youtu.be",
    { filter: "audioonly" }
  );
  connection.play(stream, { seek: 0, volume: 0.5 }).on("finish", () => {
    videoPlayer(connection);
  });
}
