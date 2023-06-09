const numberA = document.querySelector('#numberA')
const numberB = document.querySelector('#numberB')
const add = (a, b) => {a = a* 1000; b = b * 1000; return (a + b)/1000}
const subtract = (a, b) => {a = a* 1000; b = b * 1000; return (a - b)/1000}
const multiply = (a, b) => {return a*b}
const divide = (a,b) => {return a/b}

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

numberButtons.forEach(button =>{
    button.addEventListener('click', function(){
        if (check === true){
            numberA.textContent = ''
            numberB.textContent = ''
            numberB.textContent += this.textContent
            return check = false
        } else {
            numberB.textContent += this.textContent
            return check = false
}})
});

let operatorButtonList = []
operatorButtons.forEach(button => {
    operatorButtonList.push(button.textContent)
    button.addEventListener('click', function(){
        lastLetter = numberA.textContent.charAt(numberA.textContent.length -1)
        if (operatorButtonList.includes(lastLetter) && numberB.textContent === ''){
            numberA.textContent = numberA.textContent.slice(0, numberA.textContent.length-1) + this.textContent
        } else if (lastLetter === '='){
            numberA.textContent = numberB.textContent + this.textContent
            numberB.textContent = ''
            return check = false
        } else{
            numberA.textContent += numberB.textContent
            numberA.textContent += this.textContent
            numberB.textContent = ''
        }
    })
})

equalsButton.addEventListener('click', function(){
    if (numberA.textContent === '') return
    if (numberA.textContent.includes('=')){
        return
    }
    else{
        numberA.textContent += numberB.textContent
        numberB.textContent = ''
        cleaned = numberA.textContent;
        cleaned = cleaned.replaceAll('x', '*');
        numberB.textContent = eval(cleaned);
        numberA.textContent += ' =';
        return check = true
    }
})