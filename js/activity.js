function CheckboxActivity($, context){
	Object.prototype.keys = function (){
		var keys = [];
		for(var i in this){
	  		if (this.hasOwnProperty(i)){
	    		keys.push(i);
	  		}
	  	}
		return keys;
	};

	// globals
	that = this;// we do this so the context of this (instance of the 
				//CheckboxActivity) can be refferred to when out of scope
	this.context = context;
	this.attrs = ["blank",
				 "Leads researcher to fixate on details", 
				 "Possible misinterpretations due to cultural differences",
				 "Requires technical training",
				 "Depends on cooperation of key individuals",
				 "Readily open to ethical dilemmas",
				 "Difficult to replicate",
				 ];

	this.objects = [// this is the object with a matches array
					// assign the key of the object to the correct 
					// match in the attrs array
					{"Participant Observation": [1,2,0,4,5,6]}, 
					{"Observation" : [1,2,0,0,5,6]}, 
					{"In-depth Interviews": [0,2,0,4,5,6]},
					{"Focus Groups": [0,2,0,0,0,6]},
					{"Document & AV Analysis": [1,2,0,4,5,6]}
					];

	this.submitButton = $('<button type="button"\
						   class="submit-button">Hello</submit>');
	this.createMatches = function(attrs, objects){
		window.objs= objects;
		//this function will create the objects();
		// with the correct attrsibutes
		for(i=0;i<objects.length;i++){
			var obj = objects[i];
			var key = obj.keys();
			var matchString =[];
			for(j=0;j<obj[key].length;j++){
				var attrsString = attrs[obj[key][j]];
				matchString.push(attrsString);
			}			
			objects[i].matches = matchString;
		}

	}

	this.createGrid = function(activity){
		var table = $("<table/>");
		var objs = $(activity.objects);
		var attrs = $(activity.attrs);
		attrs.each(function(i){
			var tr = $('<tr class="activity-row"></tr>');
			if (i>0){//account for added "blank" attribute	
				objs.each(function(j){
					var obj = objs[j];
					var classMatch = 'interactive match-' + obj[obj.keys()[0]][i-1];
					if(j==0){
						tr.append('<td class="row-header">'+ attrs[i] +'</td>');
					}
					tr.append('<td class="' + classMatch +'"></td>');
				})
				table.append(tr);
			}else{
				var columnRow = $('<tr class="column-row"/>');
				//insert a spacer ciolumn to account for the row headers
				columnRow.append('<td class="column-spacer">Method (top row) - Challenges (below)</td>')
				objs.each(function(k){
					var obj = objs[k];
					var columnHeader = obj.keys()[0];
					columnRow.append('<td class="column-header">' + columnHeader +'</th>');
				})
				table.append(columnRow);
			}
		})//end .each
		this.submitButton.click(function(){
			that.getAnswers();
		})
		this.context.append(table);
		this.context.append(this.submitButton)
		$('.interactive').click(function(){
			$(this).toggleClass('marked').append('X');
			if($(this).text() == 'XX'){
				$(this).empty();
			}
		})
	},// end createGrid()

	this.getAnswers = function(){
		var answerArr=[]
		$('.activity-row').each(function(){
			var row = $('.interactive', $(this));
			answerArr.push(row);
		})
		this.getColumnAnswers(answerArr);
	},

	this.getColumnAnswers = function(answerArr){
		// create array of objects with column as key
		// then compare to original objects object
		var returnedColumnSets = []
		var columnCnt = answerArr[0].length
		for(i=0;i<columnCnt;i++){
			var tmpArr = []
			for(j=0;j<answerArr.length;j++){
				tmpArr.push($($($(answerArr)[j])[i]).html())
			}
			returnedColumnSets.push(tmpArr);
		}//end for
			
		console.log(returnedColumnSets);	
	}

	//initialize the activity
	this.createMatches(this.attrs, this.objects);
}
	// create new Checkbox - the arguments are jQuery and 
	// where the activity should be places on the page
	var activity = new CheckboxActivity($, $('body'));
	activity.createGrid(activity);


