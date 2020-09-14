// TODO(you): Modify the class in whatever ways necessary to implement
// the flashcard app behavior.
//
// You may need to do things such as:
// - Changing the constructor parameters
// - Adding methods
// - Adding additional fields

class Flashcard {
  constructor(containerElement, myTitle, word, wordDef,flashDone,reIncorrect) {
    this.containerElement = containerElement;
    this.onMoveStart=this.onMoveStart.bind(this);
    this.onMoving=this.onMoving.bind(this);
    this.onMoveEnd=this.onMoveEnd.bind(this);
    this._flipCard = this._flipCard.bind(this);
    this.myTitle=myTitle;
    this.containerElement.innerHTML='';

    let right;
    this.reIncorrect=reIncorrect;
    if(this.reIncorrect===undefined){
      reIncorrect=[];
      for(let i in word){
        reIncorrect.push(i);
      }
      this.reIncorrect=reIncorrect;
      right=0;
    }
    else{
      this.reIncorrect=reIncorrect;
      right=word.length-reIncorrect.length;
    }
    //review incorrent

    this.flashDone=flashDone;
    this.callback=this.callback.bind(this);
    //Finishing flashcard

    let wrong=0;
    this.right=right;
    this.wrong=wrong;
    const correct=document.querySelector('.status .correct');
    const incorrect=document.querySelector('.status .incorrect');
    this.correct=correct;
    this.incorrect=incorrect;
    this.correct.textContent=right;
    this.incorrect.textContent=wrong;
    //number for correct and incorrect

    let wordPosition=0;
    this.wordPosition=wordPosition;
    const frontText=word[this.reIncorrect[wordPosition]];
    const backText=wordDef[word[this.reIncorrect[wordPosition]]];
    this.word=word;
    this.wordDef=wordDef;
    //initial word and defition
    const incorrectList=[];
    this.incorrectList=incorrectList;
    //List saving incorrect

    let frontSide=true;
    this.frontSide=frontSide;

    this.flashcardElement = this._createFlashcardDOM(frontText, backText);
    this.containerElement.append(this.flashcardElement);

    this.flashcardElement.addEventListener('pointerup', this._flipCard);

    let originX;
    let originY;
    this.originX=originX;
    this.originY=originY;
    let moveStart=false;
    this.moveStart=moveStart;
    this.flashcardElement.addEventListener('pointerdown',this.onMoveStart)
    this.flashcardElement.addEventListener('pointermove',this.onMoving);
    this.flashcardElement.addEventListener('pointerup',this.onMoveEnd);
  }

  onMoveStart(event){
    this.originX=event.clientX;
    this.originY=event.clientY;
    this.moveStart=true;
    event.currentTarget.setPointerCapture(event.pointerId);
  }
  onMoving(event){
    if(!this.moveStart){
      return;
    }
    event.preventDefault();
    const removeX=event.clientX-this.originX;
    const removeY=event.clientY-this.originY;
    this.flashcardElement.removeEventListener('pointerup',this._flipCard);
    if(removeX>=150){
      document.body.style.backgroundColor='#97b7b7';
      this.correct.innerHTML='';
      this.correct.textContent=this.right+1;
    }
    else if(removeX<=-150){
      document.body.style.backgroundColor='#97b7b7';
      this.incorrect.innerHTML='';
      this.incorrect.textContent=this.wrong+1;
    }
    else{
      document.body.style.backgroundColor='#d0e6df';
      this.correct.innerHTML='';
      this.incorrect.innerHTML='';
      this.correct.textContent=this.right;
      this.incorrect.textContent=this.wrong;
    }
    event.currentTarget.style.transform='translate('+removeX+'px,'+removeY+'px)'+'rotate('+(removeX*0.2)+'deg)';
  }
  onMoveEnd(event){
    const flashBoxContainer=document.querySelector('.flashcard-box');
    flashBoxContainer.style.animation='fadein 0.5s,backing 0.6s';

    this.moveStart=false;
    this.flashcardElement.addEventListener('pointerup',this._flipCard);
    if((event.clientX-this.originX)>=150){
      this.right+=1;

      if(this.reIncorrect[this.wordPosition]!==this.reIncorrect[this.reIncorrect.length-1]){
        this.wordPosition+=1;
        this.wordSide.textContent=this.word[this.reIncorrect[this.wordPosition]];
        this.definitionSide.textContent=this.wordDef[this.word[this.reIncorrect[this.wordPosition]]];
        if(this.frontSide===false){
          this._flipCard();
        }
      }
      else{
        this.callback(this.incorrectList,this.word.length);
      }
      event.currentTarget.style.transform='translate(0,0)';
      flashBoxContainer.style.animation='none';
      setTimeout(function(){
        flashBoxContainer.style.animation='';
      },1)
    }

    else if((event.clientX-this.originX)<=-150){
      this.wrong+=1;
      this.incorrectList.push(this.reIncorrect[this.wordPosition]);

      if(this.reIncorrect[this.wordPosition]!==this.reIncorrect[this.reIncorrect.length-1]){
        this.wordPosition+=1;
        this.wordSide.textContent=this.word[this.reIncorrect[this.wordPosition]];
        this.definitionSide.textContent=this.wordDef[this.word[this.reIncorrect[this.wordPosition]]];
        if(this.frontSide===false){
          this._flipCard();
        }
      }
      else{
        this.callback(this.incorrectList,this.word.length);
      }
      event.currentTarget.style.transform='translate(0,0)';
      flashBoxContainer.style.animation='none';
      setTimeout(function(){
        flashBoxContainer.style.animation='';
      },0)
    }

    else{
      setTimeout(
        function(){
          flashBoxContainer.style.transform='translate(0,0)';
          flashBoxContainer.style.animation='fadein 0.5s';
        },500)
    }
    
    document.body.style.backgroundColor='#d0e6df';
  }
  // Creates the DOM object representing a flashcard with the given
  // |frontText| and |backText| strings to display on the front and
  // back of the card. Returns a reference to root of this DOM
  // snippet. Does not attach this to the page.
  //
  // More specifically, this creates the following HTML snippet in JS
  // as a DOM object:
  // <div class="flashcard-box show-word">
  //   <div class="flashcard word">frontText</div>
  //   <div class="flashcard definition">backText</div>
  // </div>
  // and returns a reference to the root of that snippet, i.e. the
  // <div class="flashcard-box">
  _createFlashcardDOM(frontText, backText) {
    const cardContainer = document.createElement('div');
    cardContainer.classList.add('flashcard-box');
    cardContainer.classList.add('show-word');

    const wordSide = document.createElement('div');
    wordSide.classList.add('flashcard');
    wordSide.classList.add('word');
    wordSide.textContent = frontText;
    this.wordSide=wordSide;

    const definitionSide = document.createElement('div');
    definitionSide.classList.add('flashcard');
    definitionSide.classList.add('definition');
    definitionSide.textContent= backText;
    this.definitionSide=definitionSide;

    cardContainer.appendChild(wordSide);
    cardContainer.appendChild(definitionSide);
    return cardContainer;
  }

  _flipCard(event) {
    this.flashcardElement.classList.toggle('show-word');
    this.frontSide=!this.frontSide;
  }

  callback(incorrectList,total){
    this.flashDone(incorrectList,total,this.myTitle);
    this.incorrectList=[];
  }
}
