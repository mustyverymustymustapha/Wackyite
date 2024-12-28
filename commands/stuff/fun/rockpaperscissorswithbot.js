const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
    .setName('rockpaperscissors')
    .setDescription('Play Rock, Paper, Scissors with the bot!')
    .addStringOption(option =>
        option
        .setName('choice')
        .setDescription('Your Turn: Rock, Paper or Scissors.')
        .setRequired(true)
        .addChoices(
            
            { name: 'Rock', value: 'rock' },
            { name: 'Paper', value: 'paper' },
            { name: 'Scissors', value: 'scissors' },
        )),
        async execute(interaction) {
            const userChoice = interaction.options.getString('choice');
            
            const choices = ['rock', 'paper', 'scissors'];
            const botChoice = choices[Math.floor(Math.random() * choices.length)];

            let result;
            if (userChoice === botChoice) {
                result = 'It\'s a tie.';
            } else if (
                (userChoice === 'rock' && botChoice === 'scissors') || (userChoice === 'scissors' && botChoice === 'paper') || (userChoice === 'paper' && botChoice === 'rock')
            ) {
                result = 'You win!!';
            } else {
                result === 'You lose!! ):';
            }
            await interaction.reply(`You picked **${userChoice}** and the bot (me) picked **${botChoice}**. ${result}`);
        },
};