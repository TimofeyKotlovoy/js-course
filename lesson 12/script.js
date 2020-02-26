'use strict'

class Options {
  constructor (height, width, bg, fontSize, textAlign) {
    this.height = height;
    this.width = width;
    this.bg = bg;
    this.fontSize = fontSize;
    this.textAlign = textAlign;
  }
  createDiv() {
    let div = document.createElement('div');
    div.textContent = `Класс создан корректно`;
    document.body.appendChild(div);
    let cssText = () => {
      div.style.height = `${this.height}px`;
      div.style.width = `${this.width}px`;
      div.style.background = this.bg;
      div.style.fontSize= `${this.fontSize}px`;
      div.style.textAlign = this.textAlign;
    };
    cssText();
  }
};

let element = new Options(30, 300, `red`, 24, `center`);
element.createDiv();
