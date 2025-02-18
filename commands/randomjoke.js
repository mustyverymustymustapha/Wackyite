const { SlashCommandBuilder } = require('discord.js');

// The below *jokes* are stolen :) via AI (the rest is written by me)
const jokes = {
    food: [
       { question: "Why did the tomato turn red?", punchline: "Because it saw the salad dressing!" },
       { question: "What's orange and sounds like a parrot?", punchline: "A carrot!" },
       { question: "Why don't eggs tell jokes?", punchline: "Because they'd crack up!" },
       { question: "Why did the baker go to therapy?", punchline: "Because he kneaded it!" },
       { question: "What do you call cheese that isn't yours?", punchline: "Nacho cheese!" },
       { question: "Why don't bananas feel lonely?", punchline: "Because they hang out in bunches!" },
       { question: "Why did the cucumber become a pickle?", punchline: "Because it was in a pickle!" },
       { question: "What's a skeleton's least favourite room?", punchline: "The living room!" },
       { question: "Why did the lettuce break up with the celery?", punchline: "It found someone with more flavour!" },
       { question: "Why do hamburgers go to the gym?", punchline: "To get their buns in shape!" /* very cheesy joke */},
    ],
    animals: [
        { question: "Why dont elephants use computers?", punchline: "Because they're afraid of mice!" },
        { question: "Why did the cow go to outer space?", punchline: "To see the moooon!" },
        { question: "Why did the chicken join a band?", punchline: "Because it had drumsticks!" },
        { question: "Why did the dog sit in the shade?", punchline: "Because it was a hot dog!" },
        { question: "Why do cows have hooves instead of feet?", punchline: "Because they lactose!" },
        { question: "Why don't cats play poker in the jungle?", punchline: "Too many cheetahs!" },
        { question: "Why do fish always know how much they weigh?", punchline: "Because they have their own scales!" },
        { question: "Why don't giraffes make good secret agents?", punchline: "Because they always stick their neck out!" },
        { question: "Why do birds fly south in the winter?", punchline: "Because it's too far to walk!" },
        { question: "What do you call a fish with no eyes?", punchline: "A fsh!" },
    ],
    sports: [
        { question: "Why can't basketball players go on vacation?", punchline: "Because they'd get called for traveling!" },
        { question: "Why did the basketball team recruit a mushroom?", punchline: "Because he was a fungi!" },
        { question: "Why was the soccer player upset?", punchline: "He got kicked out of the game!" },
        { question: "Why don't skiers ever tell secrets?", punchline: "Because they always let it slide!" },
        { question: "Why did the golfer bring two pairs of pants?", punchline: "In case he got a hole in one!" },
        { question: "Why was the tennis player always calm?", punchline: "Because he had good net control!" },
        { question: "What do you call a hockey player who can't play well?", punchline: "A benchwarmer!" },
        { question: "Why was the football team always eating lunch together?", punchline: "Because they liked to huddle!" },
        { question: "Why do swimmers make bad basketball players?", punchline: "Because they can't jump out of the pool!" },
        { question: "Why do track athletes make great comedians?", punchline: "Because they're fast with their punchlines!" },
    ],
    technology: [
        { question: "Why did the computer go to art school?", punchline: "It wanted to learn how to draw windows!" },
        { question: "Why was the cell phone so polite?", punchline: "It always said hello!" },
        { question: "Why don't programmers like nature?", punchline: "It has too many bugs!" },
        { question: "Why did the smartphone need glasses?", punchline: "It lost all its contacts!" },
        { question: "Why did the robot go on a diet?", punchline: "Because it had too many bytes!" },
        { question: "Why was the keyboard so stressed?", punchline: "Because it had too many shifts!" },
        { question: "Why did the website break up with the server?", punchline: "It found someone more responsive!" },
        { question: "Why was the computer freezing?", punchline: "It left its Windows open!" },
        { question: "Why did the computer catch a cold?", punchline: "It left its cache unchecked!" },
        { question: "Why do computers never get tired?", punchline: "Because they always have enough RAM!" },
    ],
    music: [
        { question: "Why did the musician bring a ladder and paper?", punchline: "To reach high notes!" },
        { question: "Why did the guitar player break up?", punchline: "They couldn't find common chords!" },
        { question: "Why don't pianists fight?", punchline: "They always play it by ear!" },
        { question: "Why was the orchestra always late?", punchline: "They had treble finding the right key!" },
        { question: "Why did the singer get a job as a builder?", punchline: "Because he knew how to construct a tune!" },
        { question: "Why was the drum teacher so calm?", punchline: "He had good beat control!" },
        { question: "Why was the violinist so relaxed?", punchline: "They were in their element!" },
        { question: "Why do jazz musicians always look so cool?", punchline: "They're always in the groove!" },
        { question: "Why did the piano teacher go on vacation?", punchline: "To get a break from all the sharps and flats!" },
        { question: "Why did the band hire a mathematician?", punchline: "To count the beats!" },
    ],
};

module.exports = {
    data: new SlashCommandBuilder()
    .setName('randomjoke')
    .setDescription('Obtain a random joke!!!')
    .addStringOption(option =>
        option
        .setName('genre')
        .setDescription('Pick a genre for your joke')
        .setRequired(true)
        .addChoices(
            { name: 'Food', value: 'food' },
            { name: 'Animals', value: 'animals' },
            { name: 'Sports', value: 'sports' },
            { name: 'Technology', value: 'technology' },
            { name: 'Music', value: 'music' }
        )),
        async execute(interaction) {
            const genre = interaction.options.getString('genre');
            const genreJokes = jokes[genre];

            if (!genreJokes || genreJokes.length === 0) {
                return interaction.reply({ content: `Sorry! I was unable to find a joke for the genre "${genre}".`, ephemeral: true });
            }

            const randomJoke = genreJokes[Math.floor(Math.random() * genreJokes.length)];
            const { question, punchline } = randomJoke;

            await interaction.reply(question);

            setTimeout(() => {
                interaction.followUp(punchline);
            }, 2000);
        },
};