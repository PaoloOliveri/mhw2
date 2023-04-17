function removeResult(){
    const resultDiv = document.querySelector('#result');
    resultDiv.classList.add('hidden');

    const title = document.querySelector("#result h1");
    const contents = document.querySelector("#result p");
    const button = document.querySelector("#result button");

    title.remove();
    contents.remove();
    button.remove();
}

function changeToUnselected(selectedDivToRemove){
    const image = selectedDivToRemove.querySelector('.checkbox');
    image.src = "./images/unchecked.png";
    selectedDivToRemove.addEventListener('click', changeToSelected);
}

function RestartGame(){
    for(const box of boxes){
        box.classList.remove('unselected');
        box.classList.remove('selected');

        changeToUnselected(box);
    }

    removeResult();

    window.scrollTo(0, 0);
}

function addResult(choice){
    const resultDiv = document.querySelector('#result');
    resultDiv.classList.remove('hidden');
    
    const title = document.createElement("h1");
    const contents = document.createElement("p");
    const button = document.createElement("button");
    
    title.textContent = RESULTS_MAP[''+choice+''].title;
    contents.textContent = RESULTS_MAP[''+choice+''].contents;
    button.textContent = "Ricomincia il test";

    resultDiv.appendChild(title); 
    resultDiv.appendChild(contents);
    resultDiv.appendChild(button);

    for(const element in selectedAnswers){
        delete selectedAnswers[element];
        console.log(selectedAnswers);
    }

    button.addEventListener('click', RestartGame);
}

function gameOver(){
    let count = 0;
    let choiceQ1;
    let choiceQ2
    let choiceQ3;

    for(const element in selectedAnswers){
        count++;
        console.log("count " + count);
        if(element === "one"){
            choiceQ1 = selectedAnswers[element];
        }

        if(element === "two"){
            choiceQ2 = selectedAnswers[element];
        }

        if(element === "three"){
            choiceQ3 = selectedAnswers[element];
        }
    }

    if(count === 3){
        console.log("Count finale: " + count);
        
        for(const box of boxes){
            box.removeEventListener('click', changeToSelected);
        }

        if(choiceQ2 === choiceQ3){
            addResult(choiceQ2);
            return; 
        }
        else{
            addResult(choiceQ1);
            return;
        }
    
    }

}

function ifThereIsAlready(selectedQuestionId){
    for(const element in selectedAnswers){
        if(element === selectedQuestionId){
            const selectedDivToRemove = document.querySelector('[data-question-id= "'+element+'"][data-choice-id= "'+selectedAnswers[element]+'"]');
            console.log("Domanda: " + selectedDivToRemove.dataset.questionId);
            console.log("Personalità: " + selectedDivToRemove.dataset.choiceId);
            
            selectedDivToRemove.classList.add('unselected');
            selectedDivToRemove.classList.remove('selected');
            
            changeToUnselected(selectedDivToRemove);
        }
    }
}

function changeToSelected(event){
    const selectedDiv = event.currentTarget;
    const image = selectedDiv.querySelector('.checkbox');
    image.src = "./images/checked.png";
    
    ifThereIsAlready(selectedDiv.dataset.questionId);

    selectedAnswers[selectedDiv.dataset.questionId] = selectedDiv.dataset.choiceId;
    console.log(selectedAnswers);
    selectedDiv.classList.add('selected');
    selectedDiv.classList.remove('unselected');

    selectedDiv.removeEventListener('click', changeToSelected);
    
    for(const box of boxes){    
        if(box.dataset.questionId === selectedDiv.dataset.questionId && box !== selectedDiv){
                box.classList.add('unselected');       
        }     
    }
    gameOver();
}


let selectedAnswers = {};

const boxes = document.querySelectorAll('.choice-grid div');
for(const box of boxes){
    box.addEventListener('click', changeToSelected);
}