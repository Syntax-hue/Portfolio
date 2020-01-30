// Here's first version of .typing but it didnt work well 

// const texts = [`Hi, I'm Maxim.`, `I'm a web developer.`, `Welcome to my portfolio.`]
// let count = 0;
// let index = 0;
// let currentText = '';
// let letter = '';

// (function type() {

//     if(count === texts.length) {
//         count = 0;
//     }

//     currentText = texts[count];
//     letter = currentText.slice(0, ++index);

//     document.querySelector('.typing').textContent = letter;

//     if(letter.length == currentText.length) {
//         count++;
//         index = 0;
//     }

//     setTimeout(type, 150);

// }())

class TypeWriter {
    constructor(txtElement, words, wait = 1100) {
      this.txtElement = txtElement;
      this.words = words;
      this.txt = '';
      this.wordIndex = 0;
      this.wait = parseInt(wait, 10);
      this.type();
      this.isDeleting = false;
    }
  
    type() {
      const current = this.wordIndex % this.words.length;
      const fullTxt = this.words[current];
  
      if(this.isDeleting) {
        this.txt = fullTxt.substring(0, this.txt.length - 1);
      } else {
        this.txt = fullTxt.substring(0, this.txt.length + 1);
      }
  
      this.txtElement.innerHTML = `<span class="txt">${this.txt}</span>`;
  
      let typeSpeed = 150;
  
      if(this.isDeleting) {
        typeSpeed /= 2;
      }
  
      if(!this.isDeleting && this.txt === fullTxt) {
        typeSpeed = this.wait;
        this.isDeleting = true;
      } else if(this.isDeleting && this.txt === '') {
        this.isDeleting = false;
        this.wordIndex++;
        typeSpeed = 500;
      }
  
      setTimeout(() => this.type(), typeSpeed);
    }
  }
  
  document.addEventListener('DOMContentLoaded', init);
  
  function init() {
    const txtElement = document.querySelector('.txt-type');
    const words = JSON.parse(txtElement.getAttribute('data-words'));
    const wait = txtElement.getAttribute('data-wait');
    new TypeWriter(txtElement, words, wait);
  }