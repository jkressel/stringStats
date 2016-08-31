# stringStats.js

stringStats.js is a small and simple to use javascript library which makes it easy for developers to discover things about strings, including mode and least used, patterns and many other useful statistics. 

stringStats.js will accept input in the form of a string or an array.

## Installation

Just include `stringStats.js` in your project!

## Usage

stringStats.js will accept input in the form of a string or an array. 
A basic use to find the modal character in a string may look something like this:

```javascript
var result = stringStats.auto({input: “Test”, words: false});
alert(result.mode);
```
stringStats.js will accept parameters in the form of an object, and will return its result as an object.

**Input**

Function | Parameters | Description | Type | Required
-------- | ---------- | ----------- | ---- | --------
auto     | input      | Input passed to function | String or Array | Yes
         |  words     | Should the input be treated as words | boolean | Yes
         | caseUpper  | Convert input to upper case if true or lower case if false. Optional. If not specified, input will stay as it is. Will only be used if input does not contain words | boolean | No
instances| input | Input passed to function | String or Array | Yes
         | check | Item to check against | String | Yes
         | caseUpper | Convert input to upper case if true or lower case if false. Optional. If not specified, input will stay as it is. Will only be used if input does not contain words | boolean | No
         | words | Should the input be treated as words | boolean | Yes
specifiedNumber| input | Input passed to function | String or Array | Yes
               | number | Number used to check for items which occur more times than number, fewer times or equal to the number | Integer | Yes
patterns| input | Input passed to function | String or Array | Yes
        | number | Size of patterns to check for | Integer | Yes
