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

const strengthBar = document.getElementById("strengthBar");
const strengthText = document.getElementById("strengthText");

const showBtn = document.getElementById("showBtn");

const themes = document.querySelectorAll(".theme");

const historyList = document.getElementById("historyList");

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
    checkStrength(generated);
    savePassword(generated);

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

function checkStrength(password){
    let score = 0;

    if(password.length >= 8) score++;
    if(password.length >= 12) score++;

    if(/[A-Z]/.test(password)) score++;
    if(/[a-z]/.test(password)) score++;
    if(/[0-9]/.test(password)) score++;
    if(/[!@#$%^&*()_+?><:{}[\]]/.test(password)) score++;

    if(score <= 2){
        strengthBar.style.width = "25%";
        strengthBar.style.background = "#ff3b30";
        strengthText.innerHTML = "Strength : Weak";

    }

    else if(score <= 4){
        strengthBar.style.width = "50%";
        strengthBar.style.background = "#ffcc00";
        strengthText.innerHTML = "Strength : Medium";

    }

    else if(score == 5){
        strengthBar.style.width = "75%";
        strengthBar.style.background = "#34c759";
        strengthText.innerHTML = "Strength : Strong";

    }

    else{
        strengthBar.style.width = "100%";
        strengthBar.style.background = "#007aff";
        strengthText.innerHTML = "Strength : Very Strong";

    }

}

showBtn.addEventListener("click", ()=>{

    if(password.type === "password"){
        password.type = "text";
        showBtn.innerHTML = "👁️";

    }
    else{
        password.type = "password";
        showBtn.innerHTML = "👁️";

    }

    if(password.value === "") return;

});

document.body.classList.add("light");

themes.forEach(btn=>{

    btn.addEventListener("click",()=>{

        document.body.className="";

        document.body.classList.add(btn.dataset.theme);

    });

});

function savePassword(password){

    let history = JSON.parse(localStorage.getItem("passwordHistory")) || [];

    history.unshift(password);

    if(history.length > 10){
        history.pop();
    }

    localStorage.setItem("passwordHistory", JSON.stringify(history));

    displayHistory();

};

function displayHistory(){

    historyList.innerHTML = "";

    let history = JSON.parse(localStorage.getItem("passwordHistory")) || [];

    history.forEach(pass=>{

        let li = document.createElement("li");

        li.textContent = pass;

        historyList.appendChild(li);

    });

}

displayHistory();