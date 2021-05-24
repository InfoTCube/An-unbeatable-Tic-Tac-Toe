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
    whoStarts = 0;
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
        checkStatus(true);
    }
}

function win(whoWon : number) : void {
    if(whoWon === 1) {
        location.href = 'win.html';
    } else if(whoWon === 2) {
        location.href = 'defeat.html';
    }
}

function checkStatus(player : boolean) : void {
    if(checkWin() !== 0) {
        win(checkWin());
    } else if(moveCount === 9) {
        draw();
    } else if(player) {
        enemyMove();
    }
}

function draw() : void{
    location.href = 'draw.html';
}

function resetArray() : void {
    for(let i=0; i<9; ++i) {
        board[i] = 0;
        document.getElementById(convertToString(i)).innerHTML = "";
    }
}

function checkWin() : number {
    let result : number = 0;
        if(equals(board[0], board[3], board[6])) {
            result = board[0];
        } else if(equals(board[1], board[4], board[7])) {
            result = board[1];
        } else if(equals(board[2], board[5], board[8])) {
            result = board[2];
        } else if(equals(board[0], board[1], board[2])) {
            result = board[0];
        } else if(equals(board[3], board[4], board[5])) {
            result = board[3];
        } else if(equals(board[6], board[7], board[8])) {
            result = board[6];
        } else if(equals(board[0], board[4], board[8])) {
            result = board[0];
        } else if(equals(board[2], board[4], board[6])) {
            result = board[2];
        }
    return result;
}

