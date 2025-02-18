const { SlashCommandBuilder } = require('discord.js');

// The below jokes are AI jokes
const roasts = {
    "general": [
        "You're like a cloud. When you disappear, it's a beautiful day.",
        "If I had a face like yours, I'd sue my parents.",
        "You're proof that even the best of us can have an off day.",
        "Your secrets are safe with me. I never even listen when you tell me them.",
        "I'd agree with everything you say, but then I'd always be wrong.",
        "You bring so much joy! (when you leave the room).",
        "You're not stupid; you just have bad luck thinking.",
        "Your mind is like a web browser. 19 tabs are open, 3 are frozen and you have no more memory.",
        "You're like a software update - whenever I see you, I think 'Not Now!'.",
        "I am jealous of everyone who hasn't met you."
    ],
    "appearance": [
        "Is that your face or is your neck blowing a bubble?",
        "You have the perfect face to be a radio host.",
        "You look like a before picture in a before-and-after transition.",
        "You look like you were drawn with someone's non-dominant hand.",
        "You're proof not everyone grows out of their awkward phase.",
        "You're proof that Photoshop can only do so much.",
        "You look like you're practicing for mugshots 24/7.",
        "Your hairline and horizon have one thing in common - they're both receding.",
        "You look like a wet painting.",
        "Are you going for that just woke up look or what?"
    ],
    "intelligence": [
        "You aren't stupid, your brain is just a little underachieving.",
        "I've seen more logic used in a fortune cookie.",
        "You bring a new meaning to the phrase 'dumb as a rock'.",
        "Your intellignce makes it seem like you're running on a 2002 dial-up connection.",
        "Your brain's like a computer... running Windows 95.",
        "If ignorance is bliss, you must be estatic.",
        "Thinking isn't your strong suit, is it?",
        "You would fail an open-book test.",
        "You'd lose at chess to a 4-year-old.",
        "Even autocorrect can't help you."
    ],
    "social":[
        "You'd be more approachable if you didn't talk.",
        "Your personality is like a brick-wall, but less interesting.",
        "You're the reason people take fake phone calls.",
        "Even small talk avoids you.",
        "You bring people together, mostly to talk about how weird you are.",
        "Your invites get lost on purpose.",
        "You're the human equivalent of a missed high-five.",
        "People smile at you out of sympathy.",
        "Your conversation starters also serve as conversation finishers.",
        "You're so funny.. to no one."
    ]
};

module.exports = {
    data: new SlashCommandBuilder()
    .setName('roastgenerator')
    .setDescription('Get a roast! Choose a genre for your roast as well.')
    .addStringOption(option =>
        option
        .setName('genre')
        .setDescription('Choose a genre for the roast')
        .setRequired(true)
        .addChoices(
            { name: 'General', value: 'general' },
            { name: 'Appearance', value: 'appearance' },
            { name: 'Intelligence', value: 'intelligence' },
            { name: 'Social', value: 'social' },
        )),
        async execute(interaction) {
            const genre = interaction.options.getString('genre');

            const selectedRoasts = roasts[genre];
            const randomRoast = selectedRoasts[Math.floor(Math.random() * selectedRoasts.length)];

            await interaction.reply({
                content: randomRoast,
            });
        },
};