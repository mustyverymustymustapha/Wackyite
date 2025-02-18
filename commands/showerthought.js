const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
    .setName('showerthought')
    .setDescription('Generates a random shower thought.'),

    async execute(interaction) {
        const showerThoughts = [
            "A bed is just a shelf for your body when you're not using it.",
            "Goosebumps are pretty much braille for emotions.",
            "When you clean out a vacuum cleaner, you become a vacuum cleaner.",
            "Mirrors don't break, they just multiply.",
            "Your age is just the number of laps you've made around a ball of fire.",
            "In 100 years, Facebook and Instagram will probably just be digital graveyards.",
            "A watch is just a handcuff for time.",
            "Firetrucks are kind of just water trucks.",
            "Your stomach thinks all potatoes are mashed.",
            "If a fly loses its wings, does it become a walk?",
            "You never realise how much you've touched until you wash your hands.",
            "Clapping is just high-fiving yourself for someone else's achievement.",
            "The word 'bed' actually looks like a bed.",
            "You're closer to being a millionaire than Jeff Bezos is.",
            "When you say 'Forward' or 'Backward', your lips move in that direction.",
            "Why do noses run and feet smell?",
            "A group of squid should be called a squad.",
            "We'll probably never truly know what dinosaurs sounded like.",
            "Your first birthday is technically your second.",
            "The brain named itself.",
            "Every odd number has 'e' in it.",
            "The first guy who discovered milk must have been pretty confused."
        ];

        const waitingMessages = [
            '🚿 Thinking deeply...',
            '🤔 Pondering existence...',
            '💭 Searching for wisdom...',
            '🌌 Wandering the cosmos of thought...'
        ];
        await interaction.reply(waitingMessages[Math.floor(Math.random() * waitingMessages.length)]);

        await new Promise(resolve => setTimeout(resolve, 2000));

        const randomThought = showerThoughts[Math.floor(Math.random() * showerThoughts.length)];
        await interaction.editReply(randomThought);
    },

};