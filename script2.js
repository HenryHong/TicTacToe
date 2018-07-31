var turn = 0;
var WhoStart = 0;
var gamestate = 0;
var spaceLeft = 0;
var MovesAva = []; 


function CreateAvaMoves (){
	for(var i = 0 ; i < 3 ; i++){
		for (var j = 0 ; j < 3 ; j ++){
			MovesAva.push(i+':'+j);
		}
	}
}

function RemoveMoves (move){
	var index = MovesAva.indexOf(move);
	if (index > -1) {
		MovesAva.splice(index, 1);
	}
}


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
	console.log(MovesAva);
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
	WhoStart=Math.round(Math.random() * 1);
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


function BotStart(){
	var i = Math.floor((Math.random() * 3));
	var j = Math.floor((Math.random() * 3));
	var CellLoc = i + ":" + j; 
	document.getElementById(CellLoc).innerHTML = Tic();
	RemoveMoves (CellLoc)
	spaceLeft += 1;
	checkStatus();
}



function BotTurn(){
	var Center = document.getElementById('1:1').innerHTML;
	var NumAvaMoves = MovesAva.length;
	var RandomMove = Math.floor((Math.random() * NumAvaMoves));
	
	if (Center != "X" && Center != "O"){
		document.getElementById('1:1').innerHTML = Tic();
		spaceLeft += 1;
		RemoveMoves ('1:1')
		checkStatus();
	}
	else {
		document.getElementById(MovesAva[RandomMove]).innerHTML = Tic();
		spaceLeft += 1;
		RemoveMoves (MovesAva[RandomMove]);
		checkStatus();
	}
}

function tdclick(i, j){
	var CellLoc = i + ":" + j;
	if (document.getElementById(CellLoc).innerHTML == "" && gamestate == 0){
		document.getElementById(CellLoc).innerHTML = Tic();
		spaceLeft += 1;
		RemoveMoves (CellLoc);
		checkStatus();
		if (gamestate == 0){
			setTimeout(function(){ BotTurn(); }, 250);
		}
	}
}


Board('container', 3 , 3);
CreateAvaMoves();
startTurn();
if ( WhoStart == 0 ){
	BotStart();
	document.getElementById('result').innerHTML = "House Start First";
}
else {
	document.getElementById('result').innerHTML = "You Start First";
}