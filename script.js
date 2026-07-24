const password = document.getElementById("password");
const length = document.getElementById("length");
const lengthValue = document.getElementById("lengthValue");

const uppercase = document.getElementById("uppercase");
const lowercase = document.getElementById("lowercase");
const numbers = document.getElementById("numbers");
const symbols = document.getElementById("symbols");

const generateBtn = document.getElementById("generateBtn");
const copyBtn = document.getElementById("copyBtn");

const upperChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const lowerChars = "abcdefghijklmnopqrstuvwxyz";
const numberChars = "0123456789";
const symbolChars = "!@#$%^&*()_+?><:{}[]";

length.addEventListener("input", () => {
    lengthValue.textContent = length.value;
});

generateBtn.addEventListener("click", generatePassword);

function generatePassword(){

    let characters = "";

    if(uppercase.checked)
        characters += upperChars;

    if(lowercase.checked)
        characters += lowerChars;

    if(numbers.checked)
        characters += numberChars;

    if(symbols.checked)
        characters += symbolChars;

    if(characters === ""){
        alert("Select at least one option.");
        return;
    }

    let generated = "";

    for(let i=0;i<length.value;i++){

        const random = Math.floor(Math.random()*characters.length);

        generated += characters[random];

    }

    password.value = generated;

}

copyBtn.addEventListener("click", ()=>{

    if(password.value==="") return;

    navigator.clipboard.writeText(password.value);

    copyBtn.innerHTML="✅";

    setTimeout(()=>{
        copyBtn.innerHTML="📋";
    },1500);

});

generatePassword();