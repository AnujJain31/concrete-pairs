const cards = document.querySelectorAll('.card');
let flippedCards = [];
let lockBoard = false;
let matchedCount = 0;

const carImages = [
    'theames/CAR/car1.jpg',
    'theames/CAR/car2.jpg',
    'theames/CAR/car3.jpg',
    'theames/CAR/car4.jpg',
    'theames/CAR/car5.jpg',
    'theames/CAR/car6.jpg',
    'theames/CAR/car7.jpg',
];

function shuffleCards() {
   
    let deck = [...carImages, ...carImages];

    if (deck.length !== cards.length) {
        console.warn(
            `Card count (${cards.length}) (${deck.length}). ` +
            ` ${carImages.length} = ${deck.length} .card`
        );
    }

    // Fisher-Yates shuffle
    for (let i = deck.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [ deck[i], deck[j]] = [ deck[j], deck[i]];
    }

    cards.forEach((card, index) => {
        const image = deck[index];

        card.dataset.value = image;

        const backside= card.querySelector(' .backside');
        if (backside){
            const img =backside.querySelector('img');
            if (img) {
              
                img.src= image;
            } else {
              
                backside.style.backgroundImage = ` url('${image}')`;
            }
        } else {
         
            card.style.backgroundImage = `url('${image}')`;
        }
    });
}

shuffleCards();

cards.forEach(card => {
    card.addEventListener('click', () => flipCard(card));
});

function flipCard(card) {
    if (lockBoard) return;
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
    const value1 = card1.dataset.value;
    const value2 = card2.dataset.value;

    if (value1 === value2) {
        card1.classList.add('matched');
        card2.classList.add('matched');
        flippedCards = [];
        lockBoard = false;
        matchedCount += 2;

        if (matchedCount === cards.length) {
            setTimeout(() => alert('Congratulations! You matched all the cards!'), 500);
        }
    } else {
        setTimeout(() => {
            card1.classList.remove('flipped');
            card2.classList.remove('flipped');
            flippedCards = [];
            lockBoard = false;
        }, 1000);
    }
}