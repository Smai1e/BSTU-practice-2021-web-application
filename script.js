var question = ['1. В каком районе находится БГТУ?','2. Какое название носил БГТУ с 1945 по 1995 год?','3. Сколько учебных корпусов в БГТУ?','4. Какого факультета НЕТ в БГТУ?','5. О визите в Бежицу какого императора напоминает картина в холле 1-го корпуса БГТУ?','6. В каком из корпусов БГТУ находится кафедра ИиПО?','7. Чьё имя носит политехнический колледж, являющийся подразделением БГТУ?','8. В каком году в БГТУ был создан Инжиниринговый центр?','9. Что принято вручать во время ритуала посвящения в студенты БГТУ?','10. Кто выступил перед трудящимися Бежицы в здании первого коруса БГТУ в 1927 году?','11. В каком году БГТУ был образован?','12. В каком году была образована кафедра ИиПО в БГТУ?','13. На базе какого завода был открыт Бежицкий рабфак, ставший основой для создания БГТУ?','14. В какой город был эвакуирован БГТУ во время войны?','15. Каким орденом был награждён БГТУ в 1979 году?'];
var answer = ['A. Володарсоком','B. Бежицком','C. Фокинском','D. Советском',  'A. БГУ','B. БГИТУ','C. БИТМ','D. ДГТУ', 'A. 4','B. 3','C. 2','D. 1', 'A. УНТИ','B. МТФ','C. ФЭЭ','D. ФСС', 'A. Николая II','B. Николая I','C. Александра III','D. Александра II', 'A. 1','B. 2','C. 3','D. 4', 'A. С.М. Кирова','B. В.В. Куйбышева','C. Н.В. Куйбышева','D. Н.А. Кубяка', 'A. 2000','B. 2005','C. 2010','D. 2015', 'A. Учебник истории ВУЗа','B. Хрустальную фигурку совы','C. Символическую Зачётную книжку','D. Ключ от библиотеки', 'A. Николай II','B. Н.К. Крупская','C. Л.Д. Троцкий','D. В.И. Ленин', 'A. 1919','B. 1929','C. 1949','D. 1969', 'A. 1979','B. 1989','C. 1999','D. 2009', 'A. "Красный Октябрь"','B. "Брянский арсенал"','C. "Красный Профинтерн"','D. "Бежицкий сталелитейный завод"', 'A. Нижний Тагил','B. Нижневартовск','C. Нижнекамск','D. Нижний Новгород', 'A. "Знак почёта"','B. "Ленина"','C. "Трудового Красного Знамени"','D. "Дружбы народов"'];
var key = [1, 2, 0, 3, 0, 1, 3, 3, 2, 1, 1, 1, 2, 0, 0];

var level = 0;

var name = 'name';	
var username = readCookie(name);

if (username != null) 
{	
	$('.start').css('display', 'none');
	$('.reStart').css('display', 'block');
	$('.hellow').text('С возвращением, ' + username + '!');

	$('#startGame').click(function(){
	
		$('.reStart').css('display', 'none');
		setTimeout(timer,1000);

	});
}

function show(level) {

	$('.question').text( question[level] );
	$('label[for=answer1]').text( answer[level*4+0] );
	$('label[for=answer2]').text( answer[level*4+1] );
	$('label[for=answer3]').text( answer[level*4+2] );
	$('label[for=answer4]').text( answer[level*4+3] );

}

var resultConst = [];		
show(level);
var tr = $('tr'); 
$(tr[tr.length - (level + 1)]).css('background','#FF0');

$('.btn').click(function(){

	$("#timer_inp").text(60);

	if( $('input[name=answer]:checked').val() == key[level] )
	{
		level++;
		show(level);		
	}
	else{gameOver()}
	
	$('input').prop('checked', false);
	$(tr.css('background','#fff'));
	$(tr.removeClass('result'));
	$(tr[tr.length - (level + 1)]).css('background','#FF0');
	$(tr[tr.length - (level)]).css('color','#6f0');
	$(tr[tr.length - (level)]).addClass('result');
	$('label').css('color', '#555');

	if (level == 5 || level == 10 || level == 15) 
	{
		 resultConst.push($(tr[tr.length - (level)]).addClass('resultConst'));
	}

	if(level == 15)
	{
		gameOver();
	}
})

Math.rand = function(min, max){
	return Math.round(Math.random() * (max-min) + min);
}

var inputLabel = document.getElementsByTagName('label');
$('.round50').click(function(){
var inputAnswer = document.getElementsByName('answer');
var exp = [];	
var count = 0;
	while(count < 2) {
		var index = Math.rand(0,3);
		if (exp.indexOf(index) == -1 && $(inputAnswer[index]).val() != key[level] ) 
		{
			$(inputLabel[index]).css('color', '#fff');
			count++;
			exp.push(index);
		}
	}
		$(this).off('click');
		$(this).css('background', 'red');
})
	 

$('.round').click(function(){
		
		$(inputLabel[Math.rand(0,3)]).css('color', '#F90'),
		$(this).off('click');
		$(this).css('background', 'red');
		
})

var result = $('.result'); 
$('.roundEnd').click(function(){

	end();

})


function end() {

	$('.end').css('display', 'block');

	if (tr.hasClass('result')) 
	{
		var tdResult = $("tr.result").children();
		var tdText = tdResult[1].textContent;	
		$('.showResult').text('ВЫ ВЫИГРАЛИ: ' + tdText + ' рублей');
	}
}

function gameOver() {

	$('.end').css('display', 'block');

	if (tr.hasClass('resultConst')) 
	{
		var tdResult1 = $(resultConst[resultConst.length - 1]).children();
		var tdText1 = tdResult1[1].textContent;
		$('.showResult').text('ВЫ ВЫИГРАЛИ: ' + tdText1 + ' рублей');
	}
}

function timer(){

	 var objTimer=document.getElementById('timer_inp');
	 objTimer.innerHTML--;
  	
  	 if(objTimer.innerHTML==5)
	 	{
	 		$('#timer_inp').css('background', 'red');
	 	}
	 if(objTimer.innerHTML==0)
		{
	 		setTimeout(function(){},1000);
	 		gameOver();
		}
	 else{setTimeout(timer,1000)}

}

$('form').submit(function(e){ 

	e.preventDefault()
	
});

$('#start').click(function(){

	if ($('#user').val() != '') 
	{
		$('.start').css('display', 'none');
		setTimeout(timer,1000);
	}
	else
	{
		$('#user').css('background', '#f30')
	}	

	var value = $('#user').val();

	createCookie(name, value, 1);

});

function createCookie(name, value, days) {
    if (days) 
    {
        var date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 *1000));
        var expires = "; expires=" + date.toGMTString();
    }
    else 
    {
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
