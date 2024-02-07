// This assignment is inspired by a problem on Exercism (https://exercism.org/tracks/javascript/exercises/etl) that demonstrates Extract-Transform-Load using Scrabble's scoring system. 

const input = require("readline-sync");

const oldPointStructure = {
  1: ['A', 'E', 'I', 'O', 'U', 'L', 'N', 'R', 'S', 'T'],
  2: ['D', 'G'],
  3: ['B', 'C', 'M', 'P'],
  4: ['F', 'H', 'V', 'W', 'Y'],
  5: ['K'],
  8: ['J', 'X'],
  10: ['Q', 'Z']
};

function oldScrabbleScorer(word) {
	word = word.toUpperCase();
	let letterPoints = "\n";
	for (let i = 0; i < word.length; i++) {
	  for (const pointValue in oldPointStructure) {
		 if (oldPointStructure[pointValue].includes(word[i])) {
			letterPoints += `Points for '${word[i]}': ${pointValue}\n`
		 }
	  }
	}
	return letterPoints;
 }

// your job is to finish writing these functions and variables that we've named //
// don't change the names or your program won't work as expected. //

let initialPrompt = function() {
   return input.question("Let's play some scrabble!\n\nEnter a word to score: ");
};

let simpleScorer = function(word) {
   let score = 0;
   for (let i = 0; i < word.length; i++) {
      score++;
   }
   return score;
};

let vowelBonusScorer = function(word) {
   word = word.toUpperCase();
   let score = 0;
   for (i = 0; i < word.length; i++) {
      if (word[i].includes('A') || word[i].includes('E') || word[i].includes('I') || word[i].includes('O') || word[i].includes ('U')) {
         score += 3;
      } else {
         score += 1;
      }
   }
   return score;
}

let scrabbleScorer = function(word) {
	word = word.toLowerCase();
	let score = 0;
	for (let i = 0; i < word.length; i++) {
	  for (const letter in newPointStructure) {
		 if (letter === word[i]) {
			score += Number(newPointStructure[letter]);
		 }
	  }
	}
	return score;
 }

let simpleScore = {
   name: 'Simple Score',
   description: 'Each letter is worth 1 point.',
   scorerFunction: simpleScorer
}

let bonusVowels = {
   name: 'Bonus Vowels',
   description: 'Vowels are 3 pts, consonants are 1 pt.', 
   scorerFunction: vowelBonusScorer
}

let scrabble = {
   name: 'Scrabble', 
   description: 'The traditional scoring algorithm', 
   scorerFunction: scrabbleScorer
}

const scoringAlgorithms = [simpleScore, bonusVowels, scrabble];

function scorerPrompt() {
   return input.question("Enter 0, 1, or 2: ");
}

function transform(pointStructure) {
   let newPointStructure = {};
   for (key in pointStructure) {
      let value = pointStructure[key]
      for (i = 0; i < value.length; i++) {
         newPointStructure[pointStructure[key][i].toLowerCase()] = Number(key);
      }
   }
   return newPointStructure;
};

let newPointStructure = transform(oldPointStructure)

function runProgram() {
   let word = initialPrompt(); 
   console.log(`Which scoring algorithm would you like to use?\n\n
   0: ${scoringAlgorithms[0].name}: ${scoringAlgorithms[0].description}\n
   1: ${scoringAlgorithms[1].name}: ${scoringAlgorithms[1].description}\n
   2: ${scoringAlgorithms[2].name}: ${scoringAlgorithms[2].description}\n`)
   let chosenAlgorithm = scorerPrompt(); 
   console.log(`Score for '${word}': ${scoringAlgorithms[chosenAlgorithm].scoringFunction(word)}`)
}


// Don't write any code below this line //
// And don't change these or your program will not run as expected //
module.exports = {
   initialPrompt: initialPrompt,
   transform: transform,
   oldPointStructure: oldPointStructure,
   simpleScorer: simpleScorer,
   vowelBonusScorer: vowelBonusScorer,
   scrabbleScorer: scrabbleScorer,
   scoringAlgorithms: scoringAlgorithms,
   newPointStructure: newPointStructure,
	runProgram: runProgram,
	scorerPrompt: scorerPrompt
};
