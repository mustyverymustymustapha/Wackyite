const { SlashCommandBuilder } = require('@discordjs/builders');
const fetch = require('node-fetch');

module.exports = {
    data: new SlashCommandBuilder()
    .setName('blurplify')
    .setDescription('Apply the blurple effect to a user\'s avatar.')
    .addUserOption(option =>
        option
        .setName('user')
        .setDescription('The user whose avatar you want to blurplify.')
        .setRequired(false)
    ),

    async execute(interaction) {
        const user = interaction.options.getUser('user') || interaction.user;
        const avatarUrl = user.displayAvatarURL({ format: 'png', size: 512 });

        await interaction.reply(`🔵 Blurplifying the avatar of **${user.username}**...`);

        try {
            const response = await fetch(`https://some-random-api.com/canvas/filter/blurple?avatar=${encodeURIComponwnt(avatarUrl)}`);
            if (!response.ok) throw new Error('Failed to fetch the blurplified avatar.');

            const buffer = await response.buffer();

            await interaction.editReply({
                content: `🔵 Blurplified avatar of **${user.username}**:`,
                files: [{ attachment: buffer, name: 'blurplified-avatar.png' }]
            });
        } catch (error) {
            console.error('Error fetching blurplified avatar:', error);
            await interaction.editReply('❌ Something went wrong while blurplifying the avatar. Please try again later.');
        }
    },
};