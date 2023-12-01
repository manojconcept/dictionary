console.log("Console works");

let mainHead = document.createElement("title");
document.head.append(mainHead);
mainHead.innerText = "Dictionary";

let mainDiv = document.createElement("div");
document.body.append(mainDiv);
mainDiv.classList.add("container");

let secDev = document.createElement("div");
secDev.classList.add("secDev");
mainDiv.append(secDev);

let carDict = `<div class="card" style="width: 18rem;">
<div class="card-body">
<div>English Dictionary</div>
  <input id="inputDict" type="text" name="dist" placeholder="Type a word">
  <div id="wordInput">

  </div>
  <button id="catchBtn" type="button">search</button>
</div>
</div>`;
secDev.innerHTML = carDict;

let catchBtn = document.getElementById("catchBtn");
let inputDict = document.getElementById("inputDict");
let wordInput = document.getElementById("wordInput");

catchBtn.addEventListener('click',() => {
  let inputDictV = inputDict.value;
  if (inputDictV === "" || !isNaN(inputDictV)) {
    console.log("Invalid input: Please enter a non-empty and non-numeric value");
    wordInput.innerHTML = "Invalid input: Please enter a non-empty and non-numeric value"
    setTimeout(()=>{
      wordInput.innerHTML = "";
      inputDict.value = "";
    },3000)
  } else {
    getData(inputDictV);
  }
});

let getData = async (word) => {
  try {
    let urlFetch = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);
    
    if (!urlFetch.ok) {
      throw new Error('Failed to fetch data. Status: ' + urlFetch.status);
    }
    let data = await urlFetch.json();
    let wordWord;
    if (data[0] && data[0].meanings) {
      wordWord = `<p>Word : ${data[0].word}</p><p>Phonetic : ${data[0].phonetic}</p>`
      data[0].meanings.forEach((meaning) => {
        wordWord = wordWord + `<p>Part of Speech: ${ meaning.partOfSpeech}</p><p>Part of Speech: ${meaning.definitions[0].definition}</p> `
       
      });
      wordInput.innerHTML = wordWord
        inputDict.value = "";
    } else {
      wordInput.innerHTML = `No data or meanings found for the word.`;
      
    }

  } catch (error) {
    console.error('Error during data fetch:', error.message);
    wordInput.innerHTML = `No data or meanings found for the word.`;
    setTimeout(()=>{
      wordInput.innerHTML = "";
      inputDict.value = "";
    },3000)
  }
};


