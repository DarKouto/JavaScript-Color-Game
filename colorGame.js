// ***** VARIÁVEIS *****
var colors = generateRandomColors(6); // vai à função gerenerateRandomColors(num) e gera 6 cores com valores de rgb e mete num array, o 6 substitui o "num" que está na função
var squares = document.querySelectorAll(".square"); //seleciona todas as 6 divs com classe square
var pickedColor = pickColor(); // escolhe uma cor à sorte como sendo a certa (executa a função pickColor lá em baixo)
var colorDisplay = document.getElementById("colorDisplay"); // mostra o codigo da cor certa para meter na span com id "colorDisplay" dentro do h1
var messageDisplay = document.getElementById("message"); // é a mensagem de try again ou you win
var title = document.querySelector("h1"); // seleciona o titulo, para depois mudar o fundo
var reset = document.querySelector("#reset"); // botao de reset e novo jogo
var easyBtn = document.getElementById("easyBtn");
var hardBtn = document.getElementById("hardBtn");
var numSquares = 6;
// *************************



// ***** FUNÇÕES *****
// Dá valores random entre 0 e 255 a uma váriavel "red", outra "green", e outra "blue".
function randomColor() { 
    var red = Math.floor(Math.random() * 256);
    var green = Math.floor(Math.random() * 256);
    var blue = Math.floor(Math.random() * 256);
    // Tenho que escrever 256 em vez de 255 porque o math.floor arredonda sempre para baixo, logo nunca daria 255. Assim nunca dá 256.
    return "rgb(" + red + ", " + green + ", " + blue + ")";
}

// Gera um "num" de cores RGB e mete-as num array.
function generateRandomColors(num) { 
    var arr = []; // Cria o array.
    for (var i=0; i<num; i++) { // Repete "num" vezes, tem que se meter o numero nos parenteses, quando se chama a função no código
        arr.push(randomColor()); // Mete os valores rgb, mais o texto "rgb(" no array.
    }
    return arr; // Retorna o array.
}

// GERA UM NÚMERO RANDOM ENTRE 0 E 5 (O INDEX DO ARRAY), E DEPOIS COLA-O NA VARIÁVEL pickedColor QUANDO CHAMO A FUNÇÃO
function pickColor() {
    var random = Math.floor(Math.random() * colors.length); //Math.floor é para arredondar a inteiro (sempre para baixo), porque o math.random dá um numero com virgulas aleatorio de 0 a 1, daí multiplicar pelo array.length.
    return colors[random];
}

// muda as cores de todos os quadrados quando se acerta para a cor correcta. 
function changeColors() {
    for (var i=0; i < squares.length; i++) {
        squares[i].style.backgroundColor = pickedColor;
    }
}

// Faz reset ao texto dos botões, ao fundo do título h1, e à mensagem de estado.
function resetDisplay() {
    title.style.backgroundColor = "steelblue";  // mudar o fundo do h1 para a cor normal
    messageDisplay.textContent = ""; // apagar a mensagem do try again ou do correcto
    reset.textContent = "New Colors"; // mudar o texto do botão
}
// *************************



// ***** DESENHAR A PRIMEIRA PÁGINA *****
colorDisplay.textContent = pickedColor; // mostra o codigo da cor certa para meter na span dentro do h1

for (var i=0; i < squares.length; i++) { // dar cores aos quadrados
    squares[i].style.backgroundColor = colors[i];

    // adicionar listeners aos cliques
    squares[i].addEventListener("click", function() {
        var clickedColor = this.style.backgroundColor; // aqui tinha mesmo que usar o this, senao dava erro.
        if (clickedColor === pickedColor) {
            messageDisplay.textContent = "You win";
            title.style.backgroundColor = pickedColor;
            reset.textContent = "Play Again?";
            changeColors(); //aqui meteu o argumento clickedColor...
        }
        else {
            this.style.backgroundColor = "#232323"; // ok, usar sempre o this aqui dentro que é assim que tudo funciona
            messageDisplay.textContent = "Try Again";
        } 
    });
}
// *************************



// ***** BOTÃO RESET ****
reset.addEventListener("click", function() {
    resetDisplay();
    colors = generateRandomColors(numSquares); // gerar cores totalmente novas
    pickedColor = pickColor();  // ir ao array escolher uma nova cor correcta 
    colorDisplay.textContent = pickedColor;  // mudar o display do h1 com o codigo da cor certa
    
    for (var i=0; i<squares.length; i++) { // voltar a desenhar os quadrados
        squares[i].style.backgroundColor = colors[i];
    }
   
});
// *************************


// ***** BOTÃO EASY ****
easyBtn.addEventListener("click", function() {
    numSquares = 3;
    easyBtn.classList.add("selected");
    hardBtn.classList.remove("selected");
    
    resetDisplay();

    colors = generateRandomColors(numSquares);
    pickedColor = pickColor();
    colorDisplay.textContent = pickedColor;

    for (var i=0; i<squares.length; i++) { // o squares.lenght é sempre 6 !!! ou seja dá 6 voltas.
        if (colors[i]) { // isto quer dizer que no i (index) tiver algum elemento/conteudo, ele dá nova cor
            squares[i].style.backgroundColor = colors[i];
        }
        else { // e nao tiver, ele apaga
            squares[i].style.display = "none";
        }
    }
});
// *************************


//***** BOTÃO HARD *****
hardBtn.addEventListener("click", function() {
    numSquares = 6;
    easyBtn.classList.remove("selected");
    hardBtn.classList.add("selected");

    resetDisplay();

    colors = generateRandomColors(numSquares);
    pickedColor = pickColor();
    colorDisplay.textContent = pickedColor;
    for (var i=0; i<squares.length; i++) {
        squares[i].style.backgroundColor = colors[i];
        squares[i].style.display = "block";
    }
});
// *************************