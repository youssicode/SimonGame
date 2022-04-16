
let start = document.querySelector("button")
let screen = document.querySelector(".screen")
let OnOff = document.querySelector(".on-off")
let sound = new Audio("./3.wav")

let sequence = []
let tour = 0
let gameOn = false

OnOff.onclick = ()=>{
    if (gameOn == false) {
        gameOn = true
        OnOff.innerText = "Game On"
    }else{
        initialise()
    }
}

function initialise() {
    OnOff.innerText = "Game Off"
    screen.innerText = "--"
    gameOn = false
    sequence = []
    tour = 0
    j = 0

}

start.addEventListener("click",MachineSequence)

function MachineSequence() {
    if (gameOn == false) return
    if (tour == 5) {
        initialise()
        alert("You Win!")
        return
    }
    screen.innerText = ++tour
    let rndm = Math.ceil(Math.random()*4)
    sequence.push(rndm)
    let i = 0
    let intervalID = setInterval(playSeq, 1000);
    function playSeq() {
        let cible = document.querySelector(`[data-keynbr="${sequence[i]}"`)
        animBtn(cible)
        i++      
        if (i == sequence.length) {
            clearInterval(intervalID)
        }
    }
}

function animBtn(btn) {
    btn.classList.add("anim") 
    sound.play()
    setTimeout(() => {
        btn.classList.remove("anim") 
    }, 500);
}
// Player Sequence
let btns = document.querySelectorAll(".key")
let j = 0
btns.forEach(el => {
    el.addEventListener("click", function () {
        if (gameOn == false) return 
        if (this.dataset.keynbr == sequence[j]) {
            animBtn(this)
            j++     
            if (j == sequence.length) {
                j = 0
                setTimeout(() => {MachineSequence()}, 1500);
            }
        }
        else {
            screen.innerText = "No"

        }
    })
})

// let conso = document.querySelector(".consol")
// function console() {
//     conso.innerHTML = `sequence Array = ${sequence} <br>`
//     conso.innerHTML += `j = ${j} <br>`
//     conso.innerHTML += `sequence[j] = ${sequence[j]}`

// }