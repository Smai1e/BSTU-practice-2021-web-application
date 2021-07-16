var dataList= [{
		"question": "В каком районе находится БГТУ?",
    	"answer": ["Володарсоком", "Бежицком", "Фокинском", "Советском"],
    	"key": 1
	}]

function contains(arr, elem) {

	for (var i = 0; i < arr.length; i++) {
		if (arr[i] === elem) {
			return true;
		}
	}
	return false;
}

function inputQuestion() {	
	var repeat = [-1];
	var index = 0;

	for (var i = 0; i < 14; i++) {
		index = Math.rand(0, data.length-1);

		while(contains(repeat, index)) {
			index = Math.rand(0, data.length-1);
		}
		
		repeat.push(index)

		dataList.push({
			question: data[index].question,
			answer: [
				data[index].answer[0],
				data[index].answer[1],
				data[index].answer[2],
				data[index].answer[3]],
			key: data[index].key}
			)
	}

	dataList.push({
		question: 'null',
		answer: 'null',
		key: 0
	})
}

var level = 0;

var name = 'name';	
var username = readCookie(name);

if (username != null) {	
	$('.start').css('display', 'none');
	$('.reStart').css('display', 'block');
	$('.hellow').text('С возвращением, ' + username + '!');

	$('#startGame').click(function() {
	
		$('.reStart').css('display', 'none');
		inputQuestion();
		$(tr.css('background','#fff'));
		$(tr[tr.length - (level + 1)]).css('background','#ff0');
		setTimeout(timer,1000);
	});
}

function show(level) {

	$('.question').text( [level+1] + '. ' + dataList[level].question );
	$('label[for=answer1]').text( 'A. ' + dataList[level].answer[0] );
	$('label[for=answer2]').text( 'B. ' + dataList[level].answer[1] );
	$('label[for=answer3]').text( 'C. ' + dataList[level].answer[2] );
	$('label[for=answer4]').text( 'D. ' + dataList[level].answer[3] );
}

var resultConst = [];		
show(level);
var tr = $('tr'); 
$(tr[tr.length - (level + 1)]).css('background','#ff0');

$('.btn').click(function() {
	
	$("#timer_inp").text(60);
	$("#timer_inp").css('background', '#ff0');

	if( $('input[name=answer]:checked').val() == dataList[level].key ) {
		level++;
		show(level);		
	} else {
		gameOver();
	}
	
	$('input').prop('checked', false);
	$(tr.removeClass('result'));
	$(tr[tr.length - (level + 1)]).css('background','#ff0');
	$(tr[tr.length - (level)]).css('background','#0f0');
	$(tr[tr.length - (level)]).addClass('result');
	$('label').css('color', '#555');

	if (level == 5 || level == 10 || level == 15) {
		 resultConst.push($(tr[tr.length - (level)]).addClass('resultConst'));
	}

	if(level == 15) {
		gameOver();
	}
})

Math.rand = function(min, max) {

	min = Math.ceil(min);
  	max = Math.floor(max);
  	return Math.floor(Math.random() * (max - min + 1)) + min;
}

var inputLabel = document.getElementsByTagName('label');

$('.round50').click(function() {

	var inputAnswer = document.getElementsByName('answer');
	var exp = [];	
	var count = 0;
	while(count < 2) {
		var index = Math.rand(0,3);
		if (exp.indexOf(index) == -1 && $(inputAnswer[index]).val() != dataList[level].key ) {
			$(inputLabel[index]).css('color', '#fff');

			count++;
			exp.push(index);
		}
	}
	$(this).off('click');
	$(this).css('background', 'red');
})
	 
function majortyOpinion() {

	var arr=[];

	for (var i = 0; i < 4; i++) {
		arr.push(i)
		if (i == dataList[level].key) {
			arr.push(i, i)
		}
	}

	$(inputLabel[arr[Math.rand(0,arr.length-1)]]).css('color', '#f90');
}

$('.round').click(function() {
		
	majortyOpinion();
	$(this).off('click');
	$(this).css('background', 'red');	
})

var result = $('.result'); 
$('.roundEnd').click(function() { end() })

function end() {

	$('.end').css('display', 'block');

	if (tr.hasClass('result')) {
		var tdResult = $("tr.result").children();
		var tdText = tdResult[1].textContent;	
		$('.showResult').text('ВЫ ВЫИГРАЛИ: ' + tdText + ' 💎');
	}
}

function gameOver() {

	$('.end').css('display', 'block');

	if (tr.hasClass('resultConst')) {
		var tdResult1 = $(resultConst[resultConst.length - 1]).children();
		var tdText1 = tdResult1[1].textContent;
		$('.showResult').text('ВЫ ВЫИГРАЛИ: ' + tdText1 + ' 💎');
	}
}

function timer(){

	var objTimer=document.getElementById('timer_inp');
	objTimer.innerHTML--;
  	
  	if(objTimer.innerHTML==5) {
		$('#timer_inp').css('background', 'red');
	}

	if(objTimer.innerHTML==0) {
		setTimeout(function(){},1000);
		gameOver();
	} else { 
		setTimeout(timer,1000);
	}
}

$('form').submit(function(e) { 
	e.preventDefault()
});

$('#start').click(function() {

	if ($('#user').val() != '') {
		$('.start').css('display', 'none');
		setTimeout(timer,1000);
	} else {
		$('#user').css('background', '#f30')
	}	

	var value = $('#user').val();

	createCookie(name, value, 1);
	inputQuestion();

	$(tr.css('background','#fff'));
	$(tr[tr.length - (level + 1)]).css('background','#ff0');
});

function createCookie(name, value, days) {

    if (days) {
    	var date = new Date();
    	date.setTime(date.getTime() + (days * 24 * 60 * 60 *1000));
    	var expires = "; expires=" + date.toGMTString();
    } else {
    	var expires = "";
    }
    document.cookie = name + "=" + value + expires + "; path=/";
}

function readCookie(name) {

    var nameEQ = name + "=";
    var ca = document.cookie.split(';');

    for(var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1,c.length);
        }
        if (c.indexOf(nameEQ) == 0) {
        	var value = c.substring(nameEQ.length,c.length);
            return value.split(",");
        }
    }
    return null;
}
