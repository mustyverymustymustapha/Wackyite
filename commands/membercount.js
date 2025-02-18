const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
    .setName('membercount')
    .setDescription('Displays the total number of members, humans, and bots in a server.'),
    async execute(interaction) {
        const members = await interaction.guild.members.fetch();

        const humanMembers = members.filter(member => !member.user.bot).size;
        const botMembers = members.filter(member => member.user.bot).size;

        const totalMembers = members.size;

        await interaction.reply(`**Total Members:** ${totalMembers}\n🤖 **Bots:** ${botMembers}\n🧑 **Humans:** ${humanMembers}`);
    },
};