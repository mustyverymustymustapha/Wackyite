const { SlashCommandBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
    .setName('minesweeper')
    .setDescription('Play a game of Minesweeper!')
    .addIntegerOption(option =>
        option
        .setName('rows')
        .setDescription('Number of rows for the board (max 8).')
        .setMinValue(2)
        .setMaxValue(8)
        .setRequired(false)
    )
    .addIntegerOption(option =>
        option
        .setName('columns')
        .setDescription('Number of columns for the board (max 8).')
        .setMinValue(2)
        .setMaxValue(8)
        .setRequired(false)
    )
    .addIntegerOption(option =>
        option
        .setName('mines')
        .setDescription('Number of mines on the board.')
        .setMinValue(1)
        .setRequired(false)
    ),

    async execute(interaction) {
        const rows = interaction.options.getInteger('rows') || 5;
        const columns = interaction.options.getInteger('columns') || 5;
        const minesCount = interaction.options.getInteger('mines') || Math.floor((rows * columns) / 5);

        if (minesCount >= rows * columns) {
            return interaction.reply({
                content: '❌ The number of mines cannot exceed or equal the number of cells on the board.',
                ephemeral: true,
            });
        }

        const board = generateBoard(rows, columns, minesCount);
        const hiddenBoard = createHiddenBoard(rows, columns);
        let revealedCells = 0;
        const totalCells = rows * columns - minesCount;

        const components = createBoardButtons(hiddenBoard, rows, columns);

        const message = await interaction.reply({
            content: '💣 **Minesweeper** - Find all the safe cells!',
            components: components,
            fetchReply: true,
        });

        const collector = message.createMessageComponentCollector({
            componentType: 'BUTTON',
            time: 600_000,
        });

        collector.on('collect', async (buttonInteraction) => {
            if (buttonInteraction.user.id !== interaction.user.id) {
                return buttonInteraction.reply({
                    content: '❌ This is not your game!', ephemeral: true 
                });
            }

            const [row, column] = buttonInteraction.customId.split('-').map(Number);
            const cellValue = board[row][column];

            if (cellValue === '💣') {
                collector.stop('lost');
                revealAllMines(hiddenBoard, board);
                await buttonInteraction.update({
                    content: '💥 **You hit a mine! Game over.**',
                    components: createBoardButtons(hiddenBoard, rows, columns),
                });
            } else {
                revealedCells += revealCell(hiddenBoard, board, row, column);

                if (revealedCells === totalCells) {
                    collector.stop('won');
                    revealAllMines(hiddenBoard, board, true);
                    await buttonInteraction.update({
                        content: '🎉 **You win! All safe cells revealed!**',
                        compponents: createBoardButtons(hiddenBoard, rows, columns),
                    });
                } else {
                    await buttonInteraction.update({
                        components: createBoardButtons(hiddenBoard, rows, columns),
                    });
                }
            }
        });

        collector.on('end', async (_, reason) => {
            if (reason !== 'won' && reason !== 'lost') {
                revealAllMines(hiddenBoard, board);
                await interaction.editReply({
                    content: '⏳ **Game over! Time ran out.**',
                    components: createBoardButtons(hiddenBoard, rows, columns),
                });
            }
        });
    },
};

function generateBoard(rows, columns, minesCount) {
    const board = Array.from({ length: rows }, () => Array(columns).fill(0));

    let placedMines = 0;
    while (placedMines < minesCount) {
        const row = Math.floor(Math.random() * rows);
        const column = Math.floor(Math.random() * columns);

        if (board[row][column] === 0) {
            board[row][column] = '💣';
            placedMines++;

            for (let i = -1; i <= 1; i++) {
                for (let j = -1; j <= 1; j++) {
                    if (board[row + i]?.[column + j] !== undefined && board[row + i][column + j] !== '💣') {
                        board[row + i][column + j]++;
                    }
                }
            }
        }
    }

    return board;
}

function createHiddenBoard(rows, columns) {
    return Array.from({ length: rows }, () => Array(columns).fill('⬜'));
}

function revealCell(hiddenBoard, board, row, column) {
    if (hiddenBoard[row]?.[column] !== '⬜' || board[row]?.[column] === undefined) {
        return 0;
    }

    hiddenBoard[row][column] = board[row][column];
    let revealed = 1;

    if (board[row][column] === 0) {
        for (let i = -1; i <= 1; i++) {
            for (let j = -1; j <= 1; j++) {
                revealed += revealCell(hiddenBoard, board, row + i, column + j);
            }
        }
    }

    return revealed;
}

