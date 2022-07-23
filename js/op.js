const grid = document.querySelector('.grid');
const spanPlayer = document.querySelector('.player');
const tempo= document.querySelector('.timer');
const nakamas = [
'brook',
'chopper',
'franky',
'jimbei',
'luffy',
'nami',
'robin',
'sanji',
'usopp',
'zoro',
];
const createElement = (tag, className) => {
    const element = document.createElement(tag);
    element.className = className;
    return element;
}
let first = '';
let second = '';
const endgame = () => {
    const winCards = document.querySelectorAll('.win-card');
    if (winCards.length == 20) {
        // clearInterval(this.loop);
        alert('You win, the game');
    }
}
// checando as cartas
const check = () => {
    const firstNakama = first.getAttribute('data-nakama');
    const secondNakama = second.getAttribute('data-nakama');

    if (firstNakama === secondNakama) {
        first.firstChild.classList.add('win-card');
        second.firstChild.classList.add('win-card');
        
        first = '';
        second = '';

        endgame();

    } else {

        setTimeout(() => {
            
            first.classList.remove('turn-card');
            second.classList.remove('turn-card');

            first = '';
            second = '';

        }, 500);

    }
}
// virando as cartas
const turnCard = ({target}) => {
    
    if (target.parentNode.className.includes('turn-card')) {
        return;
    }

    if (first == ''){
        target.parentNode.classList.add('turn-card');
        first = target.parentNode;
    } else if (second == '') {
        target.parentNode.classList.add('turn-card');
        second = target.parentNode;

        check();
    }
    

}
const createCard = (nakama) => {
    const card = createElement('div','card');
    const front = createElement('div','face front');
    const back = createElement('div', 'face back');
    
    front.style.backgroundImage= `url(../imagens/${nakama}.jpg`;

    card.appendChild(front);
    card.appendChild(back);
    
    // revelando a carta
    card.addEventListener('click', turnCard);
    // recebendo atributo as cartas
    card.setAttribute('data-nakama', nakama);

    return card;
    

}
const inicio = () => {
    // Duplicando array.
    const doubleNakamas = [...nakamas, ...nakamas];
    // Embaralhando as cartas.
    const aleatoryarray = doubleNakamas.sort(()=> Math.random()- 0.5);
    aleatoryarray.forEach((nakama) => {
        const card = createCard(nakama);
        grid.append(card);
    })
}
window.onload = () => { 
    const name = localStorage.getItem('jogador');
    spanPlayer.innerHTML = name;
    inicio();
}


