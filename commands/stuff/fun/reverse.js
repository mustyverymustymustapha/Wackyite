const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
    .setName('reverse')
    .setDescription('Reverse the inputted text!')
    .addStringOption(option =>
        option
        .setName('text')
        .setDescription('The text to reverse')
        .setRequired(true)
    ),
    async execute(interaction) {
        const text = interaction.options.getString('text');

        const reversedText = text.split('').reverse().join('');

        await interaction.reply({
            content: `Reversed text: **${reversedText}**`,
        });
    },
};