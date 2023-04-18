const url = "https://api.dictionaryapi.dev/api/v2/entries/en/";
const result = document.getElementById("result");
const sound = document.getElementById("sound");
const btn = document.querySelector(".search_btn");

btn.addEventListener("click", () => {
    let input = document.querySelector(".search_input").value;
    fetch(`${url}${input}`)
    .then((response) => response.json())
    .then((data) => {
        console.log(data);
        result.innerHTML = `<div class="word">
        <h3>${input}</h3>
        <button class="audio_btn" onclick="playSound()"><img class="audio_img" src="assets/volume-2.svg" alt="Sound"></button>
    </div>
    <div class="details">
        <p>${data[0].meanings[0].partOfSpeech}</p>
        <p>${data[0].phonetic}</p>
    </div>
    <p class="word_definition">${data[0].meanings[0].definitions[0].definition}</p>
    <p class="word_example">${data[0].meanings[0].definitions[0].example || ""}</p>`;
    sound.setAttribute("src", `https:${data[0].phonetics[1].audio}`);
    console.log(sound)
    }).catch( () => {
        result.innerHTML = `<div class="word"><h3 class="word_error">Couldn't Find That Word</h3></div>`
    })
})

function playSound() {
    sound.play();
}