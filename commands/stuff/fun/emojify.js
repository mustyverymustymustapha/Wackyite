const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
    .setName('emojify')
    .setDescription('Turn your text into emojis!')
    .addStringOption(option =>
        option
        .setName('text')
        .setDescription('The text to turn into emojis.')
        .setRequired(true)
    ),

    async execute(interaction) {
        await interaction.reply('🔁 Processing...');
        const inputText = interaction.options.getString('text');
        const emojifiedText = inputText.toLowercase().split('').map(char => {
            if (/[a-z]/.test(char)) return `:regional_indicator_${char}:`;
            if (/[0-9]/.test(char)) return `:${["zero", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine"][+char]}:`;
            return char;
        })
        .join(' ');

        setTimeout(async () => {
            await interaction.editReply(emojifiedText);
        }, 2000);
    },
};