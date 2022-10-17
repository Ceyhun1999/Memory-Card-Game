const game = document.getElementById('game');
const text = document.getElementById('text');
const timer = document.getElementById('timer');
const rule = document.getElementById('rule');
let code = '';
let arr = [];
let dataImg = [];
let dataFirstCell = [];
let gameOVer = 0;
let sec = 19;

// Creating a timer function
setInterval(function(){ 
    if(sec >= 0) {
        timer.innerHTML = sec;
        sec-- 
        if(timer.innerHTML == 0) {
            timer.innerHTML = ' ';
            rule.innerHTML = ' ';
        }
    }
},1000)

// Adding elements to array (we will use them to search for images)
for (let i = 1; i <= 8; i++) {
    arr.push(i);   
    arr.push(i);  
}

// Creating a table
for (let i = 1; i <= 4; i++) {
    code += '<tr>'
        for (let j = 1; j <= 4; j++) {
            let key = rand(0, arr.length - 1);
            code += `<td id="c${i}${j}" onclick=openBg(${i},${j},${arr[key]}) style="background: url('img/${arr[key]}.png') center/cover"></td>`;
            arr.splice(key, 1);
        }
    code += '</tr>'
}
game.innerHTML = code;

// Creating function a random (it is needed to randomly select pictures)
function rand(min, max) {
    return Math.floor(Math.random() * (max - min + 1) ) + min
}

// Creating a function for closed cells
function closeBg() {
    const tds = document.querySelectorAll('td');
    tds.forEach((item) => {
        item.style.transform = 'rotateY(180deg)'
        item.style.background = 'rgba(0, 0, 0, 0.56)';
    })
}
setTimeout(closeBg, 20000)

// Creating game functionality
function openBg(i, j, y) {
    const tds = document.querySelectorAll('td');
    const td1 = document.getElementById(`c${i}${j}`);
    if (td1.style.background == 'rgba(0, 0, 0, 0.56)') {
        td1.style.transform = 'rotateY(360deg)'
    td1.style.background = `url('img/${y}.png') center/cover`;
    setTimeout(() => { //This function checks if cells are the same or different.
        if (dataImg.length == 0) { //If the first cell opened
            dataImg.push(y);
            dataFirstCell = [i, j];
        } else if (dataImg.length != 0) { //If the second cell opened
            dataImg.push(y);                
            if (dataImg[0] != dataImg[1]) { //If they are different
                gameOVer += 1;
                const td2 = document.getElementById(`c${dataFirstCell[0]}${dataFirstCell[1]}`);
                td1.style.background = 'rgba(0, 0, 0, 0.56)';
                td2.style.background = 'rgba(0, 0, 0, 0.56)';
                td1.style.transform = 'rotateY(180deg)'
                td2.style.transform = 'rotateY(180deg)'
                dataImg = [];
                dataFirstCell = [];
                if(gameOVer == 3) { //If they were different 3 times
                    tds.forEach((item) => {
                        item.style.background = 'black'
                        text.innerHTML = 'Game Over'
                    })
                }
            } else if (dataImg[0] == dataImg[1]) { //If they are the same
                dataImg = [];
                dataFirstCell = [];
            }
        }
    }, 600)
    if (Array.from(tds).every(checkBg) == true ){ //This condition checks if the player has won
        setTimeout(youWin, 600)
        function youWin() {
            tds.forEach((item) => {
                item.style.background = 'green'
                text.innerHTML = 'You won'
            })
        }
    } 
    function checkBg(item) { //The function will return true if all cells are opened
        if (item.style.background != 'rgba(0, 0, 0, 0.56)' && item.style.background != 'black' )  return true;
    }
    }
}


