function displayRecipe(response) {
  let recipeElement = document.querySelector("#recipe");

  recipeElement.classList.remove("blink");
  recipeElement.innerHTML = "";

  new Typewriter("#recipe", {
    strings: response.data.answer,
    autoStart: true,
    delay: 2,
    cursor: "",
  });

  document.querySelector(".action-buttons").classList.remove("hidden");
}

function generateRecipe(event) {
  event.preventDefault();

  let instructionsInput = document.querySelector("#user-instructions");
  let recipeElement = document.querySelector("#recipe");
  let apiKey = "3b0ded4cbf171oa2b4ef5367a1a5tfc9";

  let context =
    "You are a chef who makes healthy, balanced and affordable meals. Your mission is to generate a simple recipe and separate each line with a <br />. Make sure to follow the user instructions.";

  let prompt =
    "User instructions: Generate a recipe about " + instructionsInput.value;
  let apiURL =
    "https://api.shecodes.io/ai/v1/generate?prompt=" +
    encodeURIComponent(prompt) +
    "&context=" +
    encodeURIComponent(context) +
    "&key=" +
    apiKey;

  recipeElement.classList.remove("hidden");
  recipeElement.classList.add("blink");
  recipeElement.innerHTML =
    "⌛ Generating a recipe about " + instructionsInput.value + "...";

  document.querySelector(".action-buttons").classList.add("hidden");

  axios.get(apiURL).then(displayRecipe);
}

document.querySelector("#copy-btn").addEventListener("click", function () {
  let recipeText = document.querySelector("#recipe").innerText;
  navigator.clipboard.writeText(recipeText);
  alert("📋 Recipe copied to clipboard!");
});

document
  .querySelector("#try-another-btn")
  .addEventListener("click", function () {
    document.querySelector("#user-instructions").value = "";
    document.querySelector("#recipe").innerHTML = "";
    let buttons = document.querySelector(".action-buttons");
    buttons.classList.add("hidden");
    buttons.classList.remove("show");
    document.querySelector("#user-instructions").focus();
  });

let recipeFormElement = document.querySelector("#recipe-generator-form");
recipeFormElement.addEventListener("submit", generateRecipe);
