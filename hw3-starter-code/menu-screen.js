// TODO(you): Modify the class in whatever ways necessary to implement
// the flashcard app behavior.
//
// You may need to do things such as:
// - Changing the constructor parameters
// - Adding methods
// - Adding additional fields

class MenuScreen {
  constructor(containerElement,onClickedCallback) {
    this.containerElement = containerElement;
    
    this.onClickedCallback = onClickedCallback;
    this.onClick = this.onClick.bind(this);

    const choiceContainer=document.querySelector('#choices');
    
    const choice=[];
    for(let i=0;i<3;i++){
      choice[i]=document.createElement('div');
      choice[i].textContent=FLASHCARD_DECKS[i].title;
      choiceContainer.appendChild(choice[i]);
      choice[i].addEventListener('click',this.onClick);
    }
  }

  show() {
    this.containerElement.classList.remove('inactive');
  }

  hide() {
    this.containerElement.classList.add('inactive');
  }

  onClick(event) {
    const text=event.currentTarget;
    this.onClickedCallback(text.textContent);
  }
}
