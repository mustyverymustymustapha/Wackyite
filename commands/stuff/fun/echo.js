const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
    .setName('echo')
    .setDescription("Echoes what you say! I'm not responsible for what you say however.")
    .addStringOption(option => 
        option
        .setName('message')
        .setDescription('The message to echo (don\'t misuse)')
        .setRequired(true)),
        async execute(interaction) {
            const message = interaction.options.getString('message');
            await interaction.reply(`${message} (echoed)`);
        },
};