const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
    .setName('ping')
    .setDescription('The simplest of commands. Replies with "Pong!". Can be used to check if the bot is online.'),
    async execute(interaction) {
        await interaction.reply('Pong!');
    },
};