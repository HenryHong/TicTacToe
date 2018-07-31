var turn = 0;
var gamestate = 0;
var spaceLeft = 0;


function CheckWin(value){
	
	if(value == 3){
		document.getElementById('result').innerHTML = "Player1 Win";
		gamestate = 1;
	}
	else if(value == -3){
		document.getElementById('result').innerHTML = "Player2 Win";
		gamestate = 1;
	}
}


function textValue(Loc){
	txtVal = document.getElementById(Loc).innerHTML;
	if (txtVal == ""){
		return 0;
	}
	else if (txtVal == "X"){
		return 1;
	}
	else if (txtVal == "O"){
		return -1;
	}
}



function checkStatus (){
	var sumCheck;
	
	//Check all rows
	sumCheck = textValue('0:0') + textValue('0:1') +  textValue('0:2');
	CheckWin(sumCheck);
	sumCheck = textValue('1:0') + textValue('1:1') +  textValue('1:2');
	CheckWin(sumCheck);
	sumCheck = textValue('2:0') + textValue('2:1') +  textValue('2:2');
	CheckWin(sumCheck);
	
	//Check all Column
	sumCheck = textValue('0:0') + textValue('1:0') +  textValue('2:0');
	CheckWin(sumCheck);
	sumCheck = textValue('0:1') + textValue('1:1') +  textValue('2:1');
	CheckWin(sumCheck);
	sumCheck = textValue('0:2') + textValue('1:2') +  textValue('2:2');
	CheckWin(sumCheck);
	
	//Check Diagonal
	sumCheck = textValue('0:0') + textValue('1:1') +  textValue('2:2');
	CheckWin(sumCheck);
	sumCheck = textValue('0:2') + textValue('1:1') +  textValue('2:0');
	CheckWin(sumCheck);
	
	if (spaceLeft == 9 && gamestate == 0){
		document.getElementById('result').innerHTML = "Tie";
		gamestate = 1;
	}
}



function startTurn(){
	turn=Math.round(Math.random() * 1);
}


function Tic(){
	if (turn == 0){
		turn = 1;
		return "X";
	}
	else {
		turn = 0;
		return "O";
	}
}


function Board(containerId, rowsCount, colsCount) {
	
    var html = "<div class='ttt'><table>";
    for (var i = 0; i < rowsCount; i++) {
		html += "<tr id='row-" + i + "' class='row' >";
		for (var j = 0; j < colsCount; j++) {
			html += "<td id='" + cellId(i, j) + "' class='col' onclick='tdclick("+i+","+j+")'></td>";
        }
        html += "</tr>"
	}
    html += "</table></div>";
    document.getElementById(containerId).innerHTML = html;
};
 
 
function cellId(row, col) {
	var loc = row + ":" + col
    return  loc;
}


function tdclick(i, j){
	CellLoc = i + ":" + j;
	if (document.getElementById(CellLoc).innerHTML == "" && gamestate == 0){
		document.getElementById(CellLoc).innerHTML = Tic();
		spaceLeft += 1;
	}
	checkStatus();
}




Board('container', 3 , 3);