const resetBtn = document.querySelector('#reset');
const confirmBtn = document.querySelector('#confirm');
const cpuIMG = document.querySelector('#cpu_choice');

const choices = ["images/rock.jpg", "images/paper.jpg", "images/scissors.jpg"];
const textChoices = ['rock', 'paper', 'scissors'];

// adding event listeners

const pChoices = document.querySelectorAll('.choice_box img');
for (const btn of pChoices){
    btn.addEventListener('click', playerSelect);
}

confirmBtn.addEventListener('click', computerPlay);

resetBtn.addEventListener('click', resetScore);

function playerSelect(event){
    // make this the selected button
    for (const btn of pChoices){
        btn.classList.remove('selected');
    }
    event.currentTarget.classList.add('selected');
}

async function computerPlay(){
    /** identify player choice 
     * cycle through cpu choices
     * pick randint
     * calc result and finish round
     */
    const playerChoice = document.querySelector('.choice_box .selected').id;

    // start cycling 
    let x = await imageCycle();
    // gen a random number
    console.log('returning to cpuPlay');
    let int = Math.floor((Math.random() * 3));
    // change cpu play IMG to match what random int we got
    const cpuChoiceIMG = document.querySelector('#cpu_choice');
    cpuChoiceIMG.src = choices[int];

    let cpuPlayHead = document.querySelector('.cpu_play h3');
    let cpuResultElem = document.createElement('p');
    let cpuText = document.createTextNode('');

    // add text to describe what the cpu played
    switch (int){
        case 0:
            // rock
            cpuPlayLabel = document.createTextNode("Rock!");
            break;
        case 1:
            // paper
            cpuPlayLabel = document.createTextNode("Paper!");
            break;
        case 2:
            // scissors
            cpuPlayLabel = document.createTextNode("Scissors!");
            break;
    }

    // declare win condition:
    // (cmp the random int and playerChoice) 
    let cpuTextPlay = textChoices[int];
    
    // shortening for convenience
    let ctp = cpuTextPlay;
    let pc = playerChoice;

    if (ctp == pc){
        roundDraw();
    }
    else{
        switch (pc){
            case "rock":
                if (ctp == "scissors"){
                    roundWin();
                }
                if (ctp == "paper"){
                    roundLoss();
                }
                break;
            case "paper":
                if (ctp == "rock"){
                    roundWin();
                }
                if (ctp == "scissors"){
                    roundLoss();
                }
                break;
            case "scissors":
                if (ctp == "paper"){
                    roundWin();
                }
                if (ctp == "rock"){
                    roundLoss();
                }
                break;
        }
    }

    // round over, reset to default after pause
    setTimeout(() => {
        cpuChoiceIMG.src = 'images/question.jpg';
        cpuChoiceIMG.classList.remove('highlight');
    }, 2000);

}

function imageCycle(){
    // cycles through images while cpu thinks
    return new Promise(resolve => {
        let index = 0;
        const cpuChoiceIMG = document.querySelector('#cpu_choice');
        cpuChoiceIMG.classList.add('highlight');
            
        let id = setInterval(async() => {
            // go to next image
            cpuChoiceIMG.src = choices[index];
            (index == 2) ? index = 0 : index++;
        }, 500);

        setTimeout(() => {
            clearInterval(id);
            resolve('going back to cpuPlay');
        }, 3000);
    })
}

function resetScore(){
    // resets vals for each stat to zero
    const gameTotal = document.querySelector('#game_total span');
    gameTotal.textContent = 0;
    const pScoreCt = document.querySelector('#p_score span');
    pScoreCt.textContent = 0;
    const cScoreCt = document.querySelector('#c_score span');
    cScoreCt.textContent = 0;
    const drawCt = document.querySelector('#draw_ct span');
    drawCt.textContent = 0;
}

function roundLoss(){
    // display result
    const resultElem = document.querySelector('#round_result span');
    resultElem.textContent = "Loss!"

    // change score by parsing ints
    let gt = parseInt(document.querySelector('#game_total span').textContent);
    let cs = parseInt(document.querySelector('#c_score span').textContent);
    // let drawCt = parseInt(document.querySelector('draw_ct span').textContent);

    document.querySelector('#game_total span').textContent = ++gt;
    document.querySelector('#c_score span').textContent = ++cs;
}

function roundWin(){
    const resultElem = document.querySelector('#round_result span')
    resultElem.textContent = "Win!"

    let gt = parseInt(document.querySelector('#game_total span').textContent);
    let ps = parseInt(document.querySelector('#p_score span').textContent);

    document.querySelector('#game_total span').textContent = ++gt;
    document.querySelector('#p_score span').textContent = ++ps;
}

function roundDraw(){
    const resultElem = document.querySelector('#round_result span');
    resultElem.textContent = "Draw!"

    let drawCt = parseInt(document.querySelector('#draw_ct span').textContent);

    document.querySelector('#game_total span').textContent = ++gt;
    document.querySelector('#draw_ct span').textContent = ++drawCt;
}