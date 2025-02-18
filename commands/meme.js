const { SlashCommandBuilder } = require('discord.js');
const axios = require('axios');

module.exports = {
    data: new SlashCommandBuilder()
    .setName('meme')
    .setDescription('Get a random meme!'),
    async execute(interaction) {
        try {
            const response = await axios.get('https://meme-api.com/gimme');
            const data = response.data;

            if(!data || !data.url) {
                return interaction.reply({ content: 'Sorry, I couldn\'t fetch a meme right now!!', ephemeral: true });
            }

            const memeUrl = data.url;
            await interaction.reply({ content: memeUrl });
        } catch (error) {
            console.error(error);
            interaction.reply({ content: 'An error happened while fetching the meme. Please try again later!', ephemeral: true });
        }
    },
};