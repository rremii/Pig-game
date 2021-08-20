'use strict'
let playerEl0 = document.querySelector('.player--0')
let playerEl1 = document.querySelector('.player--1')
let scoreEl0 = document.querySelector('#score--0')
let scoreEl1 = document.getElementById('score--1')
let currentEl0 = document.getElementById('current--0')
let currentEl1 = document.getElementById('current--1')
let diceEl = document.querySelector('.dice')
let btnNew = document.querySelector('.btn--new')
let btnRoll = document.querySelector('.btn--roll')
let btnHold = document.querySelector('.btn--hold')
let btnNewGame = document.querySelector('.btn--new')
let popUpEl = document.querySelector('.pop-up')
let popUpTextEl = document.querySelector('.pop-up-text')

////////
let currentScore, activePlayer, scores, playing
////////
const init = () => {
    scoreEl0.textContent = 0
    scoreEl1.textContent = 0
    currentScore = 0
    activePlayer = 0
    scores = [0, 0]
    playing = true

    scoreEl0.textContent = 0
    scoreEl1.textContent = 0
    currentEl0.textContent = 0
    currentEl1.textContent = 0

    popUpEl.classList.add('hidden')
    diceEl.classList.add('hidden')
    playerEl0.classList.add('player--active')
    playerEl1.classList.remove('player--winner')
    playerEl0.classList.remove('player--winner')
}

let switchPlayer = () => {
    document.getElementById(`current--${activePlayer}`).textContent = 0
    activePlayer = activePlayer === 0 ? 1 : 0
    currentScore = 0
    playerEl0.classList.toggle('player--active')
    playerEl1.classList.toggle('player--active')
}
let popUp = (player) => {
    debugger
    popUpEl.classList.remove('hidden')
    popUpTextEl.textContent = `player       
    ${player + 1}
    is  a winner`
}
///////////
init()

btnRoll.addEventListener('click', () => {
    if (playing) {
        const dice = Math.trunc(Math.random() * 6 + 1)

        diceEl.classList.remove('hidden')
        diceEl.src = `dice-${dice}.png`
        if (dice !== 1) {
            currentScore += dice
            document.getElementById(`current--${activePlayer}`).textContent =
                currentScore
        } else {
            switchPlayer()
        }
    }
})
btnHold.addEventListener('click', () => {
    if (playing) {
        scores[activePlayer] += currentScore
        document.querySelector(`#score--${activePlayer}`).textContent =
            scores[activePlayer]
        if (scores[activePlayer] >= 100) {
            playing = false
            document.getElementById(`current--${activePlayer}`).textContent = 0
            diceEl.classList.add('hidden')
            document
                .querySelector(`.player--${activePlayer}`)
                .classList.add('player--winner')
            document
                .querySelector(`.player--${activePlayer}`)
                .classList.remove('player--active')
            popUp(activePlayer)
        } else {
            switchPlayer()
        }
    }
})
btnNewGame.addEventListener('click', () => {
    if (!playing) {
        init()
    }
})
