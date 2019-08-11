'use strict'

const suit = ['♠', '♥', '♦', '♣']
const rank = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K']
const deck = []
const hands = { player: [], dealer: [] }
const scores = { player: 0, dealer: 0 }

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

const deal = (role, count = 1) => {
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

const hit = () => {
  console.log('Hit invoked')
}
console.log('hit', hit)
const stand = () => {
  console.log('Stand invoked')
}
console.log('stand', stand)
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

const main = () => {
  console.log('main started')

  createDeck()
  shuffle()
  console.log('main started')
  deal('player', 2)
  deal('dealer', 2)
  document.querySelector('#hit-button').addEventListener('click', hit)
  document.querySelector('#stand-button').addEventListener('click', stand)
  console.log('registered click handlers')
}

document.addEventListener('DOMContentLoaded', main)
