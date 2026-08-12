// Game states
let ticTacToe = {};
let wordChain = {};
let guessNumber = {};

module.exports = {
    // ========== .tictactoe ==========
    tictactoe: async (message, args, client) => {
        if (!message.isGroup) return message.reply('❌ Use in group!');
        
        const chatId = message.from;
        if (ticTacToe[chatId]) {
            return message.reply('❌ Game already in progress! Use .endttt to stop.');
        }
        
        ticTacToe[chatId] = {
            board: ['_', '_', '_', '_', '_', '_', '_', '_', '_'],
            turn: 'X',
            players: [message.author, null],
            moves: 0
        };
        
        await message.reply(`🎮 Tic-Tac-Toe started!\n\n1️⃣ Player 1: @${message.author.user}\n2️⃣ Player 2: Reply with .join\n\nUse .place 1-9 to place your move`, {
            mentions: [message.author]
        });
    },

    // ========== .place ==========
    place: async (message, args, client) => {
        if (!message.isGroup) return;
        const chatId = message.from;
        if (!ticTacToe[chatId]) return message.reply('❌ No game in progress! Use .tictactoe');
        
        const game = ticTacToe[chatId];
        const position = parseInt(args[0]) - 1;
        
        if (isNaN(position) || position < 0 || position > 8) {
            return message.reply('❌ Invalid position! Use 1-9');
        }
        
        if (game.board[position] !== '_') {
            return message.reply('❌ Position already taken!');
        }
        
        const playerId = message.author;
        if (game.turn === 'X' && playerId !== game.players[0]) {
            return message.reply('❌ Not your turn!');
        }
        if (game.turn === 'O' && playerId !== game.players[1]) {
            return message.reply('❌ Not your turn!');
        }
        
        game.board[position] = game.turn;
        game.moves++;
        
        // Check win
        const winPatterns = [
            [0,1,2], [3,4,5], [6,7,8],
            [0,3,6], [1,4,7], [2,5,8],
            [0,4,8], [2,4,6]
        ];
        
        let winner = null;
        for (let pattern of winPatterns) {
            if (game.board[pattern[0]] !== '_' &&
                game.board[pattern[0]] === game.board[pattern[1]] &&
                game.board[pattern[1]] === game.board[pattern[2]]) {
                winner = game.board[pattern[0]];
                break;
            }
        }
        
        const boardDisplay = game.board.map((cell, i) => {
            return cell === '_' ? (i + 1) : cell;
        });
        
        if (winner) {
            const winnerId = winner === 'X' ? game.players[0] : game.players[1];
            await message.reply(`🎉 ${winner} wins!\n\n${boardDisplay.slice(0,3).join(' ')}\n${boardDisplay.slice(3,6).join(' ')}\n${boardDisplay.slice(6,9).join(' ')}`);
            delete ticTacToe[chatId];
            return;
        }
        
        if (game.moves === 9) {
            await message.reply(`🤝 It's a draw!\n\n${boardDisplay.slice(0,3).join(' ')}\n${boardDisplay.slice(3,6).join(' ')}\n${boardDisplay.slice(6,9).join(' ')}`);
            delete ticTacToe[chatId];
            return;
        }
        
        game.turn = game.turn === 'X' ? 'O' : 'X';
        await message.reply(`🎮 Next turn: ${game.turn}\n\n${boardDisplay.slice(0,3).join(' ')}\n${boardDisplay.slice(3,6).join(' ')}\n${boardDisplay.slice(6,9).join(' ')}`);
    },

    // ========== .endttt ==========
    endttt: async (message, args, client) => {
        if (!message.isGroup) return;
        const chatId = message.from;
        if (ticTacToe[chatId]) {
            delete ticTacToe[chatId];
            await message.reply('✅ Game ended!');
        }
    },

    // ========== .wordchain ==========
    wordchain: async (message, args, client) => {
        if (!message.isGroup) return;
        const chatId = message.from;
        
        if (wordChain[chatId]) {
            return message.reply('❌ Game already in progress! Use .endwcg');
        }
        
        wordChain[chatId] = {
            words: [],
            players: [message.author],
            lastLetter: null
        };
        
        await message.reply('🎮 Word Chain started!\n\nSay a word starting with any letter.\nUse .wc [word] to play.');
    },

    // ========== .wc ==========
    wc: async (message, args, client) => {
        if (!message.isGroup) return;
        const chatId = message.from;
        if (!wordChain[chatId]) return message.reply('❌ No game in progress! Use .wordchain');
        
        const game = wordChain[chatId];
        const word = args[0];
        
        if (!word) return message.reply('❌ Provide a word!');
        
        if (game.lastLetter && word[0].toLowerCase() !== game.lastLetter) {
            return message.reply(`❌ Word must start with "${game.lastLetter}"!`);
        }
        
        if (game.words.includes(word.toLowerCase())) {
            return message.reply('❌ Word already used!');
        }
        
        game.words.push(word.toLowerCase());
        game.lastLetter = word[word.length - 1].toLowerCase();
        game.players.push(message.author);
        
        await message.reply(`✅ "${word}" added!\n\nNext letter: "${game.lastLetter}"\nWords used: ${game.words.length}`);
    },

    // ========== .endwcg ==========
    endwcg: async (message, args, client) => {
        if (!message.isGroup) return;
        const chatId = message.from;
        if (wordChain[chatId]) {
            const game = wordChain[chatId];
            await message.reply(`🎮 Word Chain ended!\n\nTotal words: ${game.words.length}\nPlayers: ${game.players.length}`);
            delete wordChain[chatId];
        }
    },

    // ========== .truth ==========
    truth: async (message, args, client) => {
        const truths = [
            'What is your biggest fear?',
            'Have you ever lied to your best friend?',
            'What is the most embarrassing thing you\'ve done?',
            'Do you have a secret crush?',
            'What is your biggest regret?',
            'Have you ever cheated on a test?',
            'What is your deepest secret?',
            'Do you believe in love at first sight?'
        ];
        await message.reply(`🤔 Truth: ${truths[Math.floor(Math.random() * truths.length)]}`);
    },

    // ========== .dare ==========
    dare: async (message, args, client) => {
        const dares = [
            'Do 10 pushups right now! 💪',
            'Send a funny video to someone 📹',
            'Do a silly dance 💃',
            'Sing a song 🎤',
            'Tell a joke 😂',
            'Do your best impression 🎭',
            'Send a selfie 🤳',
            'Message someone you haven\'t talked to in a while 📱'
        ];
        await message.reply(`😈 Dare: ${dares[Math.floor(Math.random() * dares.length)]}`);
    },

    // ========== .8ball ==========
    '8ball': async (message, args, client) => {
        const responses = [
            '🎱 Yes, definitely!',
            '🎱 Most likely.',
            '🎱 It is certain.',
            '🎱 Signs point to yes.',
            '🎱 Ask again later.',
            '🎱 Cannot predict now.',
            '🎱 Don\'t count on it.',
            '🎱 My sources say no.',
            '🎱 Very doubtful.',
            '🎱 Better not tell you now.'
        ];
        await message.reply(responses[Math.floor(Math.random() * responses.length)]);
    },

    // ========== .flip ==========
    flip: async (message, args, client) => {
        const result = Math.random() < 0.5 ? 'Heads' : 'Tails';
        await message.reply(`🪙 ${result}!`);
    },

    // ========== .dice ==========
    dice: async (message, args, client) => {
        const result = Math.floor(Math.random() * 6) + 1;
        await message.reply(`🎲 ${result}`);
    },

    // ========== .math ==========
    math: async (message, args, client) => {
        const expression = args.join(' ');
        if (!expression) return message.reply('❌ Provide math expression: .math 2+2');
        
        try {
            const result = eval(expression);
            await message.reply(`🧮 ${expression} = ${result}`);
        } catch (e) {
            await message.reply('❌ Invalid expression!');
        }
    },

    // ========== .trivia ==========
    trivia: async (message, args, client) => {
        try {
            const response = await axios.get('https://opentdb.com/api.php?amount=1&type=multiple');
            const data = response.data.results[0];
            const options = [data.correct_answer, ...data.incorrect_answers];
            const shuffled = options.sort(() => Math.random() - 0.5);
            
            await message.reply(`📚 ${data.question}\n\n${shuffled.map((o, i) => `${i+1}. ${o}`).join('\n')}`);
        } catch (e) {
            await message.reply('❌ Could not fetch trivia!');
        }
    },

    // ========== .rps ==========
    rps: async (message, args, client) => {
        const choices = ['rock', 'paper', 'scissors'];
        const userChoice = args[0]?.toLowerCase();
        if (!userChoice || !choices.includes(userChoice)) {
            return message.reply('❌ Choose: .rps rock/paper/scissors');
        }
        
        const botChoice = choices[Math.floor(Math.random() * choices.length)];
        let result = '';
        
        if (userChoice === botChoice) {
            result = '🤝 Draw!';
        } else if (
            (userChoice === 'rock' && botChoice === 'scissors') ||
            (userChoice === 'paper' && botChoice === 'rock') ||
            (userChoice === 'scissors' && botChoice === 'paper')
        ) {
            result = '🎉 You win!';
        } else {
            result = '😈 Bot wins!';
        }
        
        await message.reply(`✊ ${userChoice} vs ${botChoice}\n\n${result}`);
    },

    // ========== .slot ==========
    slot: async (message, args, client) => {
        const emojis = ['🍒', '🍋', '🍊', '🍇', '💎', '🎰'];
        const result = [
            emojis[Math.floor(Math.random() * emojis.length)],
            emojis[Math.floor(Math.random() * emojis.length)],
            emojis[Math.floor(Math.random() * emojis.length)]
        ];
        
        const win = result[0] === result[1] && result[1] === result[2];
        await message.reply(`🎰 ${result.join(' | ')}\n\n${win ? '🎉 Jackpot! You win!' : '😢 Try again!'}`);
    },

    // ========== .guess ==========
    guess: async (message, args, client) => {
        const chatId = message.from;
        
        if (!guessNumber[chatId]) {
            guessNumber[chatId] = {
                number: Math.floor(Math.random() * 100) + 1,
                attempts: 0,
                range: [1, 100]
            };
            await message.reply('🎯 Guess a number between 1 and 100!\nUse .guess [number]');
        } else {
            const game = guessNumber[chatId];
            const guess = parseInt(args[0]);
            
            if (isNaN(guess)) return message.reply('❌ Provide a number!');
            
            game.attempts++;
            
            if (guess === game.number) {
                await message.reply(`🎉 Correct! The number was ${game.number}!\nAttempts: ${game.attempts}`);
                delete guessNumber[chatId];
            } else if (guess < game.number) {
                await message.reply(`⬆️ Higher! (Attempt ${game.attempts})`);
            } else {
                await message.reply(`⬇️ Lower! (Attempt ${game.attempts})`);
            }
        }
    }
};