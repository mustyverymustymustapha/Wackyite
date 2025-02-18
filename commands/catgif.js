const { SlashCommandBuilder } = require('discord.js');
const axios = require('axios');

module.exports = {
    data: new SlashCommandBuilder()
    .setName('catgif')
    .setDescription('Get a random cat GIF!!'),
    async execute(interaction) {
        const searchingMessages = [
            "Searching far and wide for a cat...",
            "Looking for a cute cat just for you...",
            "Finding the best cat GIF...",
            "Hunting for the purrfect cat GIF..."
        ];

        const fetchedMessages = [
            "Fetched! Here's your cat GIF:",
            "Done! Take a look at this cat GIF:",
            "Here it is! A cat GIF just for you:",
            "Found it! Your random cat GIF:"
        ];

        try {
            const searchingMessage = await interaction.reply({ content: searchingMessages[Math.floor(Math.random() * searchingMessages.length )],
                fetchReply: true
            });

            const response = await axios.get('https://api.thecatapi.com/v1/images/search?mime_types=gif');

            if (response.data && response.data.length > 0) {
                const catGifURL = response.data[0].url;

                await searchingMessage.edit({
                    content: `${fetchedMessages[Math.floor(Math.random() * fetchedMessages.length)]} ${catGifUrl}`,
                });
            } else {
                await searchingMessage.edit({ content: 'Sorry, I could not fetch a cat GIF. Please try again later!',

                });
            }
        } catch (error) {
            console.error('Error fetching cat GIF:', error);
            await interaction.reply({
                content: 'Oops! Something went wrong while fetching a cat GIF.',
            });
        }
    },
};