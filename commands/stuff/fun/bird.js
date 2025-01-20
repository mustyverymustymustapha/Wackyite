const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageAttachment } = require('discord.js');
const fetch = require('node-fetch');

module.exports = {
    data: new SlashCommandBuilder()
    .setName('bird')
    .setDescription('Sends a random bird picture.'),

    async execute(interaction) {
        const loadingMessages = [
            '🔊 Sending out mating calls...',
            '🐦 Flapping wings...',
            '📡 Tracking bird migrations...',
            '🌿 Waiting for a bird to perch...',
        ];
        const initialMessage = loadingMessages[Math.floor(Math.random() * loadingMessages.length)];
        await interaction.reply(initialMessage);

        await new Promise(resolve => setTimeout(resolve, 2000));

        try {
            const response = await fetch('https://some-random-api.com/img/bird');
            const data = await response.json();

            if (!data || !data.link) {
                throw new Error('No bird image found in API response.');
            }

            await interaction.editReply({
                content: '🐤 Here is a bird for you:',
                files: [data.link],
            });
        } catch (error) {
            console.error('Error fetching bird image:', error);
            await interaction.editReply('❌ Failed to fetch a bird image. Please try again later.');
        }
    }
};