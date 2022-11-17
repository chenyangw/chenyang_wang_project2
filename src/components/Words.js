import wordBank from "../word_banks/six_letter_word_bank.txt";
import wordBank7 from "../word_banks/seven_letter_word_bank.txt";

export const boardDefault = [
  ["", "", "", "", ""],
  ["", "", "", "", ""],
  ["", "", "", "", ""],
  ["", "", "", "", ""],
  ["", "", "", "", ""],
  ["", "", "", "", ""],
];

export const generateWordSet = async () => {
  let wordSet;
  let wordOfTheDay;
  await fetch(wordBank)
    .then((response) => response.text())
    .then((result) => {
      const wordArr = result.split("\n");
      wordOfTheDay = wordArr[Math.floor(Math.random() * wordArr.length)];
      wordSet = new Set(wordArr);
    });

  console.log("6 word: ", wordOfTheDay);
  return { wordSet, wordOfTheDay };
};
