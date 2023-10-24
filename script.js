const d = (el) => document.querySelector(el);
const dAll = (el) => document.querySelectorAll(el); 
let currentSlide = 0;
let hpLength = 0;
let newMargin = 0;
let chars = [];
let validatorArray = [];

async function API() {
  let response = await fetch('https://hp-api.onrender.com/api/characters');
  let json = await response.json();
  
  mainScreen(json)

}
function mainScreen(json) {
  for(let i = 0; i <= 24; i++) {
    let hpItem = d('.hp-main-area').cloneNode(true);
    hpLength = dAll('.hp-main-area').length;
    hpItem.querySelector('.name-char').innerHTML = json[i].name;
    hpItem.querySelector('.hp-image-char').src = json[i].image;
    hpItem.querySelector('.hp-house').innerHTML = json[i].house;

    d('.hp-item-area').style.width = `calc(100% * ${hpLength})`;
    d('.hp-item-area').append(hpItem);

    hpItem.querySelector('.hp-favorite').addEventListener('click', () => {
      let hpFavorite = d('.container-favorites').cloneNode(true);
      let validator = `${json[i].name}@${json[i].house}`;

      if(validatorArray.indexOf(validator) == -1) {
        hpItem.querySelector('.hp-favorite').src = 'images/star-gold.png';
        openFavorites();
        validatorArray.push(validator);
        hpFavorite.querySelector('.favorite-image').src = json[i].image;
        hpFavorite.querySelector('.name').innerHTML = json[i].name;
        hpFavorite.querySelector('.house').innerHTML = json[i].house;
        d('.favorites-side').append(hpFavorite)
      }

      d('.favorite-area').append(d('.favorites-side'));

      hpFavorite.querySelector('#close').addEventListener('click', (e) => {
        hpItem.querySelector('.hp-favorite').src = 'images/star-dark.png';
        let eTarget = e.target;
        let eClosest = eTarget.closest('.container-favorites');
        let containerFavorites = d('.favorites-side');
        containerFavorites.removeChild(eClosest);
        validatorArray.splice(validator, 1);
        closeFavorites();
        if(d('.favorites-side').style.display == 'flex') {
          d('.favorites').src = 'images/close.png';
        }else {
          d('.favorites').src = 'images/star-gold.png';
        }
      })
        openFavorites();
        if(d('.favorites-side').style.display == 'flex') {
          d('.favorites').src = 'images/close.png';
        }else {
          d('.favorites').src = 'images/star-gold.png';
        }
    });
  }  
}


d('.before-button').addEventListener('click', sliderShowBefore);
d('.next-button').addEventListener('click', sliderShowNext);
function sliderShowBefore() {
  currentSlide--;
  if(currentSlide < 0) {
    currentSlide = hpLength - 1;
  }
  updateMargin();
}

function sliderShowNext() {
  currentSlide++;
  if(currentSlide >= hpLength) {
    currentSlide = 0;
  }
  updateMargin();
}

function updateMargin() {
  if(d('.favorites-side').style.display == 'flex') {
    newMargin = currentSlide * (d('.hp-area').clientWidth - 292);
  }else {
    newMargin = currentSlide * d('.hp-area').clientWidth;
  }
  d('.hp-item-area').style.marginLeft = `-${newMargin}px`;
}

d('.favorites').addEventListener('click', () => {
  if(validatorArray.length >= 1) {
    if(d('.favorites-side').style.display == 'flex') {
      d('.favorites-side').style.display = 'none';
      d('.favorites-side').style.marginRight = '-292px';
      d('.hp-item-area').style.width = `calc(100% * ${hpLength})`
      d('.hp-button').style.width = '100%';
      d('.favorites').style.right = '30px';
      d('.favorites').src = 'images/star-gold.png';
      updateMargin();
    } else {
      d('.favorites-side').style.display = 'flex';
      d('.favorites-side').style.marginRight = '0';
      d('.hp-item-area').style.width = `calc((100% - 292px) * ${hpLength})`;
      d('.hp-button').style.width = 'calc(100% - 292px)';
      d('.favorites').style.right = '310px';
      d('.favorites').src = 'images/close.png';
      updateMargin();

      if (window.matchMedia("(max-width: 1020px)").matches) {
        d('.hp-item-area').style.marginLeft = `0`
        d('.hp-item-area').style.width = `calc(100% * ${hpLength})`
        d('.hp-button').style.width = '100%';
        d('.favorites').style.right = '30px';
      }
    }
  }
  if(d('.favorites-side').style.display == 'flex') {
    d('.favorites').src = 'images/close.png';
  }else {
    d('.favorites').src = 'images/star-gold.png';
  }
});
function openFavorites() {
  if(validatorArray.length >= 1) {
    d('.favorites-side').style.display = 'flex';
    d('.favorites-side').style.marginRight = '0';
    d('.hp-item-area').style.width = `calc((100% - 292px) * ${hpLength})`;
    d('.hp-button').style.width = 'calc(100% - 292px)';
    d('.favorites').style.right = '310px';
    updateMargin();

    if (window.matchMedia("(max-width: 1020px)").matches) {
      d('.hp-item-area').style.marginLeft = `0`
      d('.hp-item-area').style.width = `calc(100% * ${hpLength})`
      d('.hp-button').style.width = '100%';
      d('.favorites').style.right = '30px';
    }
  }
}
function closeFavorites() {
  if(validatorArray.length == 0) {
    d('.favorites-side').style.display = 'none';
    d('.favorites-side').style.marginRight = '-292px';
    d('.hp-item-area').style.width = `calc(100% * ${hpLength})`
    d('.hp-button').style.width = '100%';
    d('.favorites').style.right = '30px';
    updateMargin();
  }
}

if(window.matchMedia("(max-width: 1020px)").matches) {
  d('.hp-favorite').style.zIndex = '0';
}else {
  d('.hp-favorite').style.zIndex = '99';
}

API();