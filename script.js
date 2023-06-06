// Functions for Math

const add = (a, b) => {a = a* 1000; b = b * 1000; return (a + b)/1000}
const subtract = (a, b) => {a = a* 1000; b = b * 1000; return (a - b)/1000}
const multiply = (a, b) => {return a*b}
const divide = (a,b) => {return a/b}

const numberA = document.querySelector('#numberA')
const operator = document.querySelector('#operator')
const numberB = document.querySelector('#numberB')


const operate = function(a,operating,b){
    if (operating === '/' && (a === 0 || b ===0)) return alert('not allowed')
    switch(operating) {
        case '+':
            return add(a,b);
        case '-':
            return subtract(a,b);
        case '/':
            return divide(a,b).toFixed(2);
        case 'x':
            return multiply(a,b).toFixed(2)
        case '=':
            try {return numberA.textContent = operate(numberA.textContent, operator.textContent, numberB.textContent)}
            catch(err){numberA.textContent=b; numberB.textContent=''; operator.textContent=''}
    }
}


const findButtonNumbers = document.querySelectorAll('#buttonList button')
findButtonNumbers.forEach(item =>{item.addEventListener('click', function(){
    const value = item.textContent;
    if (value === '+/-' && numberB.textContent) {
        numberB.textContent = makeNegative(numberB.textContent);
        }else if(value === '+/-') {return;} 
    if (value ==='Clear'){
        if (numberB.textContent) {return numberB.textContent = '';}
        else if(numberA.textContent || operator.textContent) {
                numberA.textContent = ''; 
                operator.textContent = '';
                return;
            }; 
        };  
    if (value != 'Clear' && value != '+/-') numberB.textContent += value;
})})
    

const findOperatorButtons = document.querySelectorAll('#calcRight button')
findOperatorButtons.forEach(button =>{button.addEventListener('click', function(){ 
    if (button.textContent === '=' && (operator.textContent === '' || 
        numberA.textContent === '' || numberB.textContent === '')) return null;
    
        else if (numberA.textContent === ''){numberA.textContent = numberB.textContent; 
            numberB.textContent =''; operator.textContent = button.textContent}
        else if((numberA.textContent && operator.textContent && numberB.textContent)) {
            const value = operate(numberA.textContent, operator.textContent, numberB.textContent);
            if (!(typeof value === 'Number') && value < Infinity){
                numberA.textContent = value
                numberB.textContent = ''; 
                !(button.textContent === '=')? operator.textContent = button.textContent: operator.textContent = '';        
            } else {alert('no.')};
        } else if (numberA.textContent && !numberB.textContent){operator.textContent = button.textContent}
    })})       


const makeNegative = function(thing){
    let value = thing.split('')
    if (value[0] != '-') return '-'.concat(thing)
    else value.shift(); thing = value.join(''); return thing  
}