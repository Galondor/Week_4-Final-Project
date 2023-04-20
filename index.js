const url = "https://api.dictionaryapi.dev/api/v2/entries/en/";
const result = document.getElementById("result");
const sound = document.getElementById("sound");
const btn = document.querySelector(".search_btn");
const searchImg = document.querySelector(".search_img");
const loader = document.querySelector(".loader");
let clicked = false;

btn.addEventListener("click", function() {
  clicked = true;
})

function search() {
  if (event.key === "Enter") {
    searchImg.style.display = "none"
    loader.style.display = "flex"
    setTimeout(() => {
      renderData();
    }, 500)
  } else if (clicked === true) {
    searchImg.style.display = "none"
    loader.style.display = "flex"
    setTimeout(() => {
      renderData();
    }, 500)
  }
}

async function renderData() {
  let input = document.querySelector(".search_input").value;
  const response = await fetch(`${url}${input}`);
  const data = await response.json();
  console.log(data);

  try {
    for (let i = 0; i < data.length; i++) {
      result.innerHTML += `<div class="word">
      <h3>${input}</h3>
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
  } catch (e) {
    result.innerHTML = `<div class="word"><h3>${title}</h3></div><p class="word_definition word_error">Database couldn't find that word, please try another word.</p>`;
  }
}

function playSound() {
  sound.play();
}

function clearRender() {
  result.innerHTML = "";
}
