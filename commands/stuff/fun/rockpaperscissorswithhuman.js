const { SlashCommandBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');

const activeGames = new Map();

module.exports = {
    data: new SlashCommandBuilder()
    .setName('rockpaperscissorshuman')
    .setDescription('Play Rock, Paper, Scissors with another server member!')
    .addUserOption(option =>
        option
        .setName('opponent')
        .setDescription('Mention the person you want to challenge (no bots!)')
        .setRequired(true))
        .addStringOption(option =>
            option
            .setName('choice')
            .setDescription('Your turn: either Rock, Paper or Scissors')
            .setRequired(true)
        .addChoices(
            { name : 'Rock', value: 'rock' },
            { name : 'Scissors', value: 'scissors' },
            { name : 'Paper', value : 'paper' },
        )),
        async execute(interaction) {
            const challenger = interaction.user;
            const challengerChoice = interaction.options.getString('choice');
            const opponent = interaction.options.getUser('opponent');

            if (opponent.bot) {
                return interaction.reply({ content: 'You cannot challenge a bot!', ephemeral: true });
            }
            if (challenger.id === opponent.id) {
                return interaction.reply({ content: 'You cannot challenge yourself!', ephemeral: true });
            }

            if(activeGames.has(opponent.id)) {
                return interaction.reply({ content: `This user (${opponent.username}) is already in a game. Please wait!`, ephemeral : true });
            }

            activeGames.set(challenger.id, { opponent: opponent.id, challengerChoice });
            activeGames.set(opponent.id, { challenger: challenger.id });

            const row = new ActionRowBuilder().addComponents(
                new ButtonBuilder().setCustomId('rock').setLabel('Rock').setStyle(ButtonStyle.Primary),
                new ButtonBuilder().setCustomId('paper').setLabel('Paper').setStyle(ButtonStyle.Primary),
                new ButtonBuilder().setCustomId('scissors').setLabel('Scissors').setStyle(ButtonStyle.Primary)
            );

            await interaction.reply({
                content: `${challenger.username} has chosen their move and challenged ${opponent.username}! ${opponent.username}, click one of the buttons below to respond.`,
                components: [row],
            });

            const filter = i => i.user.id === opponent.id && ['rock', 'paper', 'scissors'].includes(i.customId);
            const collector = interaction.channel.createMessageComponentCollector({ filter, time: 20000 });

            collector.on('collect', async i => {
                const opponentChoice = i.customId;
                collector.stop();

                const result = determineWinner(challengerChoice, opponentChoice);

                await i.update({
                    content: `*Game Results:*\n - ${challenger.username} chose **${challengerChoice}**\n - ${opponent.username} chose **${opponentChoice}**\n - ${result}`,
                    components: [],
                }); 

                activeGames.delete(challenger.id);
                activeGames.delete(opponent.id);
            });

            collector.on('end', (_, reason) => {
                if (reason === 'time') {
                    interaction.editReply({
                        content: `The game between ${challenger.username} and ${opponent.username} has been cancelled due to no response.`,
                        components: [],
                    });
                    activeGames.delete(challenger.id);
                    activeGames.delete(opponent.id);
                }
            });
        },
};

function determineWinner(challengerChoice, opponentChoice) {
    if (challengerChoice === opponentChoice) {
        return 'It\'s a tie!';
    }
    if (
        (challengerChoice === 'rock' && opponentChoice === 'scissors') || (challengerChoice === 'paper' && opponentChoice === 'rock') || (challengerChoice === 'scissors' && opponentChoice === 'paper')
    ) {
        return "The challenger wins!";
    }
        return "The opponent wins!";
    }