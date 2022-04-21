let OnOffBtn = document.querySelector(".on-off")
let gameOn = false
OnOffBtn.onclick = ()=>{
    OnOffBtn.classList.toggle("move")
    gameOn == false? gameOn = true : initialise() // Start or Finish the game
}

let start = document.querySelector("button.start-btn")
start.addEventListener("click",function () {
    if (gameOn == false) return // Control if the game is On
    MachineSequence() // Call Machine playing
    this.disabled = true // Disable "Start" button when playing
})

let screen = document.querySelector(".screen")
let sequence = []
let round = 0
function MachineSequence() {
    if (round == 10) { // Player win after 10 rounds & game-over
        initialise()
        alert("You Win!")
        return
    }
    ++round
    screen.innerText = round.toString().padStart(2, '0')
    //Save Random Sequences
    let rndm = Math.ceil(Math.random()*4)
    sequence.push(rndm)
    // Use setInterval() as loop to play playSeq() Function many times with 1s interval
    let intervalID = setInterval(playSeq, 1000);  
    let i = 0
    function playSeq() {
        let cible = document.querySelector(`[data-keynbr="${sequence[i]}"`)
        animBtn(cible)
        i++      
        // Stop setInterval() if Machine reach sequences' end 
        if (i == sequence.length) {
            clearInterval(intervalID)
        }
    }
}

// Player Turn
let btns = document.querySelectorAll(".key")
let sModeBtn = document.querySelector("input[name='sMode']")

let j = 0
btns.forEach(el => {
    el.addEventListener("click", function () {
        if (gameOn == false) return 
        if (this.dataset.keynbr == sequence[j]) { // if actual sequence match the correct button/key
            animBtn(this)
            j++   // move to the next sequence
            // Machine turn  
            if (j == sequence.length) {
                j = 0
                setTimeout(() => {MachineSequence()}, 1500);
            }
        }
        else {
            if (sModeBtn.checked) { // Strict mode
                alert("Game Over")
                initialise()
                return
            } else {
                //if player click on the wrong key, display "False" for a short time
                screen.innerText = "False" 
                setTimeout(() => {screen.innerText = round.toString().padStart(2, '0')}, 700);
            }
            
        }
    })
})

function initialise() {
    OnOffBtn.classList.remove("move")
    start.disabled = false
    screen.innerText = "--"
    sModeBtn.checked = false
    gameOn = false
    sequence = []
    round = 0
    j = 0
}

let sound = new Audio("./3.wav")
function animBtn(btn) {
    btn.classList.add("anim") 
    sound.play()
    setTimeout(() => {
        btn.classList.remove("anim") 
    }, 500);
}