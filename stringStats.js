/*************************************
stringStats.js

Copyright (c) 2016 John Kressel

Permission is hereby granted, free of charge, to any person obtaining a 
copy of this software and associated documentation files (the "Software"), 
to deal in the Software without restriction, including without limitation 
the rights to use, copy, modify, merge, publish, distribute, sublicense,
and/or sell copies of the Software, and to permit persons to whom the Software
is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all 
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED,
INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A 
PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION 
OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE
OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

*************************************/

var stringStats = {

	auto: function(){
	/************** Define Variables used by function ***********/
	var params = arguments[0];
	var modeObj = new Object();
	var chars = [];
	var maxNum = 1;
	var currentMax = 1;
	var arr = new Array();
	var totalChars = 1;
	var lowestNumber = 1;
	var init;
	var least = [];
	 
	
	typeof params.input !== 'string' ? arr = params.input : null; //If input is array, set array equal to input

	// If words parameter is false, treat as characters otherwise, treat as characters and split along spaces 
	if (params.words === false){
		var tempStr = params.input.replace(/\s+/g, '');
		arr = tempStr.split("");
	 }
	 else if (params.words === true){
	 	var tempStr = params.input.replace(/\s+/g, ' ');
	 	tempStr = tempStr.replace(/[.,\/#!$%\^&\*;:{}+£=\-_`~()]/g,"")
		arr = tempStr.split(" ");
	 }

	 // Check case parameter. Set the case of the array accordingly
	if ((params.caseUpper === true)&&(typeof params.caseUpper !== 'undefined')){
		arr = arr.map(function(x){ return x.toUpperCase() });
	}else if((params.caseUpper === false)&&(typeof params.caseUpper !== 'undefined')){
		arr = arr.map(function(x){return x.toLowerCase()});
	}	
	arr.sort();	// Sort array to group like terms together
	chars.push(arr[0]); // Add first element of input to the equal Array to start checking process
	least.push(arr[0]); // Add first element of input to the least Array
	
	// If input length is not greater than 0, return error
	if (!arr.length > 0){
		return modeObj = {
			mode: "No Input",
			modeNumber: "No Input",
			totalItems: "No Input",
			leastNumber: "No Input",
			least: "No Input"
		};
	}
	
	/******* Begin loop to find all of the good stuff! NOTE: Array starts at element 1 (second element in the array)*******/
	for (var i = 1; i <arr.length; i++) {

		if (arr[i] === arr[i - 1]){ //If current item in Array is the same as the previous item in the array
			currentMax++; // Add 1 to the count of Current Max
						
			if (currentMax === maxNum) {
				
				chars.push(arr[i]); // If Current Max number is the same as the all time max, add item to the modal array
				

			}else if(currentMax > maxNum) {
				/****** If Current Max is greater than max, set max equal to current max and reset modal array, adding current element ********/
				maxNum = currentMax;
				
				chars.length = 0;
				chars.push(arr[i]);
				
		}	
		}else{
			
			
			maxNum ==1 ? chars.push(arr[i]) : null; // If max is 1, then all get added to the modal array

			if (currentMax < lowestNumber && init == 1) { 
			/****** If current max is less than lowest 
			number and is not the first time, 
			add current element to least array *******/
				least.length = 0;
				least.push(arr[i -1]);
				/****** If current max is equal to lowest number and is not first time, add previous item to array ******/
			}else if(currentMax == lowestNumber && init ==1){
				least.push(arr[i-1]);
			}
			
			lowestNumber = (lowestNumber > currentMax) ? currentMax : lowestNumber;

			// Ensure that lowest number has a base reference to the first group in the array
			typeof init === 'undefined' ? (init = 1, lowestNumber = currentMax) : null;
			
			currentMax = 1;
			totalChars++;

		}
	
	};
	// Check for various things which may result in a false answer
	if (chars.length == arr.length || totalChars*maxNum == arr.length) {
		chars.length = 0;
		chars.push("No mode");
	}
	if (least.length == arr.length || totalChars*maxNum == arr.length) {
		least.length = 0;
		least.push("No least used");
	}else{
	if (lowestNumber > currentMax){
		least.length = 0;
		least.push(arr[arr.length -1]);
	}
	if (lowestNumber === currentMax){
		least.push(arr[arr.length -1]);
	}
}
/******* This function returns an object to facilitate easier access of returned info ********/
return modeObj = {
	mode: chars,
	modeNumber: maxNum,
	totalItems: totalChars,
	leastNumber: lowestNumber,
	least: least
};
},
	instances: function(){
		var arr = new Array();
		var modeObj = new Object();
		var charCount = 0
		var params = arguments[0];

		// Check input to check against exists
		var charToCheck = (typeof params.check !== 'undefined')? params.check : null;
		
		if (typeof params.input !== "string"){
			arr = params.input;

		}
		// Determine type of input to work with. This parameter is not an option and is therefore, a requirement.
		if (params.words === false){

			var tempStr = params.input.replace(/\s+/g, '');
			arr = tempStr.split("");

			//OPTIONAL! If input does not consist of words, it is possible to change the case of upper or lower case
			if ((params.caseUpper === true)&&(typeof params.caseUpper !== 'undefined')){
				arr = arr.map(function(x){ return x.toUpperCase() });
			}else if((params.caseUpper === false)&&(typeof params.caseUpper !== 'undefined')){
				arr = arr.map(function(x){return x.toLowerCase()});
			}	

	 	}
	 	else if (params.words === true){

	 		var tempStr = params.input.replace(/\s+/g, ' ');
	 		tempStr = tempStr.replace(/[.,\/#!$%\^&\*;:{}+£=\-_`~()]/g,""); // Remove all characters from words so that only words are returned
			arr = tempStr.split(" ");

	 	}

	 	arr.sort(); // Groups like terms together so that the loop can cycle through more easily

	 	// Stop if not checkable 
		if ((typeof charToCheck === 'undefined') || (!arr.length > 0)){ 
			return modeObj = {
				instances: "None"
			};
		}
		
		// Cycle through items in the array
		for (var i = 0; i <arr.length; i++){
			charToCheck === arr[i] ? charCount++ : null;
			
		}
		
		// Return number of times the specified input appeared
		return modeObj = {

			instances: charCount
	
		};

		
	},
	specifiedNumber: function(){

		var modeObj = new Object();
		var	charsEqual = [];
		var charsGreater = [];
		var charsLess = [];
		var params = arguments[0];
		var currentMax = 1;
		var currentMaxSave = 1;
		var arr = new Array();
		var totalChars = 1;
		var charCount = 0;
		var used = 0;
		
		// Get input number. REQUIRED!
		var maxNum = (typeof params.number !== 'undefined') ? params.number : 1;

		// Check type of input
		if (typeof params.input !== "string"){
			arr = params.input;
		}
		else{
			var tempStr = params.input.replace(/\s+/g, '');
			arr = tempStr.split("");
		} 	

		arr.sort(); // Group like terms together
	
		charsLess[0] = arr[0]; // Starting point for the loop, set first item in less then array equal to the first input item
		
		// End if error
		if ((maxNum === 1 || maxNum <1) || (!arr.length > 0)){ 
			return modeObj = {
				lessThan: "None",
				totalItems: "None",
				equal: "All",
				greaterThan: "None"
			};
		}
	
	
		// Start loop
		for (var i = 1; i <arr.length; i++) {


		
		if (arr[i] == arr[i - 1]){
			// Increment current max if current item in array is equal to previous
			currentMax++;
		
			
			if (currentMax === maxNum) {
				// Add current item to the equal array if current max is equal to the specified number
				charsEqual.push(arr[i]);
				

			
			}
			else if(currentMax > maxNum && used === 0) { 
				used = 1; // Make sure that an item is added no more than once to the array
				charsGreater.push(arr[i]);
				currentMaxSave = currentMax;
			}
		}else{
			used = 0; // Reset used indicator so that current item can be added to more than if needed
			
			currentMax >= maxNum ? charsLess.pop() : null;	// Remove item from Less Than array if current max is greater than or equal to max number
			currentMax > maxNum ? charsEqual.pop() : null;	// Remove item from equal array if current max is greater than max number
			// If only one of each, add to equal array, else, start new cycle by adding to the less than array
			maxNum === 1 ? charsEqual.push(arr[i]) : charsLess.push(arr[i]); 

			//Reset current max; increment total
			currentMax = 1;
			totalChars++;

		}
	
	
		}

		// Various checks for last item
		currentMax >= maxNum ? charsLess.pop() : null;
		currentMax > maxNum ? charsEqual.pop() : null;
		currentMax > maxNum +1 ? charsGreater.pop() : null;

		// Check output is valid
		charsLess.length === 0 ? charsLess.push("No matches") : null;
		charsGreater.length === 0 ? charsGreater.push("No matches") : null;
		charsEqual.length === 0 ? charsEqual.push("No matches") : null;



		// Return object
		return modeObj = {
			lessThan: charsLess,
			totalItems: totalChars,
			equal: charsEqual,
			greaterThan: charsGreater
		};

	},


	patterns: function(){
		var params = arguments[0];
		var modeObj = new Object();
		var chars = [];
		var maxNum = 1;
		var isArray = false;
		var currentMax = 1;
		var arr = new Array();
		var tempArr = new Array();
		var totalChars = 1;
		var lowestNumber = 1;
		var init;
		var patternLength;
		var least = [];
	 
	// End if input number is not provided, or is not greater than 1
	if (! params.number > 1){
		return modeObj = {
			mode: "No Input",
			modeNumber: "No Input",
			leastNumber: "No Input",
			least: "No Input"
		};
	}

	// Turn input array into array of items which are the length given
	if (typeof params.input != "string"){
		tempArr = params.input;
		
		for (var i = 0; i < tempArr.length - params.number; i++){
			var numToIncrease = 1;
			var tempStr = tempArr[i];
			while (numToIncrease < params.number){
			tempStr += tempArr[i + numToIncrease];
			numToIncrease++;
			}
		
			arr.push(tempStr);
		}
		
	} 
	// Turn input string into array of items which are the length given
	else {
		tempArr = params.input.split("");

		for (var i = 0; i < tempArr.length - params.number; i++){
			var numToIncrease = 1;
			var tempStr = tempArr[i];
			while (numToIncrease < params.number){
				tempStr += tempArr[i + numToIncrease];
				numToIncrease++;
			}
		
			arr.push(tempStr);
		}
	}
	
	
		arr.sort(); // Group like items
		// Start by adding first item to least array and equal array
		chars.push(arr[0]); 
		least.push(arr[0]);
	
	// If no input, return error 	
	if (!arr.length > 0){
		return modeObj = {
			mode: "No Input",
			modeNumber: "No Input",
			leastNumber: "No Input",
			least: "No Input"
		};
	}
	
	// Begin loop
	for (var i = 1; i <arr.length; i++) {

		// If current item is equal to the previous
		if (arr[i] == arr[i - 1]){
			currentMax++;
			
			// If current max equals max number, add item to modal array
			if (currentMax === maxNum) {
				
				chars.push(arr[i]);
				

			// If current max is greater than the max number, reset modal array and change the max number
			}else if(currentMax > maxNum) {
				
				maxNum = currentMax;
				
				chars.length = 0;
				chars.push(arr[i]);
			
		}	
		}else{
			
			
			maxNum ==1 ? chars.push(arr[i]) : null; // Add all items to modal array

			// Lowest number greater than current max and not first time, reset least array
			if (currentMax < lowestNumber && init == 1) {
				least.length = 0;
				least.push(arr[i -1]);

			// Current max equals lowest number and not the first time, add to least array
			}else if(currentMax == lowestNumber && init ==1){
				least.push(arr[i-1]);
			}
			
			// Check if lowest number is correct
			lowestNumber = (lowestNumber > currentMax) ? currentMax : lowestNumber;

			// If first time, set to 1
			typeof init === 'undefined' ? (init = 1, lowestNumber = currentMax) : null;
			
			currentMax = 1;
			totalChars++;

		}
	
	};

	/******* Perform checks to ensure mode and least are correct *******/ 
	if (chars.length == arr.length || totalChars*maxNum == arr.length) {
		chars.length = 0;
		chars.push("No mode");
	}
	if (least.length == arr.length || totalChars*maxNum == arr.length) {
		least.length = 0;
		least.push("No least used");
	}else{
	if (lowestNumber > currentMax){
		least.length = 0;
		least.push(arr[arr.length -1]);
	}
	if (lowestNumber === currentMax){
		least.push(arr[arr.length -1]);
	}
}
 // Return all info as an object
return modeObj = {
	mode: chars,
	modeNumber: maxNum,
	leastNumber: lowestNumber,
	least: least
};
		
	}

}