"use strict";

let apiQuotes = [];
const quoteArea = document.querySelector(".quote_area");
const quoteBtn = document.querySelector(".next_qt");
const twitterBtn = document.querySelector(".share_twitter");

// Loader
const loaderAnimation = document.getElementById("loader");
const mainArea = document.querySelector("main");

const loading = function () {
  loaderAnimation.hidden = false;
  mainArea.hidden = true;
  quoteBtn.hidden = true;
  twitterBtn.hidden = true;
};

const completeLoading = function () {
  loaderAnimation.hidden = true;
  mainArea.hidden = false;
  quoteBtn.hidden = false;
  twitterBtn.hidden = false;
};

const newQuote = function () {
  loading();
  const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
  const author = quote.author
    ? `<p class="quote_author">${quote.author}</p>`
    : `<p> </p>`;
  const quoteTextSize = quote.text.length > 120 ? "small_font" : "quote_body";

  const html = `<p class="${quoteTextSize} quote_text">${quote.text}</p> ${author}`;
  console.log(quote.text.length);

  quoteArea.innerHTML = html;

  // On click
  const quoteText = document.querySelector(".quote_text")?.textContent;
  const quoteAuthor = document.querySelector(".quote_author")?.textContent;

  quoteBtn.addEventListener("click", getQuotes);

  //Twitter integration

  const tweetQuote = function () {
    console.log(quoteText);
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText} - ${quoteAuthor}`;
    window.open(twitterUrl, "_blank");
  };
  completeLoading();
  twitterBtn.addEventListener("click", tweetQuote);
};
// Get quotes from API
async function getQuotes() {
  loading();
  const apiUrl = "https://type.fit/api/quotes";
  try {
    const response = await fetch(apiUrl);
    apiQuotes = await response.json();
    newQuote();
  } catch (error) {
    console.log(error);
  }
}

// On Load
getQuotes();
