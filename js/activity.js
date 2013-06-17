function CheckboxActivity($){
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
	this.attrs = ["Leads researcher to fixate on details", 
				 "Possible misinterpretations due to cultural differences",
				 "Requires technical training",
				 "Depends on cooperation of key individuals",
				 "Readily open to ethical dilemmas",
				 "Difficult to replicate",
				 ];

	this.objects = [// this is the object with a matches array
					{"Participant Observation": [0,1,3,4,5]}, 
					{"Observation" : [0,1,3,5]}, 
					{"In-depth Interviews": [1,3,4,5]},
					{"Focus Groups": [1,5]},
					{"Document & AV Analysis": [0,1,3,4,5]}
					];


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
			objs.each(function(j){
				var obj = objs[j];
				tr.append('<td class=""' + obj.keys()[0] +'</td>');
			})
			table.append(tr);
		})

		$('body').append(table);
	}

	//initialize the activity
	this.createMatches(this.attrs, this.objects);
}

	var activity = new CheckboxActivity($);
	activity.createGrid(activity);


