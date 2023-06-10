const numberA = document.querySelector('#numberA')
const numberB = document.querySelector('#numberB')
const add = (a, b) => {a = a* 100000; b = b * 100000; return (a + b)/100000}
const subtract = (a, b) => {a = a* 100000; b = b * 100000; return (a - b)/100000}
const multiply = (a, b) => {a = a* 100000; b = b*100000; return (a*b)/100000}
const divide = (a, b) => {a = a* 100000; b = b*100000; return (a/b)/100000}

String.prototype.replaceAll = function(str1, str2, ignore) 
{
    return this.replace(new RegExp(str1.replace(/([\/\,\!\\\^\$\{\}\[\]\(\)\.\*\+\?\|\<\>\-\&])/g,"\\$&"),(ignore?"gi":"g")),(typeof(str2)=="string")?str2.replace(/\$/g,"$$$$"):str2);
} 


const operate = function(a,operating,b){
    if (operating === '/' && (a === 0 || b ===0)) return alert('not allowed')
    switch(operating) {
        case '+':
            return add(a,b);
        case '-':
            return subtract(a,b);
        case '/':
            return divide(a,b);
        case 'x':
        case '*':
            return multiply(a,b);
        case '=':
            try {return numberA.textContent = operate(a , operating, b)}
            catch(err){numberA.textContent=b; numberB.textContent=''; operator.textContent=''}
    }
}

let check = false
   
const numberButtons = document.querySelectorAll('.numberButton')
const operatorButtons = document.querySelectorAll('.operator')
const equalsButton = document.querySelector('.equals')
const clearButton = document.querySelector('#clear')
const delButton = document.querySelector('#delete')
const dotButton = document.querySelector('.dot')


const appendNumber = function(bruh){
    if (numberB.textContent.length >= 25) {return}
    if (check === true){
        numberA.textContent = ''
        numberB.textContent = ''
        numberB.textContent += bruh
        return check = false
    } else {
        numberB.textContent += bruh
        return check = false
}};

const operatorFunction = function(thing){
    lastLetter = numberA.textContent.charAt(numberA.textContent.length -1)
        if ((numberA.textContent === '' && numberB.textContent === '') || numberB.textContent === '.') return;
        if (operatorButtonList.includes(lastLetter) && numberB.textContent === ''){
            numberA.textContent =' ' + numberA.textContent.slice(0, numberA.textContent.length-1) + ' ' + thing
        } else if (lastLetter === '='){
            numberA.textContent = numberB.textContent + ' ' + thing
            numberB.textContent = ''
            return check = false
        } else{
            numberA.textContent += ' ' + numberB.textContent
            numberA.textContent += ' ' + thing
            numberB.textContent = ''
}};

const equalsFunction = function(){
    if (numberA.textContent === '') return
    if (numberA.textContent.includes('=')){
        return
    }
    else{
        numberA.textContent += ' ' + numberB.textContent
        numberB.textContent = ''
        cleaned = numberA.textContent;
        cleaned = cleaned.replaceAll('x', '*');
        numberB.textContent = eval(cleaned); 
        numberA.textContent += ' ='; 
        return check = true
    }
}

const clearFunction = function(){
    numberA.textContent = '';
    numberB.textContent ='';
    return check = false
}

const delFunction = function(){
    numberB.textContent = numberB.textContent.slice(0, numberB.textContent.length - 1)
}

const makeNegative = function(){
    if (numberB.textContent === '.') return;
    if (numberA.textContent.charAt(numberA.textContent.length-1) === '='){
        numberA.textContent = ''
        return check = false
    }
    if (numberB.textContent.charAt(0) != '-'){
        numberB.textContent = '-' + numberB.textContent
    } else {
        numberB.textContent = numberB.textContent.slice(1)
    }
}

const dotFunction = function(){
    if (numberB.textContent.includes('.')){
        return;
    } else {
        numberB.textContent += '.'
        return check = false
    }
}

numberButtons.forEach(button =>{
    button.addEventListener('click', function(){
        appendNumber(this.textContent);
    })});

let operatorButtonList = ['*']
operatorButtons.forEach(button => {
    operatorButtonList.push(button.textContent)
    button.addEventListener('click', function(){
        operatorFunction(this.textContent)
    })
})

equalsButton.addEventListener('click', function(){
    equalsFunction()
})

clearButton.addEventListener('click', function(){
    clearFunction()
})

delButton.addEventListener('click', function(){
    delFunction()
})

dotButton.addEventListener('click', function(){
    dotFunction()
})


window.addEventListener('keydown', (e)=>{
    let value = e.key
    console.log(value)
    if (value>= 0 && value<=10){
        appendNumber(value)
    } else if (operatorButtonList.includes(value)) {
        operatorFunction(value)
    } else if (value === 'Enter'){
        equalsFunction()
    } else if (value === 'c' || value === 'C'){
        clearFunction()
    } else if (value === 'Backspace'){
        delFunction()
    } else if (value === '.'){
        dotFunction()
    } else return
})