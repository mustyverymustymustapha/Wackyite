const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageAttachment } = require('discord.js');
const fetch = require('node-fetch');

module.exports = {
    data: new SlashCommandBuilder()

    .setName('tweet')
    .setDescription('Generates a fake tweet image based on user input')
    .addStringOption(option =>
        option
        .setName('displayname')
        .setDescription('Display name for the tweet')
        .setRequired(true)
    )

    .addStringOption(option =>
        option
        .setName('username')
        .setDescription('Username for the tweet')
        .setRequired(true)
    )

    .addStringOption(option =>
        option
        .setName('comment')
        .setDescription('The tweet content')
        .setRequired(true)
    )

    .addStringOption(option =>
        option
        .setName('avatar')
        .setDescription('Avatar URL for the tweet')
        .setRequired(true)
    )

    .addStringOption(option =>
        option
        .setName('replies')
        .setDescription('Number of Replies')
        .setRequired(false)
    )

    .addStringOption(option =>
        option
        .setName('retweets')
        .setDescription('Number of retweets')
        .setRequired(false)
    )

    .addStringOption(option =>
        option
        .setName('theme')
        .setDescription('Theme for the tweet image (light/dark)')
        .setRequired(false)
    ),

    async execute(interaction) {
        const displayname = interaction.options.getString('displayname');
        const username = interaction.options.getString('username');
        const comment = interaction.options.getString('comment');
        const avatar = interaction.options.getString('avatar');
        const replies = interaction.options.getString('replies') || '';
        const retweets = interaction.options.getString('retweets') || '';
        const theme = interaction.options.getString('theme') || '';

        const url = new URL('https://some-random-api.com/canvas/misc/tweet');
        url.searchParams.append('displayname', displayname);
        url.searchParams.append('username', username);
        url.searchParams.append('avatar', avatar);
        url.searchParams.appeand('comment', comment);

        if (replies) url.searchParams.append('replies', replies);
        if (retweets) url.searchParams.append('retweets', retweets);
        if (theme) url.searchParams.append('theme', theme);

        try {
            const response = await fetch(url);
            const buffer = await response.buffer();

            const attachment = new MessageAttachment(buffer, 'tweet.png');
            await interaction.reply({ files: [attachment] });
        } catch (error) {
            console.error('Error fetching tweet image:', error);
            await interaction.reply('There was an error generating the tweet image. Please try again later.');
        }
    }
};