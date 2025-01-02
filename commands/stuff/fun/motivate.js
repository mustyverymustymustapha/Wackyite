const { SlashCommandBuilder } = require('discord.js');
const axios = require('axios');

module.exports = {
    data: new SlashCommandBuilder()
    .setName('motivate')
    .setDescription('Get a random motivational quote to boost your day!'),
    async execute(interaction) {
        await interaction.reply('Fetching a motivational quote...');

        try {
            const response = await axios.get('https://zenquotes.io/api/random');
            const quote = response.data[0].q;

            await interaction.editReply(`💡 **Motivational quote:**\n"${quote}"`);
        } catch (error) {
            console.error('Error fetching quote:', error);
            await interaction.editReply('Oops! Could not fetch a quote at the moment.');
        }
    },
};