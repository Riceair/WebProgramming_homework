// TODO(you): Modify the class in whatever ways necessary to implement
// the flashcard app behavior.
//
// You may need to do things such as:
// - Changing the constructor parameters
// - Adding methods
// - Adding additional fields

class ResultsScreen {
  constructor(containerElement,incorrect,total,myTitle,BackMenu,InContinue,InReStart) {
    this.containerElement = containerElement;
    this.InContinue=InContinue;
    this.choseContinue=this.choseContinue.bind(this);
    this.InReStart=InReStart;
    this.choseReStart=this.choseReStart.bind(this);
    this.myTitle=myTitle;
    this.incorrect=incorrect;
    
    const percentInHTML=document.querySelector('.percent');
    percentInHTML.textContent=Math.round((total-incorrect.length)/total*100);
    const correctInHTML=document.querySelector('#results .correct');
    correctInHTML.textContent=total-(incorrect.length);
    const incorrectInHTML=document.querySelector('#results .incorrect');
    incorrectInHTML.textContent=incorrect.length;

    if(incorrect.length===0){
      const restart=document.querySelector('.continue');
      restart.textContent='Start Over?';
      restart.addEventListener('click',this.choseReStart);
      this.restart=restart;
    }
    else{
      const tocontinue=document.querySelector('.continue');
      tocontinue.textContent='Continue';
      tocontinue.addEventListener('click',this.choseContinue);
      this.tocontinue=tocontinue;
    }
    const toMenuInHTML=document.querySelector('.to-menu');
    toMenuInHTML.addEventListener('click',BackMenu);
  }

  show(numberCorrect, numberWrong) {
    this.containerElement.classList.remove('inactive');
  }

  hide() {
    this.containerElement.classList.add('inactive');
  }

  choseContinue(){
    this.InContinue(this.incorrect,this.myTitle);
    this.tocontinue.removeEventListener('click',this.choseContinue);
  }

  choseReStart(){
    this.InReStart(this.myTitle);
    this.restart.removeEventListener('click',this.choseReStart);
  }
}
