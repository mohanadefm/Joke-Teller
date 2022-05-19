const button = document.getElementById("button");
const audioElement = document.getElementById("audio");
let jokeTitle = document.getElementById("joke1");

// Disable/Enable Button
function toggleButton() {
  button.disabled = !button.disabled;
}

// Passing Joke to VoiceRSS API
function tellMe(joke) {
  joke.trim().replace(/ /g, "20%");
  console.log(joke);
  //   Voice Speech Parameters
  VoiceRSS.speech({
    key: "fb80c475b3e743388dc824162f156537",
    src: joke,
    hl: "en-us",
    v: "Linda",
    r: 0,
    c: "mp3",
    f: "44khz_16bit_stereo",
    ssml: false,
  });
}

// Get jokes from joke API
async function getJokes() {
  let joke = "";
  const apiUrl = "https://v2.jokeapi.dev/joke/Programming";
  try {
    const response = await fetch(apiUrl);
    const data = await response.json();
    if (data.setup) {
      joke = `${data.setup} ... ${data.delivery}`;
    } else {
      joke = data.joke;
    }
    // Text to Speech
    jokeTitle.innerHTML = joke;
    tellMe(joke);
    //   Disable Button
    toggleButton();
  } catch (error) {
    console.error("error", error);
  }
}

// Event Listeners
button.addEventListener("click", getJokes);
audioElement.addEventListener("ended", toggleButton);
