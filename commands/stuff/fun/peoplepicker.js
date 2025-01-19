const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
    .setName('peoplepicker')
    .setDescription('Randomly picks a person from the server or a list of mentioned users.')
    .addUserOption(option =>
        option
        .setName('user1')
        .setDescription('Mention a user to include in the selection.')
        .setRequired(false)
    )

    .addUserOption(option =>
        option
        .setName('user2')
        .setDescription('Mention a user to include in the selection.')
        .setRequired(false)
    )

    .addUserOption(option =>
        option
        .setName('user3')
        .setDescription('Mention a user to include in the selection.')
        .setRequired(false)
    )

    .addUserOption(option =>
        option
        .setName('user4')
        .setDescription('Mention a user to include in the selection.')
        .setRequired(false)
    )

    .addUserOption(option =>
        option
        .setName('user5')
        .setDescription('Mention a user to include in the selection.')
        .setRequired(false)
    ),

    async execute(interaction) {
        const mentionedUsers = [];
        for (let i = 1; i <= 5; i++) {
            const user = interaction.options.getUser(`user${i}`);
            if (user) mentionedUsers.push(user);
        }

        const choosingMessages = [
            '⚙ Finding the chosen one...',
            '🤔 Let me think...',
            '✨ Calculating fate...',
            '🔁 Spinning the wheel...',
            '🔍 Searching for destiny...'
        ];
        await interaction.reply(choosingMessages[Math.floor(Math.random() * choosingMessages.length)]);

        await new Promise(resolve => setTimeout(resolve, 3000));

        if (mentionedUsers.length > 0) {
            const randomUser = mentionedUsers[Math.floor(Math.random() * mentionedUsers.length)];
            await interaction.editReply(`🎊 The randomly picked user is: **${randomUser.username}**!`);
        } else {
            const members = await interaction.guild.members.fetch();
            const randomMember = members.random();
            await interaction.editReply(`🎊 The randomly picked user is: **${randomMember.user.username}**!`);
        }
    }
};

// Idea by @koeg