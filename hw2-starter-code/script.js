// TODO(you): Write the JavaScript necessary to complete the homework.

// You can access the RESULTS_MAP from "constants.js" in this file since
// "constants.js" has been included before "script.js" in index.html.
function check(event){
    showchoice(event.currentTarget);
    if(ischeck['one']!==undefined && ischeck['two']!==undefined && ischeck['three']!==undefined){
        for(const conform of choices){
            conform.removeEventListener('click',check);
        }
        showconstants();
    }
}

function showchoice(space){
    space.querySelector('.checkbox').src='images/checked.png';
    space.style.backgroundColor='#cfe3ff';

    if(space.dataset.questionId==="one"){
        for(let i=0;i<9;i++){
            if(space.dataset.choiceId===nonchosen[i].dataset.choiceId){
                nonchosen[i].style.opacity='1';
                ischeck['one']=nonchosen[i].dataset.choiceId;
                continue;
            }
            nonchosen[i].style.opacity='0.6';
            nonchosen[i].style.backgroundColor='#f4f4f4';
            nonchosen[i].querySelector('.checkbox').src='images/unchecked.png';
        }
    }

    if(space.dataset.questionId==="two"){
        for(let i=9;i<18;i++){
            if(space.dataset.choiceId===nonchosen[i].dataset.choiceId){
                nonchosen[i].style.opacity='1';
                ischeck['two']=nonchosen[i].dataset.choiceId;
                continue;
            }
            nonchosen[i].style.opacity='0.6';
            nonchosen[i].style.backgroundColor='#f4f4f4';
            nonchosen[i].querySelector('.checkbox').src='images/unchecked.png';
        }
    }

    if(space.dataset.questionId==="three"){
        for(let i=18;i<27;i++){
            if(space.dataset.choiceId===nonchosen[i].dataset.choiceId){
                nonchosen[i].style.opacity='1';
                ischeck['three']=nonchosen[i].dataset.choiceId;
                continue;
            }
            nonchosen[i].style.opacity='0.6';
            nonchosen[i].style.backgroundColor='#f4f4f4';
            nonchosen[i].querySelector('.checkbox').src='images/unchecked.png';
        }
    }

}

function showconstants(){
    if(ischeck['one']===ischeck['two']){
        const displayResult=document.querySelector('#solution');
        const displayTitle=displayResult.querySelector('.title');
        const displayContent=displayResult.querySelector('.content');
        displayTitle.textContent="You got: "+RESULTS_MAP[ischeck['one']].title;
        displayContent.textContent=RESULTS_MAP[ischeck['one']].contents;
        displayResult.classList.remove('hidden');
    }else if(ischeck['one']===ischeck['three']){
        const displayResult=document.querySelector('#solution');
        const displayTitle=displayResult.querySelector('.title');
        const displayContent=displayResult.querySelector('.content');
        displayTitle.textContent="You got: "+RESULTS_MAP[ischeck['one']].title;
        displayContent.textContent=RESULTS_MAP[ischeck['one']].contents;
        displayResult.classList.remove('hidden');
    }else if(ischeck['two']===ischeck['three']){
        const displayResult=document.querySelector('#solution');
        const displayTitle=displayResult.querySelector('.title');
        const displayContent=displayResult.querySelector('.content');
        displayTitle.textContent="You got: "+RESULTS_MAP[ischeck['two']].title;
        displayContent.textContent=RESULTS_MAP[ischeck['two']].contents;
        displayResult.classList.remove('hidden');
    }else{
        const displayResult=document.querySelector('#solution');
        const displayTitle=displayResult.querySelector('.title');
        const displayContent=displayResult.querySelector('.content');
        displayTitle.textContent="You got: "+RESULTS_MAP[ischeck['one']].title;
        displayContent.textContent=RESULTS_MAP[ischeck['one']].contents;
        displayResult.classList.remove('hidden');
    }
    const reset=document.querySelector('.reset');
    reset.addEventListener('click',remake);
}

function remake(){
    for (const choice of choices){
        choice.addEventListener('click',check);
    }
    ischeck['one']=undefined;
    ischeck['two']=undefined;
    ischeck['three']=undefined;
    for(let i=0;i<27;i++){
        nonchosen[i].style.opacity='1';
        nonchosen[i].querySelector('.checkbox').src='images/unchecked.png';
        nonchosen[i].style.backgroundColor='#f4f4f4';
    }
    const redo=document.querySelector('#solution');
    redo.classList.add('hidden');
}


let ischeck=['one','two','three'];
const nonchosen=[];
const choices=document.querySelectorAll('.choice-grid div');
for (const choice of choices){
    choice.addEventListener('click',check);
    nonchosen.push(choice);
}