import wordBank7 from "../word_banks/seven_letter_word_bank.txt";

export const boardHardDefault = [
  ["", "", "", "", "", ""],
  ["", "", "", "", "", ""],
  ["", "", "", "", "", ""],
  ["", "", "", "", "", ""],
  ["", "", "", "", "", ""],
];

export const generateWordSet7 = async () => {
  let wordSet;
  let wordOfTheDay;
  await fetch(wordBank7)
    .then((response) => response.text())
    .then((result) => {
      const wordArr = result.split("\n");
      wordOfTheDay = wordArr[Math.floor(Math.random() * wordArr.length)];
      wordSet = new Set(wordArr);
    });

  console.log("7 word: ", wordOfTheDay);
  return { wordSet, wordOfTheDay };
};
