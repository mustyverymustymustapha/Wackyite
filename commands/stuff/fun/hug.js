const { SlashCommandBuilder } = require('@discordjs/builders');
const fetch = require('node-fetch');

module.exports = {
    data: new SlashCommandBuilder()
    .setName('hug')
    .setDescription('Sends a hug image.'),

    async execute(interaction) {
        const waitingMessages = [
            '🤗 Sending affection...',
            '💖 Preparing for a warm hug...',
            '🌸 Searching for the perfect hug...',
            '💌 Wrapping up a virtual hug...'
        ];
        await interaction.reply(waitingMessages[Math.floor(Math.random() * waitingMessages.length)]);

        await new Promise(resolve => setTimeout(resolve, 2000));

        try {
            const response = await fetch('https://some-random-api.com/img/hug');
            const data = await response.json();

            await interaction.editReply({ content: '🤗', files: [data.link] });
        } catch (error) {
            console.error('Error fetching hug image:', error);
            await interaction.editReply('❌ Something went wrong! Please try again later.');
        }
    },
};