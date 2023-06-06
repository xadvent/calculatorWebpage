// Functions for Math

const add = (a, b) => {a = a* 1000; b = b * 1000; return (a + b)/1000}
const subtract = (a, b) => {a = a* 1000; b = b * 1000; return (a - b)/1000}
const multiply = (a, b) => {return a*b}
const divide = (a,b) => {return a/b}

const numberA = document.querySelector('#numberA')
const operator = document.querySelector('#operator')
const numberB = document.querySelector('#numberB')
let numberAText = numberA.textContent
let operatorText = operator.textContent
let numberBText = numberB.textContent

const operate = function(a,operating,b){
    switch(operating) {
        case '+':
            return add(a,b);
        case '-':
            return subtract(a,b);
        case '/':
            return divide(a,b);
        case 'x':
            return multiply(a,b)
        case '=':
            try {return numberA.textContent = operate(numberA.textContent, operator.textContent, numberB.textContent)}
            catch(err){numberA.textContent=b; numberB.textContent=''; operator.textContent=''}
    }
}


const findButtonNumbers = document.querySelectorAll('#buttonList button')
findButtonNumbers.forEach(item =>{item.addEventListener('click', function(){
    const value = item.textContent
    if (value === '+/-' && numberB.textContent) numberB.textContent = makeNegative(numberB.textContent);
    else if(value === '+/-') return;
    else if (value ==='Clear'){numberB.textContent = ''; numberA.textContent = ''; operator.textContent = '' } 
    else if (operator.textContent === '') {numberA.textContent=''; numberB.textContent+=value;}
    else numberB.textContent += value
})})
    

const findOperatorButtons = document.querySelectorAll('#calcRight button')
findOperatorButtons.forEach(button =>{button.addEventListener('click', function(){ 
    if (button.textContent === '=' && (operator.textContent === '' || 
        numberA.textContent === '' || numberB.textContent === '')) return null;
    
        else if (numberA.textContent === ''){numberA.textContent = numberB.textContent; 
            numberB.textContent =''; operator.textContent = button.textContent}
        else if((numberA.textContent && operator.textContent && numberB.textContent)) {
            numberA.textContent = operate(numberA.textContent, operator.textContent, numberB.textContent);
            numberB.textContent = ''; 
            !(button.textContent === '=')? operator.textContent = button.textContent: operator.textContent = '';
        } else if (numberA.textContent && !numberB.textContent){operator.textContent = button.textContent}
    })})       


const makeNegative = function(thing){
    let value = thing.split('')
    if (value[0] != '-') return '-'.concat(thing)
    else value.shift(); thing = value.join(''); return thing  
}