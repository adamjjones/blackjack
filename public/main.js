'use strict'

const suit = ['♠', '♥', '♦', '♣']
const rank = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K']
const deck = []
const hands = { player: [], dealer: [] }
const scores = { player: 0, dealer: 0 }
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
  console.log(deck)
}

const shuffle = () => {
  for (let i = 0; i < deck.length; i++) {
    const j = Math.floor(Math.random() * i)
    const tmp = deck[i]
    deck[j] = deck[i]
    deck[i] = tmp
  }
  console.log(deck)
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
    console.log('-------------')
    console.log('deck[0]', deck[0])
    console.log('before', deck.length)
    const card = deck.shift()
    console.log('deck[0]', deck[0])
    console.log('after', deck.length)
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
  console.log('hand of ' + role, hand)
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
  console.log('Hit invoked')
  const card = deck.shift()
  const hand = hands[role]
  const label = card.rank + card.suit
  hand.push(card)
  const cardElement = renderCard(label)
  const row = document.getElementById(role + '-row')
  row.appendChild(cardElement)

  const score = computeScore(role)
  if (score > 21) {
    console.log('boo you lose!')
    status('Game Over')
    gameOver = true
  } else {
    console.log('game can continue')
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
console.log('hit', hit)

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
  console.log('Stand invoked')
  if (role === 'player') {
    // dealer will play in 1 second
    status("Dealer's Turn")
    setTimeout(dealersTurn, 1000)
  } else {
    status("Player's Turn")
  }
}
console.log('stand', stand)

const main = () => {
  console.log('main started')

  createDeck()
  shuffle()
  console.log('main started')
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
  console.log('registered click handlers')
}

document.addEventListener('DOMContentLoaded', main)

//   const card1 = deck[0].rank + deck[0].suit
//   const card2 = deck[1].rank + deck[1].suit
//   document.querySelector('#display1').textContent = card1
//   document.querySelector('#display2').textContent = card2

// document.querySelector('#click').addEventListener('click', dealer)

// const deck = []
// for (let i = 0; i <= 10; i++) {
//   let j = (deck[i] = { rank: i, suit: 'diamond' }
//  j = deck.push()
//   console.log(j)
// for (let s = 0; s < suits.length; s++) {
//   for (let r = 0; r < ranks.length; r++) {
//     let card = { rank: ranks[r], suit: suits[s] }
//     deck.push(card)
// console.log(deck)
