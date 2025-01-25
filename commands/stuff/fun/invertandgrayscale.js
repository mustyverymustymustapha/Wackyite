const { SlashCommandBuilder } = require('@discordjs/builders');
const fetch = require('node-fetch');

module.exports = {
    data: new SlashCommandBuilder()
    .setName('invertandgrayscale')
    .setDescription('Applies an invert and grayscale filter to an avatar.')
    .addUserOption(option =>
        option
        .setName('user')
        .setDescription('The user whose avatar you want to modify.')
        .setRequired(false)
    ),

    async execute(interaction) {
        const user = interaction.options.getUser('user') || interaction.user;
        const avatarUrl = user.displayAvatarURL({ format: 'png', size: 512 });

        await interaction.reply(`🎨 Applying invert and grayscale filters to **${user.username}**'s avatar...`);

        try {
            const response = await fetch(`https://some-random-api.com/canvas/filter/invertgreyscale?avatar=${encodeURIComponent(avatarUrl)}`);
            if (!response.ok) throw new Error('Failed to fetch the modifird avatar.');

            const buffer = await response.buffer();

            await interaction.editReply({
                content: '🔲',
                files: [{ attachment: buffer, name: 'invert-grayscale-avatar.png' }]
            });
        }catch (error) {
            console.error('Error fetching modified avatar:', error);
            await interaction.editReply('❌ Something went wrong while applying filters. Please try again later.');
        }
    },
};