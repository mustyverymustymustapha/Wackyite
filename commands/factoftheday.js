const { SlashCommandBuilder } = require('discord.js');
const axios = require('axios');

module.exports = {
    data: new SlashCommandBuilder()
    .setName('factoftheday')
    .setDescription('Get the fact of the day!'),
    async execute(interaction) {
        await interaction.reply('Fetching an interesting fact for you...');

        try {
            const response = await axios.get('https://uselessfacts.jsph.pl/random.json?language=en');
            const fact = response.data.text;

            await interaction.editReply(`🧠 **Fact of the day:**\n${fact}`);
        } catch (error) {
            console.error('Error fetching the fact:', error);
            await interaction.editReply('Oops! Could not fetch a fact of the day. Please try again later.');
        }
    },
};