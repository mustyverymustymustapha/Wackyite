const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageAttachment } = require('discord.js');
const fetch = require('node-fetch');

module.exports = {
    data: new SlashCommandBuilder()
    .setName('youtubecomment')
    .setDescription('Generates a fake YouTube comment image based on user input')
    .addStringOption(option =>
        option
        .setName('username')
        .setDescription('The username for the YouTube comment')
        .setRequired(true)
    )

    .addStringOption(option =>
        option
        .setName('avatar')
        .setDescription('Avatar URL for the YouTube comment')
        .setRequired(true)
    )

    .addStringOption(option =>
        option
        .setName('comment')
        .setDescription('The comment content')
        .setRequired(true)
    ),

    async execute(interaction) {
        const username = interaction.options.getString('username');
        const avatar = interaction.options.getString('avatar');
        const comment = interaction.options.getString('comment');

        const url = new URL('https://some-random-api.com/canvas/misc/youtube-comment');
        url.searchParams.append('username', username);
        url.searchParams.append('avatar', avatar);
        url.searchParams.append('comment', comment);

        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`API responded with ${response.status}`);
            }

            const buffer = await response.buffer();
            const attachment = new MessageAttachment(buffer, 'youtube-comment.png');

            await interaction.reply({ files: [attachment] });
        } catch (error) {
            console.error('Error generating YouTube comment image:', error);
            await interaction.reply('There was an error generating the YouTube comment image. Please try again later.');
        }
    }
};