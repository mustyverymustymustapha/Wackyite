const { SlashCommandBuilder } = require('discord.js');
const axios = require('axios');

module.exports = {
    data: new SlashCommandBuilder()
    .setName('doggif')
    .setDescription('Get a random dog GIF!'),
    async execute(interaction) {
        const searchingMessages = [
            "Looking for a good boy or girl...",
            "Sniffing around for a dog GIF...",
            "Finding the cutest dog just for you...",
            "Chasing tails to find a GIF..."
        ];

        const fetchedMessages = [
            "Got it! Here's your dog GIF:",
            "Found a pawsome GIF just for you:",
            "Here you go! A random dog GIF:",
            "All fetched! Enjoy this dog GIF:"
        ];

        try {
            const searchingMessage = await interaction.reply({ content: searchingMessages[Math.floor(Math.random() * searchingMessages.length)],
                fetchReply: true
            });

            const response = await axios.get('https://dog.ceo/api/breeds/image/random');

            if (response.data && response.data.message) {
                const dogGifUrl = response.data.message;

                await searchingMessage.edit({ content: `${fetchedMessages[Math.floor(Math.random() * fetchedMessages.length)]} ${dogGifUrl}`, });
            } else {
                await searchingMessage.edit({
                    content: 'Sorry! I couldn\'t fetch a dog GIF. Please try again later!',
                });
            }
        } catch (error) {
            console.error('Error fetching dog GIF:', error);
            await interaction.reply({
                content: 'Oops! Something went wrong while fetching a dog GIF.',
            });
        }
    },
};