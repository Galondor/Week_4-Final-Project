const url = "https://api.dictionaryapi.dev/api/v2/entries/en/";
const result = document.getElementById("result");
const sound = document.getElementById("sound");
const btn = document.querySelector(".search_btn");

function search() {
  if (event.key === "Enter") {
    renderData();
  }
}

async function renderData() {
  let input = document.querySelector(".search_input").value;
  const response = await fetch(`${url}${input}`);
  const data = await response.json();
  console.log(data);

  try {
    result.innerHTML = `<div class="word">
    <h3>${input}</h3>
    <button class="audio_btn" onclick="playSound()"><img class="audio_img" src="assets/volume-2.svg" alt="Sound"></button>
</div>
<div class="details">
    <p>${data[0].meanings[0].partOfSpeech}</p>
    <p>${data[0].phonetic}</p>
</div>
<p class="word_definition">${data[0].meanings[0].definitions[0].definition}</p>
<p class="word_example">${
      data[0].meanings[0].definitions[0].example || ""
    }</p>`;

    let search = document.querySelector(".search_box");
    search.style.marginTop = "152px";

    if (!!data[1]) {
      result.innerHTML += `<div class="word word-2">
            <h3>${input}</h3>
        </div>
        <div class="details">
            <p>${data[1].meanings[0].partOfSpeech}</p>
            <p>${data[1].phonetic}</p>
        </div>
        <p class="word_definition">${
          data[1].meanings[0].definitions[0].definition
        }</p>
        <p class="word_example">${
          data[1].meanings[0].definitions[0].example || ""
        }</p>`;
      let search = document.querySelector(".search_box");
      search.style.marginTop = "252px";
    }

    if (!!data[2]) {
        result.innerHTML += `<div class="word word-2">
              <h3>${input}</h3>
          </div>
          <div class="details">
              <p>${data[2].meanings[0].partOfSpeech}</p>
              <p>${data[2].phonetic}</p>
          </div>
          <p class="word_definition">${
            data[2].meanings[0].definitions[0].definition
          }</p>
          <p class="word_example">${
            data[2].meanings[0].definitions[0].example || ""
          }</p>`;
        let search = document.querySelector(".search_box");
        search.style.marginTop = "300px";
      }

  } catch (e) {
    result.innerHTML = `<div class="word"><h3>${input}</h3></div><p class="word_definition word_error">Database couldn't find that word, please try another word.</p>`;
  }
}

function playSound() {
  sound.play();
}
