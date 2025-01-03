const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
    .setName('randomcase')
    .setDescription('Randomly capitalises letters in your text.')
    .addStringOption(option =>
        option
        .setName('text')
        .setDescription('The text to capitalise randomly.')
        .setRequired(true)
    ),
    async execute(interaction) {
        const inputText = interaction.options.getString('text');
        const randomisedText = inputText.split('').map(char => Math.random() > 0.5 ? char.toUpperCase() : char.toLowerCase()).join('');

        await interaction.reply(`🔃 Your text in random case: **${randomisedText}**`);
    },
};