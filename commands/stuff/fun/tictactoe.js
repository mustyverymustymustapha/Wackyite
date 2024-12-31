const { SlashCommandBuilder } = require('discord.js');
const { ButtonBuilder, ButtonStyle, ActionRowBuilder, EmbedBuilder } = require('discord.js');

const EMPTY_CELL = '⬜';
const PLAYER_MARK = '❌';
const BOT_MARK = '⭕';

module.exports = {
    data: new SlashCommandBuilder()
    .setName('tictactoe')
    .setDescription('Play Tic Tac Toe against the bot!'),

    async execute(interaction) {
        let gameBoard = Array(9).fill(EMPTY_CELL);
        let gameFinished = false;

        const generateButtons = (gameBoard, isDisabled = false) => {
            const buttonRows = [];
            for (let rowIndex = 0; rowIndex < 3; rowIndex++) {
                const row = new ActionRowBuilder();
                for (let colIndex = 0; colIndex < 3; colIndex++) {
                    const cellIndex = rowIndex * 3 + colIndex;
                    const button = new ButtonBuilder()
                    .setCustomId(`cell_${cellIndex}`)
                    .setLabel(gameBoard[cellIndex])
                    .setStyle(ButtonStyle.Secondary)
                    .setDisabled(isDisabled || gameBoard[cellIndex] !== EMPTY_CELL);
                    row.addComponents(button);
                }
                buttonRows.push(row);
            }
            return buttonRows;
        };

        const determineWinner = (gameBoard) => {
            const winningPatterns = [
                [0, 1, 2], [3, 4, 5], [6, 7, 8],
                [0, 3, 6], [1, 4, 7], [2, 5, 8],
                [0, 4, 8], [2, 4, 6]
            ];

            for (const pattern of winningPatterns) {
                const [a, b, c] = pattern;
                if (gameBoard[a] !== EMPTY_CELL && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c]) {
                    return gameBoard[a];
                }
            }
            return gameBoard.includes(EMPTY_CELL) ? null: 'tie';
        };

        const minimax = (gameBoard, depth, isMaximizingPlayer) => {
            const winner = determineWinner(gameBoard);
            if (winner === 'tie') return 0;
            if (winner === BOT_MARK) return 10 - depth;
            if (winner === PLAYER_MARK) return depth - 10;

            if (isMaximizingPlayer) {
                let bestScore = -Infinity;
                for (let i = 0; i < 9; i++) {
                    if (gameBoard[i] === EMPTY_CELL) {
                        gameBoard[i] = BOT_MARK;
                        const score = minimax(gameBoard, depth + 1, false);
                        gameBoard[i] = EMPTY_CELL;
                        bestScore = Math.max(score, bestScore);
                    }
                }
                return bestScore;
            } else {
                let bestScore = Infinity;
                for (let i = 0; i < 9; i++) {
                    if (gameBoard[i] === EMPTY_CELL) {
                        gameBoard[i] = PLAYER_MARK;
                        const score = minimax(gameBoard, depth + 1, true);
                        gameBoard[i] = EMPTY_CELL;
                        bestScore = Math.min(score, bestScore);
                    }
                }
                return bestScore;
            }
        };

        const getBestBotMove = (gameBoard) => {
            let bestScore = -Infinity;
            let bestMove = null;

            for (let i = 0; i < 9; i++) {
                if (gameBoard[i] === EMPTY_CELL) {
                    gameBoard[i] = BOT_MARK;
                    const score = minimax(gameBoard, 0, false);
                    gameBoard[i] = EMPTY_CELL;

                    if (score > bestScore) {
                        bestScore = score;
                        bestMove = i;
                    }
                }
            }
            return bestMove;
        };

        const gameEmbed = new EmbedBuilder()
        .setTitle('Tic Tac Toe')
        .setDescription(`${interaction.user.username} vs Bot\nYour turn! (${PLAYER_MARK})`)
        .setColor('#00ff00');

        const message = await interaction.reply({
            embeds: [gameEmbed],
            components: generateButtons(gameBoard),
            fetchReply: true
        });

        const collector = message.createMessageComponentCollector({
            filter: i => i.user.id === interaction.user.id,
            time: 300000
        });

        collector.on('collect', async i => {
            if (gameFinished) return;

            const cellIndex = parseInt(i.customId.split('_')[1]);
            gameBoard[cellIndex] = PLAYER_MARK;

            let winner = determineWinner(gameBoard);
            if (winner) {
                gameFinished = true;
                const resultMessage = winner === 'tie' ? 'Game Over - It\'s a tie!' : `Game Over - ${winner === PLAYER_MARK ? 'You win!' : 'Bot Wins!'}`;

                gameEmbed.setDescription(resultMessage);
                await i.update({
                    embeds: [gameEmbed],
                    components: generateButtons(gameBoard, true)
                });
                return;
            }

            const botMove = getBestBotMove(gameBoard);
            gameBoard[botMove] = BOT_MARK;

            winner = determineWinner(gameBoard);
            if (winner) {
                gameFinished = true;
                const resultMessage = winner === 'tie' ? 'Game Over - It\'s a tie!' : `Game Over - ${winner === PLAYER_MARK ? `You win!` : 'Bot Wins!'}`;

                gameEmbed.setDescription(resultMessage);
                await i.update({
                    embeds: [gameEmbed],
                    components: generateButtons(gameBoard, true)
                });
                return;
            }

            gameEmbed.setDescription(`${interaction.user.username} vs Bot\nYour turn! (${PLAYER_MARK})`);
            await i.update({
                embeds: [gameEmbed],
                components: generateButtons(gameBoard)
            });
        });

        collector.on('end', () => {
            if (!gameFinished) {
                gameEmbed.setDescription('Game ended due to inactivity!');
                interaction.editReply({
                    embeds: [gameEmbed],
                    components: generateButtons(gameBoard, true)
                });
            }
        });
    }
};