function displayRecipe(response) {
  let poemElement = document.querySelector("#recipe");
  poemElement.classList.remove("blink");
  poemElement.innerHTML = "";

  new Typewriter("#recipe", {
    strings: response.data.answer,
    autoStart: true,
    delay: 2,
    cursor: "",
  });
}

function generateRecipe(event) {
  event.preventDefault();

  let instructionsInput = document.querySelector("#user-instructions");
  let apiKey = "3b0ded4cbf171oa2b4ef5367a1a5tfc9";
  let context =
    "You are a chef who makes healthy, balanced and afforadble meals. Your mission is to generate a simple recipe and separate each line with a <br />. Make sure to follow the user instructions.";
  let prompt = `User instructions: Generate a recipe about ${instructionsInput.value}`;
  let apiURL = `https://api.shecodes.io/ai/v1/generate?prompt=${prompt}&context=${context}&key=${apiKey}`;

  let recipeElement = document.querySelector("#recipe");
  recipeElement.classList.remove("hidden");
  recipeElement.classList.add("blink");
  recipeElement.innerHTML = `⌛Generating a recipe about ${instructionsInput.value}`;

  axios.get(apiURL).then(displayRecipe);
}

let recipeFormElement = document.querySelector("#recipe-generator-form");
recipeFormElement.addEventListener("submit", generateRecipe);
