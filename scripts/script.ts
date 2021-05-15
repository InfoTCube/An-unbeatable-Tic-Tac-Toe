var moveCount : number = 0;
var whoStarts : number = Math.floor(Math.random() * 2);

let board : Array<number> = [];

window.onload = () => {
    startGame();
}

function startGame() : void {
    resetArray();
    whoStarts++;
    whoStarts %= 2;
    moveCount = 0;
    if(whoStarts === 1) {
        enemyMove();
    }
}

function move(id : string) : void {
    if(board[convertToNumber(id)] === 0) {
        board[convertToNumber(id)] = 1;
        updateBoard(id);
        moveCount++;
    }

    if(moveCount === 9 || checkWin() === true) {
        win();
    } else {
        enemyMove();
    }
}

function win() : void {
    alert("Somebody wins");
    //do win and who win
    //startGame();
}

function resetArray() : void {
    for(let i=0; i<9; ++i) {
        board[i] = 0;
        document.getElementById(convertToString(i)).innerHTML = "";
    }
}

function checkWin() : boolean {
    let result : boolean = false;
        if(equals(board[0], board[3], board[6])) {
            result = true;
        } else if(equals(board[1], board[4], board[7])) {
            result = true;
        } else if(equals(board[2], board[5], board[8])) {
            result = true;
        } else if(equals(board[0], board[1], board[2])) {
            result = true;
        } else if(equals(board[3], board[4], board[5])) {
            result = true;
        } else if(equals(board[6], board[7], board[8])) {
            result = true;
        } else if(equals(board[0], board[4], board[8])) {
            result = true;
        } else if(equals(board[2], board[4], board[6])) {
            result = true;
        }
    return result;
}

function enemyMove() {
    //do enemy move
}

function updateBoard(id : string) : void {
    var field : any = document.getElementById(id);
    if(board[convertToNumber(id)] === 1) {
        var sign : any = document.createElement("img");
        sign.className = "cross";
        sign.src = "assets/cross.svg";
        field.appendChild(sign);
    } else if(board[convertToNumber(id)] === 2) {
        var sign : any = document.createElement("div");
        sign.className = "circle center-children";
        var sign2 : any = document.createElement("div");
        sign2.className = "small-circle";
        sign.appendChild(sign2);
        field.appendChild(sign);
    }
}

function equals(a : number, b : number, c : number) : boolean {
    if(a ==- 0 || b === 0 || c == 0) {
        return false;
    }
    if(a === b && b == c) {
        return true;
    }
    return false;
}

function convertToNumber(num : string) : number {
    let out : number = 0;
    if(num === "one") {
        out = 0;
    } else if(num === "two") {
        out = 1;
    } else if(num === "three") {
        out = 2;
    } else if(num === "four") {
        out = 3;
    } else if(num === "five") {
        out = 4;
    } else if(num === "six") {
        out = 5;
    } else if(num === "seven") {
        out = 6;
    } else if(num === "eight") {
        out = 7;
    } else if(num === "nine") {
        out = 8;
    }
    return out;
}

function convertToString(num : number) : string {
    let out : string;
    if(num === 0) {
        out = "one";
    } else if(num === 1) {
        out = "two";
    } else if(num === 2) {
        out = "three";
    } else if(num === 3) {
        out = "four";
    } else if(num === 4) {
        out = "five";
    } else if(num === 5) {
        out = "six";
    } else if(num === 6) {
        out = "seven";
    } else if(num === 7) {
        out = "eight";
    } else if(num === 8) {
        out = "nine";
    }
    return out;
}
