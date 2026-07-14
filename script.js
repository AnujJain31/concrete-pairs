const cards = document.querySelectorAll('.card');
let flippedCards = [];
let lockBoard = false;
let matchedCount = 0;

function shuffleCards() {
    const values = Array.from(cards).map(card => card.querySelector('.backside').textContent);

    for (let i = values.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [values[i], values[j]] = [values[j], values[i]];
    }

    cards.forEach((card, index) => {
        card.querySelector('.backside').textContent = values[index];
    });
}


shuffleCards();

cards.forEach(card => {
    card.addEventListener('click', () => flipCard(card));
});

function flipCard(card) {
    if(lockBoard) return;
    if (card.classList.contains('flipped')) return;
    if (card.classList.contains('matched')) return;

    card.classList.add('flipped');
    flippedCards.push(card);

    if (flippedCards.length === 2) {
        lockBoard = true;
        checkMatch();
    }
}


function checkMatch() {
    const [card1, card2] = flippedCards;
    const value1 = card1.querySelector('.backside').textContent;
    const value2 = card2.querySelector('.backside').textContent;

    if (value1 === value2) {
       card1.classList.add('matched');
       card2.classList.add('matched');
       flippedCards = [];
       lockBoard = false;
       matchedCount += 2;

     if (matchedCount === cards.length) {
        setTimeout(() => alert('Congratulations! You matched all the cards!'), 500);
    }
}else {
    setTimeout(() => {
        card1.classList.remove('flipped');
        card2.classList.remove('flipped');
        flippedCards = [];
        lockBoard = false;
    }, 1000);       
}   
}        