const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
    .setName('diceroll')
    .setDescription('Roll a dice of your choice!')
    .addIntegerOption(option =>
        option
        .setName('sides')
        .setDescription('The number of sides on the dice (the default is 6, max is 150)')
        .setRequired(false)
    )
    .addIntegerOption(option =>
        option
        .setName('rolls')
        .setDescription('The number of times to roll the dice (default is 1, max is 100)')
        .setRequired(false)
    ),
    async execute(interaction) {
        const sides = interaction.options.getInteger('sides') || 6;
        const rolls = interaction.options.getInteger('rolls') || 1;

        if (sides < 2 || sides > 150) {
            return interaction.reply({ content: 'The dice needs to have between 2 and 150 sides!', ephemeral: true });
        }
        if (rolls < 1 || rolls > 100) {
            return interaction.reply({ content: 'You can only roll the dice between 1 and 100 times!', ephemeral: true });
        }

        const results = [];
        for (let i = 0; i < rolls; i++) {
            const roll = Math.floor(Math.random() * sides) + 1;
            results.push(roll);
        }

        const resultMessage = `🎲 You rolled a D${sides} ${rolls} time${rolls > 1 ? 's' : ''}: **${results.join(', ')}**`;

        interaction.reply(resultMessage);
    },
};