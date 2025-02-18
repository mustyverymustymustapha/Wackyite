const { SlashCommandBuilder } = require('@discordjs/builders');
const { EmbedBuilder, PermissionFlagsBits } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
    .setName('altcheck')
    .setDescription('Checks if a user is a likely alternate account.')
    .addUserOption(option =>
        option
        .setName('user')
        .setDescription('Select a user to check.')
        .setRequired(true)
    )
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageGuild),

    async execute(interaction) {
        const user = interaction.options.getUser('user');
        const member = interaction.guild.members.cache.get(user.id);

        const now = new Date();
        const accountCreatedAt = user.createdAt;
        const accountAge = Math.floor((now - accountCreatedAt) / (1000 * 60 * 60 * 24));

        const isAlt = accountAge < 14;

        const embed = new EmbedBuilder()
        .setTitle('🔍 Alt Account Check')
        .setThumbnail(user.displayAvatarURL({ dynamic: true }))
        .addFields(
            { name: 'Username', value: `${user.tag}`, inline: true },
            { name: 'User ID', value: `${user.id}`, inline: true },
            { name: 'Account Created', value: `<t:${Math.floor(accountCreatedAt / 1000)}:R>`, inline: true },
            { name: 'Account Age', value: `${accountAge} days`, inline: true },
            { name: 'Bot Account', value: user.bot ? '✅ Yes' : '❌ No', inline: true },
            { name: 'Potential Alt', value: isAlt ? '⚠ **Yes** (Account is less than 14 days old)' : '✅ No', inline: true }
        )
        .setFooter({
            text: `Requested by ${interaction.user.tag}`,
            iconURL: interaction.user.displayAvatarURL({ dynamic: true }),
        })
        .setColor(isAlt ? 0xffcc00 : 0x00ff00)
        .setTimestamp();

        await interaction.reply({ embeds: [embed] });
    },
};