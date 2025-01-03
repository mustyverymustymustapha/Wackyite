const { SlashCommandBuilder } = require('discord.js');

const vibeCategories = {
    positive: {
        tone: "Super Positive ✨",
        keywords: ["great", "amazing", "awesome", "happy", "joy", "love", "fantastic", "wonderful", "yay", "good"],
    },
    negative: {
        tone: "Dramatic 🎭",
        keywords: ["sad", "bad", "hate", "angry", "mad", "terrible", "awful", "horrible", "cry", "pain"],
    },
    funny: {
        tone: "Hilarious 😂",
        keywords: ["lol", "haha", "funny", "joke", "lmao", "rofl", "meme", "comedy"],
    },
    mysterious: {
        tone: "Mysterious 🕵️‍♀️",
        keywords: ["secret", "mystery", "hidden", "unknown", "cryptic", "shadow", "clue", "unsolved"],
    },
    chaotic: {
        tone: "Chaotic 🔥",
        keywords: ["chaos", "wild", "crazy", "insane", "explosion", "destruction", "mess", "anarchy"],
    },
};

const fallbackTones = [
    "Chill 🌊",
    "Suspicious 🤔",
    "Extremely Serious 😐",
    "Meme-worthy 🤡"
];

module.exports = {
    data: new SlashCommandBuilder()
    .setName('detectvibes')
    .setDescription('Analyse and return detected vibes in a message.')
    .addStringOption(option =>
        option
        .setName('text')
        .setDescription('The text to analyse.')
        .setRequired(true)
    ),

    async execute(interaction) {
        await interaction.reply('📡 Detecting vibes...');

        const inputText = interaction.options.getString('text').toLowerCase();
        const keywordCounts = {};

        for (const [category, data] of Object.entries(vibeCategories)) {
            keywordCounts[category] = data.keywords.reduce(
                (count, keyword) => count + (inputText.includes(keyword) ? 1 : 0),
                0
            );
        }

        const maxKeywords = Math.max(...Object.values(keywordCounts));
        const matchedCategories = Object.keys(keywordCounts).filter(
            category => keywordCounts[category] === maxKeywords && maxKeywords > 0
        );

        let detectedTone;
        if (matchedCategories.length === 1) {
            detectedTone = vibeCategories[matchedCategories[0]].tone;
        } else if (matchedCategories.length > 1) {
            const randomCategory = matchedCategories[Math.floor(Math.random() * matchedCategories.length)];
            detectedTone = vibeCategories[randomCategory].tone;
        } else {
            detectedTone = fallBackTones[Math.floor(Math.random() * fallbackTones.length)];
            detectedTone += " (that was a guess since I couldn't detect your tone!)";
        }

        setTimeout(async () => {
            await interaction.editReply(`📡 Analysing vibes for: "${inputText}"... Detected vibe: **${detectedTone}**`);
        }, 2000);
    },
};