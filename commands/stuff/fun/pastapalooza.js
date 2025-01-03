const { SlashCommandBuilder } = require('discord.js');

const pastaShapes = [
    "Spaghetti 🍝",
    "Penne 🍜",
    "Linguine 🍴",
    "Macaroni 🧀",
    "Ravioli 🥟",
    "Tortellini 🥗"
];

module.exports = {
    data: new SlashCommandBuilder()
    .setName('pastapalooza')
    .setDescription('Suggests a random pasta shape for your next meal.'),
    async execute(interaction) {
        await interaction.reply('🤔 Consulting the pasta oracle...');
        const randomPasta = pastaShapes[Math.floor(Math.random() * pastaShapes.length)];

        setTimeout(async () => {
            await interaction.editReply(`Dinner suggestion: How about some **${randomPasta}**?`);
        }, 2000);
    },
};