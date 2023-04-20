const url = "https://api.dictionaryapi.dev/api/v2/entries/en/";
const result = document.getElementById("result");
const sound = document.getElementById("sound");
const btn = document.querySelector(".search_btn");
const searchImg = document.querySelector(".search_img");
const loader = document.querySelector(".loader");
let clicked = false;

btn.addEventListener("click", function() {
  clicked = true;
  search();
})

// Calls the render function when the user presses the enter key or clicks the search button
function search() {
  let input = document.querySelector(".search_input").value;

  if (event.key === "Enter" || clicked === true) {
    searchImg.style.display = "none"
    loader.style.display = "flex"
    setTimeout(() => {
      clicked = false;
      callAPI();
    }, 500)

    let searchedWord = document.querySelector(".searched_word").innerText;
    // clears the render if the user searches the same word again or if the user searches a new word
    if (input === searchedWord || input !== searchedWord) {
      clearRender();
    } 
  }
}

// Fetch data from API
async function callAPI() {
  let input = document.querySelector(".search_input").value;
  const response = await fetch(`${url}${input}`);
  const data = await response.json();

  try {
    if (!!data[0]) {
      renderData(data, input);
    } else {
      result.innerHTML = `<div class="word word_error"><h3 class="searched_word">${data.title}</h3></div>
      <p class="word_definition">Please try searching for a different word</p>`;
    }
  } catch (e) {
    result.innerHTML = `<div class="word"><h3 class="searched_word">${e}</h3></div>`;
  }
}

function renderData (data, input) {
  for (let i = 0; i < data.length; i++) {
    result.innerHTML += `<div class="word">
    <h3 class="searched_word">${input}</h3>
    <button class="audio_btn" onclick="playSound()"><img class="audio_img" src="assets/volume-2.svg" alt="Sound"></button>
</div>
<div class="details">
    <p>${data[i].meanings[0].partOfSpeech}</p>
    <p>${data[i].phonetic}</p>
</div>
<p class="word_definition">${data[i].meanings[0].definitions[0].definition}</p>
<p class="word_example">${data[i].meanings[0].definitions[0].example || ""}</p>`
loader.style.display = "none"
searchImg.style.display = "flex"
}
}

function playSound() {
  sound.play();
}

function clearRender() {
  result.innerHTML = "";
}