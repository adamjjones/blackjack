'use strict'

const suit = ['♠', '♥', '♦', '♣']
const rank = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K']
const deck = []
let hands = { player: [], dealer: [] }
let scores = { player: 0, dealer: 0 }
let gameOver = false

const renderCard = label => {
  const card = document.createElement('card')
  const topDiv = document.createElement('div')
  const bottomDiv = document.createElement('div')
  bottomDiv.setAttribute('class', 'card-bottom')
  topDiv.textContent = label
  bottomDiv.textContent = label
  if (label.indexOf('♥') !== -1 || label.indexOf('♦') !== -1)
    card.setAttribute('class', 'red-card')

  card.appendChild(topDiv)
  card.appendChild(bottomDiv)

  return card
}

const createDeck = () => {
  for (let r = 0; r < rank.length; r++)
    for (let s = 0; s < suit.length; s++)
      deck.push({ rank: rank[r], suit: suit[s] })
}

const shuffle = () => {
  for (let i = 0; i < deck.length; i++) {
    const j = Math.floor(Math.random() * i)
    const tmp = deck[i]
    deck[j] = deck[i]
    deck[i] = tmp
  }
}

const status = text => {
  const element = document.querySelector('#game-status')
  element.textContent = text
  if (text === 'Game Over') {
    element.setAttribute('class', 'red')
  } else {
    setTimeout(() => {
      if (!gameOver) element.textContent = ''
    }, 2000)
  }
}

const deal = (role, count = 1) => {
  status('dealing to ' + role + '...')
  for (let i = 0; i < count; i++) {
    const card = deck.shift()
    const hand = hands[role]

    hand.push(card)
    const label = card.rank + card.suit
    const cardElement = renderCard(label)
    const row = document.getElementById(role + '-row')
    row.appendChild(cardElement)
  }
}

const computeScore = role => {
  const hand = hands[role]
  let total = 0
  for (let i = 0; i < hand.length; i++) {
    const rank = hand[i].rank
    switch (rank) {
      case 'K':
      case 'Q':
      case 'J':
      case '10':
        total += 10
        break
      case 'A':
        total += 11
        break
      default:
        total += parseInt(rank)
        break
    }
  }
  document.querySelector('#' + role + '-score').textContent = '' + total
  scores[role] = total

  return total
}

const hit = role => {
  if (gameOver) {
    return
  }
  const card = deck.shift()
  const hand = hands[role]
  const label = card.rank + card.suit
  hand.push(card)
  const cardElement = renderCard(label)
  const row = document.getElementById(role + '-row')
  row.appendChild(cardElement)

  const score = computeScore(role)
  if (score > 21) {
    status('Game Over')
    gameOver = true
  } else {
    if (role === 'player') {
      // dealer will play in 1 second
      if (!gameOver) {
        setTimeout(dealersTurn, 1000)
        status("Dealer's Turn")
      }
    } else {
      status("Player's Turn")
    }
  }
}

const dealersTurn = () => {
  status("Dealer's turn")
  const score = hands.dealer
  if (score > 18) {
    stand('dealer')
  } else {
    hit('dealer')
  }
}

const stand = role => {
  if (gameOver) {
    return
  }
  if (role === 'player') {
    // dealer will play in 1 second
    status("Dealer's Turn")
    setTimeout(dealersTurn, 1000)
  } else {
    status("Player's Turn")
  }
}

const newGame = () => {
  createDeck()
  hands = { player: [], dealer: [] }
  scores = { player: 0, dealer: 0 }
  shuffle()
  renderCard()
}

const main = () => {
  createDeck()
  shuffle()
  deal('dealer', 2)

  setTimeout(() => {
    deal('player', 2)
  }, 2500)

  setTimeout(() => {
    status("player's turn")
  }, 5200)

  document.querySelector('#hit-button').addEventListener('click', () => {
    hit('player')
  })
  document.querySelector('#stand-button').addEventListener('click', () => {
    stand('player')
  })
  document.querySelector('#new-game-button').addEventListener('click', newGame)
}

document.addEventListener('DOMContentLoaded', main)
