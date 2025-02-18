const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
    .setName('rickroll')
    .setDescription('Sends something funny...'),

    async execute(interaction) {
        const rickRollLink = '[Click here!](https://www.youtube.com/watch?v=dQw4w9WgXcQ)';
        await interaction.reply({
            content: rickRollLink,
            ephemeral: false
        });
    },
};