function updateBoard(id : string) : void {
    var field : any = document.getElementById(id);
    if(board[convertToNumber(id)] === 1) {
        var sign : any = document.createElement("img");
        sign.className = "cross";
        sign.src = "../assets/cross.svg";
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
    if(a == 0 || b === 0 || c == 0) {
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
    let out : string = "bad number";
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

function enemyMove() {

    if(moveCount === 0) {

    } else if(AICloseToWin() !== -1) {
        let place : number = AICloseToWin();
        board[place] = 2;
        updateBoard(convertToString(place));
        moveCount++;
    } else if(playerCloseToWin() !== -1) {
        let place : number = playerCloseToWin();
        board[place] = 2;
        updateBoard(convertToString(place));
        moveCount++;
    } else if(moveCount === 1 && defense() !== -1) {
        let place : number = defense();
        board[place] = 2;
        updateBoard(convertToString(place));
        moveCount++;
    } else if(moveCount === 3 && crossAttackDefense() !== -1) {
        let place : number = crossAttackDefense();
        board[place] = 2;
        updateBoard(convertToString(place));
        moveCount++;
    } else if(moveCount % 2 === 1 && fight() !== -1) {
        let place : number = fight();
        board[place] = 2;
        updateBoard(convertToString(place));
        moveCount++;
    }  else {
        let place : number = random();
        board[place] = 2;
        updateBoard(convertToString(place));
        moveCount++;
    }
    checkStatus(false);
}

function getOtherSideVertex(vertex : number) : number {
    switch(vertex) {
        case 0:
            return 8;
        case 2:
            return 6;
        case 6:
            return 2;
        case 8: 
            return 0;
        default:
            throw("Wrong vertex!");
    }
}

function playerCloseToWin() : number {
    let result : number = -1;
        if(closeTo(board[0], board[3], board[6]) !== 0) {
            let option: number = closeTo(board[0], board[3], board[6]);
            if(option === 1) {
                result = 0;
            } else if(option === 2) {
                result = 3;
            } else if(option === 3) {
                result = 6;
            }
        } else if(closeTo(board[1], board[4], board[7]) !== 0) {
            let option: number = closeTo(board[1], board[4], board[7]);
            if(option === 1) {
                result = 1;
            } else if(option === 2) {
                result = 4;
            } else if(option === 3) {
                result = 7;
            }
        } else if(closeTo(board[2], board[5], board[8]) !== 0) {
            let option: number = closeTo(board[2], board[5], board[8]);
            if(option === 1) {
                result = 2;
            } else if(option === 2) {
                result = 5;
            } else if(option === 3) {
                result = 8;
            }
        } else if(closeTo(board[0], board[1], board[2]) !== 0) {
            let option: number = closeTo(board[0], board[1], board[2]);
            if(option === 1) {
                result = 0;
            } else if(option === 2) {
                result = 1;
            } else if(option === 3) {
                result = 2;
            }
        } else if(closeTo(board[3], board[4], board[5]) !== 0) {
            let option: number = closeTo(board[3], board[4], board[5]);
            if(option === 1) {
                result = 3;
            } else if(option === 2) {
                result = 4;
            } else if(option === 3) {
                result = 5;
            }
        } else if(closeTo(board[6], board[7], board[8]) !== 0) {
            let option: number = closeTo(board[6], board[7], board[8]);
            if(option === 1) {
                result = 6;
            } else if(option === 2) {
                result = 7;
            } else if(option === 3) {
                result = 8;
            }
        } else if(closeTo(board[0], board[4], board[8]) !== 0) {
            let option: number = closeTo(board[0], board[4], board[8]);
            if(option === 1) {
                result = 0;
            } else if(option === 2) {
                result = 4;
            } else if(option === 3) {
                result = 8;
            }
        } else if(closeTo(board[2], board[4], board[6]) !== 0) {
            let option: number = closeTo(board[2], board[4], board[6]);
            if(option === 1) {
                result = 2;
            } else if(option === 2) {
                result = 4;
            } else if(option === 3) {
                result = 6;
            }
        }
    return result;
}

function closeTo(a : number, b : number, c : number) : number {
    if(a === 1 && a === b && c !== 2) {
        return 3;
    } else if(a === 1 && a === c && b !== 2) {
        return 2;
    } else if(b === 1 && b === c && a !== 2) {
        return 1;
    }
    return 0;
}

function AICloseToWin() : number {
    let result : number = -1;
        if(AIcloseTo(board[0], board[3], board[6]) !== 0) {
            let option: number = AIcloseTo(board[0], board[3], board[6]);
            if(option === 1) {
                result = 0;
            } else if(option === 2) {
                result = 3;
            } else if(option === 3) {
                result = 6;
            }
        } else if(AIcloseTo(board[1], board[4], board[7]) !== 0) {
            let option: number = AIcloseTo(board[1], board[4], board[7]);
            if(option === 1) {
                result = 1;
            } else if(option === 2) {
                result = 4;
            } else if(option === 3) {
                result = 7;
            }
        } else if(AIcloseTo(board[2], board[5], board[8]) !== 0) {
            let option: number = AIcloseTo(board[2], board[5], board[8]);
            if(option === 1) {
                result = 2;
            } else if(option === 2) {
                result = 5;
            } else if(option === 3) {
                result = 8;
            }
        } else if(AIcloseTo(board[0], board[1], board[2]) !== 0) {
            let option: number = AIcloseTo(board[0], board[1], board[2]);
            if(option === 1) {
                result = 0;
            } else if(option === 2) {
                result = 1;
            } else if(option === 3) {
                result = 2;
            }
        } else if(AIcloseTo(board[3], board[4], board[5]) !== 0) {
            let option: number = AIcloseTo(board[3], board[4], board[5]);
            if(option === 1) {
                result = 3;
            } else if(option === 2) {
                result = 4;
            } else if(option === 3) {
                result = 5;
            }
        } else if(AIcloseTo(board[6], board[7], board[8]) !== 0) {
            let option: number = AIcloseTo(board[6], board[7], board[8]);
            if(option === 1) {
                result = 6;
            } else if(option === 2) {
                result = 7;
            } else if(option === 3) {
                result = 8;
            }
        } else if(AIcloseTo(board[0], board[4], board[8]) !== 0) {
            let option: number = AIcloseTo(board[0], board[4], board[8]);
            if(option === 1) {
                result = 0;
            } else if(option === 2) {
                result = 4;
            } else if(option === 3) {
                result = 8;
            }
        } else if(AIcloseTo(board[2], board[4], board[6]) !== 0) {
            let option: number = AIcloseTo(board[2], board[4], board[6]);
            if(option === 1) {
                result = 2;
            } else if(option === 2) {
                result = 4;
            } else if(option === 3) {
                result = 6;
            }
        }
    return result;
}

function AIcloseTo(a : number, b : number, c : number) : number {
    if(a === 2 && a === b && c === 0) {
        return 3;
    } else if(a === 2 && a === c && b === 0) {
        return 2;
    } else if(b === 2 && b === c && a === 0) {
        return 1;
    }
    return 0;
}

function defense() : number {
    let result : number = -1;
    if(board[0] == 1 || board[2] == 1 || board[6] == 1 || board[8] == 1) {
        result = 4;
    } else if(board[1] == 1 || board[3] == 1 || board[5] == 1 || board[7] == 1) {
        result = 4;
    } else if(board[4] == 1) {
        result = 0;
    }
    return result;
}

function fight() : number {
    let result : number = -1;
    if(emptyCenter(board[0], board[4], board[8]) !== 0) {
        let option: number = emptyCenter(board[0], board[4], board[8]);
        if(option === 1) {
            result = 0;
        } else if(option === 2) {
            result = 4;
        } else if(option === 3) {
            result = 8;
        }
    } else if(emptyCenter(board[2], board[4], board[6]) !== 0) {
        let option: number = emptyCenter(board[2], board[4], board[6]);
        if(option === 1) {
            result = 2;
        } else if(option === 2) {
            result = 4;
        } else if(option === 3) {
            result = 6;
        }
    } else if(emptyPlace(board[0], board[3], board[6]) !== 0) {
        let option: number = emptyPlace(board[0], board[3], board[6]);
        if(option === 1) {
            result = 0;
        } else if(option === 2) {
            result = 3;
        } else if(option === 3) {
            result = 6;
        }
    } else if(emptyPlace(board[1], board[4], board[7]) !== 0) {
        let option: number = emptyPlace(board[1], board[4], board[7]);
        if(option === 1) {
            result = 1;
        } else if(option === 2) {
            result = 4;
        } else if(option === 3) {
            result = 7;
        }
    } else if(emptyPlace(board[2], board[5], board[8]) !== 0) {
        let option: number = emptyPlace(board[2], board[5], board[8]);
        if(option === 1) {
            result = 2;
        } else if(option === 2) {
            result = 5;
        } else if(option === 3) {
            result = 8;
        }
    } else if(emptyPlace(board[0], board[1], board[2]) !== 0) {
        let option: number = emptyPlace(board[0], board[1], board[2]);
        if(option === 1) {
            result = 0;
        } else if(option === 2) {
            result = 1;
        } else if(option === 3) {
            result = 2;
        }
    } else if(emptyPlace(board[3], board[4], board[5]) !== 0) {
        let option: number = emptyPlace(board[3], board[4], board[5]);
        if(option === 1) {
            result = 3;
        } else if(option === 2) {
            result = 4;
        } else if(option === 3) {
            result = 5;
        }
    } else if(emptyPlace(board[6], board[7], board[8]) !== 0) {
        let option: number = emptyPlace(board[6], board[7], board[8]);
        if(option === 1) {
            result = 6;
        } else if(option === 2) {
            result = 7;
        } else if(option === 3) {
            result = 8;
        }
    }
    return result;
}

function emptyPlace(a : number, b : number, c : number) : number {
    if(a === 0 && b == 0 && c === 2) {
        return 1;
    } else if(a === 2 && b === 0 && c === 0) {
        return 3;
    } else if(a === 0 && b === 2 && c === 0) {
        return 1;
    }
    return 0;
}

function emptyCenter(a : number, b : number, c : number) : number {
    if(a === 0 && b == 0 && c === 2) {
        return 2;
    } else if(a === 2 && b === 0 && c === 0) {
        return 2;
    } else if(a === 0 && b === 2 && c === 0) {
        return 1;
    }
    return 0;
}

function crossAttackDefense() : number {
    let result : number = -1;
    if(board[0] == 1 && board[4] == 2 && board[8] == 1) {
        result = 5;
    } else if(board[2] == 1 && board[4] == 2 && board[6] == 1) {
        result = 5;
    }
    return result;
}

function random() : number {
    let result : number = -1;
    if(board[0] == 0) {
        result = 0;
    } else if(board[1] == 0) {
        result = 1;
    } else if(board[2] == 0) {
        result = 2;
    } else if(board[3] == 0) {
        result = 3;
    } else if(board[4] == 0) {
        result = 4;
    } else if(board[5] == 0) {
        result = 5;
    } else if(board[6] == 0) {
        result = 6;
    } else if(board[7] == 0) {
        result = 7;
    } else if(board[8] == 0) {
        result = 8;
    }
    return result;
}