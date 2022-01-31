document.addEventListener("DOMContentLoaded", () => {
    createSquares();
    // getNewWord();

    let guessedWords = [[]];
    let availableSpace = 1;

    // let word = "dairy";
    var word = ["dairy", "found", "count", "tiger", "proxy", "prick", "query", "slump", "gorge", "truss", "boost", "abbey", "drink", "wince", "robot", "favor", "solar", "perky", "arose", "spent", "tails", "tombs", "trust", "rebus", "lunch" , "faith", "maybe", "other", "stand", "space", "earth", "ebony", "eight", "stone", "extra", "elect", "eager", "facet", "fable", "cabin", "nacho", "oasis", "vague", "xenon", "sabre", "rabbi", "pacer", "packs", "macho", "labor"];
    console.log(word.length);
    var word = word[Math.floor(Math.random() * word.length)];
    console.log(word);

    let guessWordCount = 0;

    const keys = document.querySelectorAll('.keyboard-row button');
    
    // function getNewWord(){
    //     fetch(
    //         'https:'
    //         {
    //             methods:"GET",
    //             header:{
    //                 "x- " : "",
    //                 "x-":
    //                 "",
    //             },
    //         }
    //     )
    // }
    //     .then((response) => {
    //         return response.json();
    //     })
    //     .then((res) => {
    //         word = res.word;
        
    //     })
    //     .catch((err) => {
    //         console.log.error(err);
    //     });
    // }

    function getCurrentWordArr(){
        const numberOfGuessWords = guessedWords.length;
        return guessedWords[numberOfGuessWords - 1];
    }

    function updateGuessedWords(letter){
        const currentWordArr = getCurrentWordArr();

        if (currentWordArr && currentWordArr.length < 5){
            currentWordArr.push(letter);


            const availableSpaceEl = document.getElementById(String(availableSpace));
            availableSpace = availableSpace + 1;

            availableSpaceEl.textContent = letter;
        }
    }


    function getTileColor(letter, i){
        const isCorrectLetter = word.includes(letter);
        
        if(!isCorrectLetter){
            return "rgb(58, 58, 60)";
        }

        const letterInThatPostion = word.charAt(i);
        const isCorrectPostion = letter === letterInThatPostion;

        if (isCorrectPostion){
            return "rgb(83, 141, 78)";
        }

        return "rgb(181, 159, 59)";
    }

    function handleSubmitWord() {
        const currentWordArr = getCurrentWordArr();
        if (currentWordArr.length  !==5){
            window.alert("Word must be five letters");
        }

        const currentWord = currentWordArr.join("");
        
        // fetch(
        //     'https:'
        //     {
        //         methods: "GET",
        //         header: {
        //             "x- " : "",
        //             "x-":
        //             "",
        //         },
        //     }
        // ).then((res) => {
        //     if(!res.ok){
        //         throw Error()
        //     }
        // })

        const firstLetterId = guessWordCount * 5 + 1;
        const interval = 250;
        currentWordArr.forEach((letter, i) => {
            setTimeout(() => {
                const tileColor = getTileColor(letter, i);
                
                const letterId = firstLetterId + i;
                const letterEl = document.getElementById(letterId);
                letterEl.classList.add("animate__flipInX");
                letterEl.style = `background-color:${tileColor};border-color:${tileColor}`;


            }, interval * i)
        });

        guessWordCount +=1;

        if(currentWord === word){
            setTimeout(function(){
                 alert("Congrats!"); 
                }, 1600);
        }


        if (guessedWords.length === 6){
            setTimeout(function(){
                alert("Opps! The word is " + word + "."); 
               }, 1600);
        }

        guessedWords.push([]);
    }

    function createSquares() {
        const gameBoard = document.getElementById("board");
        
        for (let i = 0; i < 30; i++){
            let square = document.createElement("div");
            square.classList.add("square");
            square.classList.add("animate__animated");
            square.setAttribute("id", i + 1);
            gameBoard.appendChild(square);
        }

    }

    function handleDeleteLetter(){
        const currentWordArr = getCurrentWordArr();
        const removeLetter = currentWordArr.pop();

        guessedWords[guessedWords.length - 1] = currentWordArr;


        const lastLetterEl = document.getElementById(String(availableSpace - 1));

        lastLetterEl.textContent = '';
        availableSpace = availableSpace - 1;
    }

    for (let i = 0; i< keys.length; i++){
        keys[i].onclick = ({ target }) => {
            const letter = target.getAttribute("data-key");

            if (letter === 'enter'){
                handleSubmitWord();
                return;
            }

            if (letter === 'del'){
                handleDeleteLetter();
                return;
            }

            console.log(letter);
            updateGuessedWords(letter);
        }
    }



});

// document.getElementById("closebtn").addEventListener("click", closeWelcome);

// function closeWelcome() {
//   var alert = getElementById("welcome");
//   alert.style.display = "none";
// }


