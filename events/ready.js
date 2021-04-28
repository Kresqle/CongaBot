module.exports = async (client, data) => {
  client.user.setActivity("Conga", {
    type: "LISTENING",
  });
};
