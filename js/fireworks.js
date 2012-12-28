colors = ["red", "green", "white", "yellow", "lime", "aqua", "orange", "blue", "fuchsia"];
monthsQueue = new Queue();
daysQueue = new Queue();
topicCounter = 10;

function explode(o, callback) {
  var $o = $(o), counter = 0;

  $o.html($o.text().replace(/([\S])/g, "<span>$1</span>"));
  $o.css("position", "relative");
  $("span", $o).each(function(i) {
  	counter = counter + 1;
    var newTop = Math.floor(Math.random()*500)*((i%2)?1:-1),
    	newLeft = Math.floor(Math.random()*500)*((i%2)?1:-1),
    	startLeft = $o.width() / 2;
    $(this).css({position: "relative",
      opacity: 1,
      fontSize: 12,
      top: 0,
      left: startLeft
    }).animate({
      opacity: 0,
      fontSize: 84,
      top: newTop,
      left:newLeft
    },1000, function(){
    	counter = counter - 1;
    	if (counter == 0) callback();
    });
  });
}

function startFireworks(){
	$("#month").animate({"top": "60%"}, function(){
		for (month in trends) {
			monthsQueue.enqueue(month);
		}	
		triggerMonth();
	});
}

function triggerMonth() {
	var month, days, i=0;
	if (monthsQueue.isEmpty()) {
		fireYear();
		return;
	} else {
		month = monthsQueue.dequeue();
		fireMonth(month, function(){
			days = trends[month];
			while (i<days.length) {
				daysQueue.enqueue(days[i]);
				i++;
			}
			triggerDay();			
		})
	}
}

function triggerDay() {
	var i=0, day;
	if (daysQueue.isEmpty()) {
		triggerMonth();
		return;
	} else {
		day = daysQueue.dequeue();
		topicCounter = 10;
		while (i<day.length) {
			fireTopic(day[i], i+1);
			i++;
		}		
	}
}

function fireMonth(month, callback) {
	var monthElem = $("#month"),
		color = colors[Math.floor(Math.random()*colors.length)];
	monthElem.html("<h1>" + month + "</h1>");
	left = Math.round(0.5 * ($(window).width() - monthElem.width()));
	monthElem.css({
		"top":"70%",
		"left": left,
		"color": color,
		"text-shadow": "0.1em 0.1em 0.1em " + color
	});
	
	monthElem.animate({"top": "15%"}, 1200, function(){
		explode(monthElem.find("h1"), callback);
	});

}

function fireYear() {
	var color = colors[Math.floor(Math.random()*colors.length)],
		monthElem = $("#month");
	monthElem.html("<h1>HAPPY 2013!</h1>");
	monthElem.css({
		"font-size":"70pt",
		"top":"70%",
		"color": color,
		"text-shadow": "0.1em 0.1em 0.1em " + color
	});
	left = Math.round(0.5 * ($(window).width() - monthElem.width()));
	monthElem.css({
		"left": left,
	});	
	monthElem.animate({"top": "15%"}, 1200, function(){
		explode(monthElem.find("h1"), callback);
	});

}

function fireTopic(topic, index) {
	var topicElem = $('#topic' + index),
		delay = Math.round(3000 * Math.random()),
		left, top = Math.round(30 * Math.random() + 5),
		color = colors[Math.floor(Math.random()*colors.length)],
		size = Math.min(Math.max(Math.round(topic.data[0][1] * 2), 15), 40);
	topicElem.html("<h1>"+ topic.label.replace("\\","") + "</h1>");
	console.log(size);
	topicElem.css({
		"top":"70%",
		"color": color,
		"text-shadow": "0.1em 0.1em 0.1em " + color,
		"font-size": size + "pt"
	});
	left = Math.round(Math.random() * ($(window).width() - topicElem.width()));
	topicElem.css({
		"left": left+"px"
	});
		
	topicElem.delay(delay).animate({"top":top+"%"}, 1500, function(){
		explode(topicElem.find("h1"), function (){
			topicCounter = topicCounter - 1;
			if (topicCounter <= 0) {
				triggerDay();
			}			
		});
	});
}
