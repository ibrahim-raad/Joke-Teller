const button = document.getElementById('button');
const audioElement = document.getElementById('audio');


// Disable/Enable button
function toggleButton() {
    button.disabled = !button.disabled;
}
    
    // Passing Joke to VoiceRSS API
    function tellMe(joke) {
       
        VoiceRSS.speech({
            key: 'fcfd03ba946b44a9945cfbf455e27dea',
            src: joke,
            hl: 'en-us',
            v: 'Amy',
            r: 0, 
            c: 'mp3',
            f: '44khz_16bit_stereo',
            ssml: false
        });
}

// Get Jokes from Jokes API 
async function getJokes () {
    let joke = '';
    const url = 'https://v2.jokeapi.dev/joke/Any?blacklistFlags=nsfw,religious,political,racist,sexist';
    try {
        const response = await fetch(url);
        const data = await response.json();
        if(!data.joke)
        joke = `${data.setup} ... ${data.delivery}`;
    else 
    joke = data.joke;
        // Text-to-Speech
        tellMe(joke);
        // Disabled Button
        toggleButton();
    } catch (error) {
        console.log('hmmm ', error);
    }
}

// Event Listeners
button.addEventListener('click', getJokes);
audioElement.addEventListener('ended', toggleButton);