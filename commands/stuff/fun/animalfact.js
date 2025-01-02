const { SlashCommandBuilder } = require('discord.js');
const axios = require('axios');

module.exports = {
    data: new SlashCommandBuilder()
    .setName('animalfact')
    .setDescription('Get a random animal fact!'),
    async execute(interaction) {
        await interaction.reply("Fetching an animal fact...");

        try {
            const response = await axios.get('https://some-random-api.ml/animal/facts');
            const fact = response.data.fact;

            await interaction.editReply(`🐾 **Animal Fact:**\n"${fact}"`);
        } catch (error) {
            console.error('Error fetching animal fact:', error);
            await interaction.editReply('Oops! Could not fetch an animal fact at the moment.');
        }
    },
};