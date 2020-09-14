// TODO(you): Modify the class in whatever ways necessary to implement
// the flashcard app behavior.
//
// You may need to do things such as:
// - Changing the constructor parameters
// - Changing the code in the constructor
// - Adding methods
// - Adding additional fields

class App {
  constructor() {
    this.menuClicked=this.menuClicked.bind(this);
    this.flashDone=this.flashDone.bind(this);
    this.BackMenu=this.BackMenu.bind(this);
    this.InContinue=this.InContinue.bind(this);
    this.InReStart=this.InReStart.bind(this);

    const menuElement = document.querySelector('#menu');
    this.menu = new MenuScreen(menuElement,this.menuClicked);
  }
  menuClicked(text,ReIncorrect){
    const mainElement = document.querySelector('#main');
    this.flashcards = new FlashcardScreen(mainElement,text,this.flashDone,ReIncorrect);
    this.menu.hide();
    this.flashcards.show();
  }

  flashDone(incorrect,total,myTitle){
    //incorrect[] total
    const resultElement = document.querySelector('#results');
    this.results = new ResultsScreen(resultElement,incorrect,total,myTitle,this.BackMenu,this.InContinue,this.InReStart);
    this.flashcards.hide();
    this.results.show();
  }

  BackMenu(){
    this.results.hide();
    this.menu.show();
  }

  InContinue(incorrect,myTitle){
    const mainElement = document.querySelector('#main');
    this.flashcards = new FlashcardScreen(mainElement,myTitle,this.flashDone,incorrect);
    this.results.hide();
    this.flashcards.show();
  }

  InReStart(myTitle){
    const mainElement = document.querySelector('#main');
    this.flashcards = new FlashcardScreen(mainElement,myTitle,this.flashDone);
    this.results.hide();
    this.flashcards.show();
  }
}
