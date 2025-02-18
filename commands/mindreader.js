const { SlashCommandBuilder } = require('discord.js');

const guesses = [
    "You are wondering why this bot is so good :) 🤖",
    "Hmm... Netflix? 📺",
    "You are imagining a tropical vacation ⛱",
    "Pondering the mysteries of life, huh? 🌌",
    "You're daydreaming something enjoyable.. 🌈",
    "Just chilling with no thoughts, right? 🧘‍♀️",
    "Food, huh? 🍔",
    "Remembering memories I see... 📷",
    "Memes, wow! 😅"
];

module.exports = {
    data: new SlashCommandBuilder()
    .setName('mindreader')
    .setDescription('I\'ll try to guess what you are thinking!'),
    async execute(interaction) {
        await interaction.reply('🔮 Reading your mind...');
        const randomGuess = guesses[Math.floor(Math.random() * guesses.length)];

        setTimeout(async () => {
            await interaction.editReply(`🔮 I tried reading your mind... ${randomGuess}!`);
        }, 2000);
    },
};