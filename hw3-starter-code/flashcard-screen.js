// TODO(you): Modify the class in whatever ways necessary to implement
// the flashcard app behavior.
//
// You may need to do things such as:
// - Changing the constructor parameters
// - Rewriting some of the existing methods, such as changing code in `show()`
// - Adding methods
// - Adding additional fields

class FlashcardScreen {
  constructor(containerElement,choice,flashDone,reIncorrect) {
    this.containerElement = containerElement;
    const content=[];
    this.content=content;
    this.flashDone=flashDone;
    this.reIncorrect=reIncorrect;
    let myTitle;
    this.myTitle=myTitle;

    for(let i in FLASHCARD_DECKS){
      if(choice===FLASHCARD_DECKS[i].title){
          this.myTitle=choice;
          this.content=FLASHCARD_DECKS[i].words;
      }
    }//content to get the word and definition from FLASHCARD_DECKS

    const list=[];
    for(var i in this.content){
      list.push(i);
    }//list to get the word from content
    this.list=list;
  }

  show() {
    this.containerElement.classList.remove('inactive');
    const flashcardContainer = document.querySelector('#flashcard-container');
    const card = new Flashcard(flashcardContainer, this.myTitle, this.list, this.content,this.flashDone,this.reIncorrect);
  }

  hide() {
    this.containerElement.classList.add('inactive');
  }
}
