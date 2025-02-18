const { SlashCommandBuilder } = require('@discordjs/builders');
const fetch = require('node-fetch');

module.exports = {
    data: new SlashCommandBuilder()
    .setName('greenify')
    .setDescription('Applies a green filter to an avatar.')
    .addUserOption(option =>
        option
        .setName('user')
        .setDescription('The user whose avatar you want to greenify.')
        .setRequired(false)
    ),

    async execute(interaction) {
        const user = interaction.options.getUser('user') || interaction.user;
        const avatarUrl = user.displayAvatarURL({ format: 'png', size: 512 });

        await interaction.reply(`💚 Greenifying the avatar of ${user.username}...`);

        try {
            const response = await fetch(`https://some-random-api.com/canvas/filter/green?avatar=${encodeURIComponent(avatarUrl)}`);
            if (!response.ok) throw new Error('Failed to fetch new avatar.');

            const buffer = await response.buffer();
            await interaction.editReply({
                content: '✅',
                files: [{ attachment: buffer, name: 'greenified-avatar.png' }]
            });
        } catch (error) {
            console.error('Error fetching greenified avatar:', error);
            await interaction.editReply('❌ Something went wrong while greenifying the avatar. Please try again later.');
        }
    },
};