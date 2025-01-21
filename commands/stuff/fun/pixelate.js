const { SlashCommandBuilder } = require('@discordjs/builders');
const fetch = require('node-fetch');
const { AttachmentBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
    .setName('pixelate')
    .setDescription('Pixelates a selected avatar.')
    .addUserOption(option =>
        option
        .setName('user')
        .setDescription('Select a user to pixelate the avatar of.')
        .setRequired(false)
    ),

    async execute(interaction) {
        const user = interaction.options.getUser('user') || interaction.user;
        const avatarUrl = user.displayAvatarURL({ format: 'png', size: 512 });

        const waitingMessages = [
            '🔁 Pixelating the avatar...',
            '🌆 Converting to pixels...',
            '🎨 Applying the retro effect...',
            '📷 Preparing your 512 bit masterpiece...',
        ];
        await interaction.reply(waitingMessages[Math.floor(Math.random() * waitingMessages.length)]);

        await new Promise(resolve => setTimeout(resolve, 2000));

        try {
            const response = await fetch(`https://some-random-api.com/canvas/misc/pixelate?avatar=${encodeURIComponent(avatarUrl)}`);
            
            if (!response.ok) throw new Error('Failed to fetch the pixelated avatar.');

            const buffer = await response.buffer();
            
            await interaction.editReply({
                content: `Here's the pixelated avatar of **${user.username}**:`,
                files: [{ attachment: buffer, name: 'pixelated-avatar.png' }]
            });
        } catch (error) {
            console.error('Error fetching pixelated avatar:', error);
            await interaction.editReply('❌ Failed to pixelate the avatar. Please try again later.');
        }
    },
};