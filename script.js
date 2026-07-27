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

    const words = [
        "Apple",
        "Tiger",
        "River",
        "Cloud",
        "Shadow",
        "Rocket",
        "Dragon",
        "Ocean",
        "Moon",
        "Falcon",
        "Forest",
        "Storm",
        "Lion",
        "Galaxy",
        "Phoenix"
    ];

const strengthBar = document.getElementById("strengthBar");
const strengthText = document.getElementById("strengthText");

const showBtn = document.getElementById("showBtn");

const themes = document.querySelectorAll(".theme");

const historyList = document.getElementById("historyList");
const excludeSimilar = document.getElementById("excludeSimilar");
const noRepeat = document.getElementById("noRepeat");
const toast = document.getElementById("toast");

const upperCount = document.getElementById("upperCount");
const lowerCount = document.getElementById("lowerCount");
const numberCount = document.getElementById("numberCount");
const symbolCount = document.getElementById("symbolCount");
const lengthCount = document.getElementById("lengthCount");
const entropy = document.getElementById("entropy");

const crackTime = document.getElementById("crackTime");
const categories = document.querySelectorAll(".cat");

let currentCategory = "random";

length.addEventListener("input", () => {
    lengthValue.textContent = length.value;
});

generateBtn.addEventListener("click", generatePassword);

function generatePassword(){

    if(currentCategory === "pin"){

        let pin = "";

        for(let i=0;i<length.value;i++){

            pin += numberChars[Math.floor(Math.random()*10)];

        }

        password.value = pin;

        checkStrength(pin);

        updateStats(pin);

        savePassword(pin);

        showToast("PIN Generated");

        return;

    }

    if(currentCategory === "passphrase"){

        let phrase = "";

        for(let i=0;i<4;i++){

            phrase += words[Math.floor(Math.random()*words.length)];

            if(i<3) phrase += "-";

        }

        password.value = phrase;

        checkStrength(phrase);
        updateStats(phrase);
        savePassword(phrase);
        showToast("Passphrase Generated");

        return;

    }

    let characters = "";

    if(uppercase.checked)
        characters += upperChars;

    if(lowercase.checked)
        characters += lowerChars;

    if(numbers.checked)
        characters += numberChars;

    if(symbols.checked)
        characters += symbolChars;

    if(excludeSimilar.checked) {
        characters = characters.replace(/[Il1O0]/g, "");
    }

    if(characters === ""){
       showToast("⚠ Select at least one option");
        return;
    }

    let generated = "";

        if (noRepeat.checked) {

            let availableCharacters = characters;

            if (length.value > availableCharacters.length) {
                alert("Password length is too long for unique characters.");
                return;
            }

            for (let i = 0; i < length.value; i++) {

                const random = Math.floor(Math.random() * availableCharacters.length);

                generated += availableCharacters[random];

                availableCharacters =
                    availableCharacters.slice(0, random) +
                    availableCharacters.slice(random + 1);

            }

        } else {

            for (let i = 0; i < length.value; i++) {

                const random = Math.floor(Math.random() * characters.length);

                generated += characters[random];

            }

        }

    password.value = generated;
    showToast("New Password Generated");
    checkStrength(generated);
    updateStats(generated);
    savePassword(generated);

}

copyBtn.addEventListener("click", ()=>{

    if(password.value==="") return;

    navigator.clipboard.writeText(password.value);

    copyBtn.innerHTML="✅";

    showToast("Password Copied");

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

    function updateStats(password){

        let upper = (password.match(/[A-Z]/g) || []).length;

        let lower = (password.match(/[a-z]/g) || []).length;

        let numbers = (password.match(/[0-9]/g) || []).length;

        let symbols = (password.match(/[!@#$%^&*()_+?><:{}[\]]/g) || []).length;

        upperCount.textContent = upper;

        lowerCount.textContent = lower;

        numberCount.textContent = numbers;

        symbolCount.textContent = symbols;

        lengthCount.textContent = password.length;

        let pool = 0;

        if(uppercase.checked) pool += upperChars.length;

        if(lowercase.checked) pool += lowerChars.length;

        if(numbers.checked) pool += numberChars.length;

        if(symbols.checked) pool += symbolChars.length;

        const bits = Math.round(password.length * Math.log2(pool));

        entropy.textContent = bits + " bits";

        updateCrackTime(bits);

    }

    function updateCrackTime(bits){

        let text = "";

        if(bits < 28){

            text = " Instantly";

        }

        else if(bits < 36){

            text = "A Few Minutes";

        }

        else if(bits < 50){

            text = "A Few Hours";

        }

        else if(bits < 60){

            text = "Several Days";

        }

        else if(bits < 70){

            text = "Several Years";

        }

        else if(bits < 90){

            text = "Thousands of Years";

        }

        else if(bits < 110){

            text = "Millions of Years";

        }

        else{

            text = "Billions of Years";

        }

        crackTime.textContent = text;

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

const savedTheme = localStorage.getItem("theme") || "light";

    document.body.classList.add(savedTheme);

    themes.forEach(btn => {

        if(btn.dataset.theme === savedTheme){
            btn.classList.add("active");
        }

        btn.addEventListener("click", () => {

            document.body.className = "";

            document.body.classList.add(btn.dataset.theme);

            localStorage.setItem("theme", btn.dataset.theme);

            themes.forEach(theme=>{
                theme.classList.remove("active");
            });

            btn.classList.add("active");

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

    function showToast(message){

        toast.textContent = message;

        toast.classList.add("show");

        clearTimeout(window.toastTimer);

        window.toastTimer = setTimeout(()=>{

            toast.classList.remove("show");

        },2000);

    }

    categories.forEach(btn=>{

        btn.addEventListener("click",()=>{

            categories.forEach(b=>b.classList.remove("active"));

            btn.classList.add("active");

            currentCategory = btn.dataset.type;

            generatePassword();

        });

    });