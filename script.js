// Functions for Math

const add = (a, b) => {a = a* 1000; b = b * 1000; return (a + b)/1000}
const subtract = (a, b) => {a = a* 1000; b = b * 1000; return (a - b)/1000}
const multiply = (a, b) => {return a*b}
const divide = (a,b) => {return a/b}

const operate = function(a,operator,b){

    switch(operator.textContent) {
        case '+':
            add(a,b);
            break;
        case '-':
            subtract(a,b);
            break;
        case '/':
            divide(a,b);
            break;
        case '*':
            multiply(a,b)
    }

}

const numberA = document.querySelector('#numberA').textContent
const operator = document.querySelector('#operator').textContent
const numberB = document.querySelector('#numberB').textContent

