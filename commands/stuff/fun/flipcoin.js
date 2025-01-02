const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
    .setName('flipcoin')
    .setDescription('Flip a coin and see the result!'),
    async execute(interaction) {
        const flippingMessages = [
            "Flipping the coin...",
            "Let's see what it lands on...",
            "The coin is in the air...",
            "Hold tight, the coin is flipping..."
        ];
        const flipping = flippingMessages[Math.floor(Math.random() * flippingMessages.length)];

        await interaction.reply(flipping);

        const outcomes = [
            { emoji: "🪙 Heads!", text: "Heads!"},
            { emoji: "🪙 Tails!", text: "Tails!"}
        ];
        const outcome = outcomes[Math.floor(Math.random() * outcomes.length)];

        setTimeout(() => {
            interaction.editReply(`${outcome.emoji} It landed on ${outcome.text}`);
        }, 2000);
    },
};