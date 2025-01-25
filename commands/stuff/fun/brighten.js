const { SlashCommandBuilder } = require('@discordjs/builders');
const fetch = require('node-fetch');

module.exports = {
    data: new SlashCommandBuilder()
    .setName('brighten')
    .setDescription('Brightens an avatar.')
    .addUserOption(option =>
        option
        .setName('user')
        .setDescription('The user whose avatar you want to brighten.')
        .setRequired(false)
    )
    .addIntegerOption(option =>
        option
        .setName('brightness')
        .setDescription('The brightness level (e.g 50 for light).')
        .setRequired(false)
    ),

    async execute(interaction) {
        const user = interaction.options.getUser('user') || interaction.user;
        const brightness = interaction.options.getInteger('brightness') || 50;
        const avatarUrl = user.displayAvatarURL({ format: 'png', size: 512 });

        await interaction.reply(`☀ Brightening the avatar of **${user.username}**...`);

        try {
            const response = await fetch(`https://some-random-api.com/canvas/filter/brightness?avatar=${encodeURIComponent(avatarUrl)}&brightness=${brightness}`);
            if (!response.ok) throw new Error('Failed to fetch the brightened avatar.');

            const buffer = await response.buffer();
            await interaction.editReply({
                content: '☀',
                files: [{ attachment: buffer, name: 'brightened-avatar.png' }]
            });
        } catch (error) {
            console.error('Error fetching brightened avatar:', error);
            await interaction.editReply('❌ Something went wrong while fetching the brightened avatar. Please try again later.');
        }
    },
};