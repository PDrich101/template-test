const quoteContainer    = document.getElementById('quote-container');
const quoteText         = document.getElementById('quote');
const authorText        = document.getElementById('author');
const twitterBtn        = document.getElementById('twitter');
const newQuoteBtn       = document.getElementById('new-quote');
const loader            = document.getElementById('loader');

function showLoadingSpinner() {
    loader.hidden = false;
    quoteContainer.hidden = true;
}

function removeLoadingSpinner(){
    if (!loader.hidden){
        loader.hidden = true;
        quoteContainer.hidden = false;
    }
}
// Get Qutoe from API
async function getQuote(){
    const proxyUrl = 'https://cors-anywhere.herokuapp.com/'
    const apiUrl = 'http://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json';
    try{
        showLoadingSpinner();
        const response = await fetch(proxyUrl + apiUrl);
        const data = await response.json();

        console.log(data);
        // if Author is blank, add 'Unknown'
        if(data.quoteAuthor === '')// === heißt 'is equal to'
        { 
            authorText.innerText = 'Unknown';
        } else {
            authorText.innerText = data.quoteAuthor;
        }

        // reduce fontsize for long Qutoes
        if (data.quoteText.length > 50)
        {
            quoteText.classList.add('long-quote');
        } else {
            quoteText.classList.remove('long-quote');
        }
        quoteText.innerText = data.quoteText;
        // stop Loader, Show quote
        removeLoadingSpinner();

    }
    catch (error){
  
    }
}
//Tweet Dode
function tweetQuote(){
    const quote = quoteText.innerText;
    const author = authorText.innerText;
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quote} - ${author}`;
    window.open(twitterUrl, '_blank');        
}
        
//Event-Listeners
newQuoteBtn.addEventListener('click', getQuote);
twitterBtn.addEventListener('click', tweetQuote);


// Am Edne des Scripts um ERST die Funktion zu deklarieren, und sie DANACH abzurufen
//On Load

getQuote();
