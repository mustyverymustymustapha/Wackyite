const { SlashCommandBuilder } = require('@discordjs/builders');
const fetch = require('node-fetch');

module.exports = {
    data: new SlashCommandBuilder()
    .setName('dictionary')
    .setDescription('Fetch the definition of a word.')
    .addStringOption(option =>
        option
        .setName('word')
        .setDescription('The word you want to look up.')
        .setRequired(true)
    ),

    async execute(interaction) {
        const word = interaction.options.getString('word');

        await interaction.reply(`📚 Looking up the definition for **${word}**...`);

        try {
            const response = await fetch(`https://some-random-api.com/others/dictionary?word=${encodeURIComponent(word)}`);
            if (!response.ok) throw new Error('Failed to fetch the definition.');

            const data = await response.json();

            if (!data.definition) {
                await interaction.editReply(`❌ No definition found for **${word}**.`);
            } else {
                await interaction.editReply(`📚 **${word}**: ${data.definition}`);
            }
        } catch (error) {
            console.error('Error fetching definition:', error);
            await interaction.editReply('❌ Something went wrong while fetching the definition. Please try again later.');
        }
    },
};