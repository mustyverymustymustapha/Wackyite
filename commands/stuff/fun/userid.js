const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
    .setName('userid')
    .setDescription('Get the user ID of a selected user.')
    .addUserOption(option =>
        option
        .setName('user')
        .setDescription('Select a user to get the ID of')
        .setRequired(true)
    ),

    async execute(interaction) {
        const user = interaction.options.getUser('user');

        await interaction.reply(`🆔 **${user.username}**'s user ID is: \`${user.id}\``);
    }
};