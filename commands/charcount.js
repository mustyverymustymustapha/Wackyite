const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
    .setName('charcount')
    .setDescription('Counts the number of characters in your text.')
    .addStringOption(option =>
        option
        .setName('text')
        .setDescription.setDescription('The text to count characters from.')
        .setRequired(true)
    ),

    async execute(interaction) {
        const inputText = interaction.options.getString('text').trim();
        const charCount = inputText.length;

        await interaction.reply(`🔢 The total character count is **${charCount}**.`);
    },
};