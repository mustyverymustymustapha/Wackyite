const { SlashCommandBuilder } = require('@discordjs/builders');
const fetch = require('node-fetch');

module.exports = {
    data: new SlashCommandBuilder()
    .setName('facepalm')
    .setDescription('Sends a facepalm image.'),

    async execute(interaction) {
        const waitingMessages = [
            '🤦‍♂️ Sending disappointment...',
            '🔍 Searching for your facepalm...',
            '⚡ Charging up a facepalm...',
            '😐🤲 Connecting a hand and forehead'
        ];
        await interaction.reply(waitingMessages[Math.floor(Math.random() * waitingMessages.length)]);

        await new Promise(resolve => setTimeout(resolve, 1000));

        try {
            const response = await fetch('https://some-random-api.com/img/facepalm');
            const data = await response.json();

            await interaction.editReply({ content: '🤦‍♂️', files: [data.link] });
        } catch (error) {
            console.error('Error fetching facepalm image:', error);
            await interaction.editReply('❌ Something went wrong! Please try again later.');
        }
    },
};