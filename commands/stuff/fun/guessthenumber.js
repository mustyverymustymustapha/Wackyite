/* const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
    .setName('guessthenumber')
    .setDescription('Play a game where you guess the number!')
    .addIntegerOption(option =>
        option
        .setName('min')
        .setDescription('The minimum number to guess from (default: 1)')
        .setRequired(false)
    )
    .addIntegerOption(option =>
        option
        .setName('max')
        .setDescription('The maximum number to guess from (default: 10)')
        .setRequired(false)
    ),
    async execute(interaction) {
        const min = interaction.options.getInteger('min') || 1;
        const max = interaction.options.getInteger('max') || 10;

        if (min >= max) {
            return interaction.reply({ content: 'The minimum number must be less than the maximum number!', ephemeral: true });
        }

        const numberToGuess = Math.floor(Math.random() * (max - min + 1)) + min;

        await interaction.reply({
            content: `I've picked a number between **${min}** and **${max}**. Can you guess it? Type your guesses in the channel.`,
        })
    }
}

this wont work with the newest version of discord.js, so i have decided to completely remove it. sorry! */