
const cards = document.querySelectorAll('.card');
let flippedCards = [];
let lockBoard = false;
let matchedCount = 0;
let timerInterval = null;
let timeLeft = 0;
const instrumentImages = [
    'themes/INSTRUMENT/instrument1.jpg',
    'themes/INSTRUMENT/instrument2.jpg',
    'themes/INSTRUMENT/instrument3.jpg',
    'themes/INSTRUMENT/instrument4.jpg',
    'themes/INSTRUMENT/instrument5.jpg',
    'themes/INSTRUMENT/instrument6.jpg',
    'themes/INSTRUMENT/instrument7.jpg',
];
const carImages = [
    'themes/CAR/car1.jpg',
    'themes/CAR/car2.jpg',
    'themes/CAR/car3.jpg',
    'themes/CAR/car4.jpg',
    'themes/CAR/car5.jpg',
    'themes/CAR/car6.jpg',
    'themes/CAR/car7.jpg',
];
const flowerImages = [
    'themes/FLOWERS/flower1.jpg',
    'themes/FLOWERS/flower2.jpg',
    'themes/FLOWERS/flower3.jpg',
    'themes/FLOWERS/flower4.jpg',
    'themes/FLOWERS/flower5.jpg',
    'themes/FLOWERS/flower6.jpg',
    'themes/FLOWERS/flower7.jpg',
];

function preloadImages(urls){
    urls.forEach(url =>{
        const img = new Image();
        img.src = url;
    });
}

let deck = [];

function setTheme() {
    let theme = document.getElementById('theme-select').value;
    if (theme === 'instruments') {
        deck = [...instrumentImages, ...instrumentImages];
    } else if (theme === 'cars') {
        deck=  [...carImages, ...carImages];
    } else if (theme === 'flowers') {
        deck = [...flowerImages, ...flowerImages];
    }
}

function shuffleCards() {
    setTheme();

    flippedCards = [];
    lockBoard = false;
    matchedCount = 0;
    cards.forEach(card => card.classList.remove('flipped', 'matched'));

    if ( deck.length !== cards.length) {
        console.warn(
            `Card count (${cards.length}) (${deck.length}). ` +
            ` ${carImages.length} = ${deck.length} .card`
        );
    }

    for (let i = deck.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [deck[i] , deck[j]] = [deck[j], deck[i]];
    }

    cards.forEach((card, index) => {
        const image = deck[index];

         card.dataset.value = image;

        const backside =  card.querySelector('.backside');
        if (backside) {
            const img = backside.querySelector('img');
            if (img) {
                img.src = image;
            } else {
                backside.style.backgroundImage = `url('${image}')`;
            }
        } else {
            card.style.backgroundImage = `url('${image}')`;
        }
    });
    showHint();
}
 
function showHint(duration = 1500){
    lockBoard = true;
    cards.forEach(card => card.classList.add(`flipped`));

    setTimeout(() => {
        cards.forEach(card => card.classList.remove(`flipped`));
        lockBoard = false;
    }, duration);
}
preloadImages([...instrumentImages,...carImages,...flowerImages]);
shuffleCards();

const timerSelect = document.getElementById('time-select');
const customTimeInput = document.getElementById('custom-time');
const timerDisplay = document.querySelector('.timer-display');

timerSelect.addEventListener('change', () => {
    customTimeInput.style.display = timerSelect.value === 'custom' ? 'inline-block' : 'none';
});

// reset btn
document.getElementById('reset-Btn').addEventListener('click', () => {
    clearInterval(timerInterval);
    timerDisplay.textContent = 'Time: -- ';
    shuffleCards();
});
// timer
document.getElementById('start-timer-btn').addEventListener('click', () => {
    let seconds = timerSelect.value === 'custom'
    ?parseInt(customTimeInput.value,10)
    :parseInt(timerSelect.value,10);

    if(!seconds || seconds <= 0 ) return;
    shuffleCards()
    startTimer(seconds);
    });

    function startTimer(seconds){
        clearInterval(timerInterval);
        timeLeft = seconds;
        timerDisplay.textContent = `Time: ${timeLeft}`;
        lockBoard = false;

        timerInterval = setInterval(() => {
            timeLeft--;
            timerDisplay.textContent = `Time: ${timeLeft}`;

            if(timeLeft <= 0){
                clearInterval(timerInterval);
                lockBoard = true;
                alert("time's up!");
                shuffleCards()
            }
        },1000);
    }
    
document.getElementById('theme-select').addEventListener('change', shuffleCards);

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
        matchedCount+= 2;

     if (matchedCount === cards.length) {
            setTimeout( () => alert('Congratulations! You matched all the cards!'), 500);
        }
    } else  {
        setTimeout(() => {
            card1.classList.remove('flipped');
              card2.classList.remove('flipped');
            flippedCards = [];
            lockBoard = false;
        }, 1000);
    }
}

