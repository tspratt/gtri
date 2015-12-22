##GTRI Code Challenge: Javascript
Within the next 24 hours, solve these problems in JavaScript / HTML / CSS.

You may use any libraries. If anything is unclear, make an assumption and document
it in your code.

Please include some build script (Grunt, Gulp, etc) and include some tests to
demonstrate that your answers are correct.

Email all of your files together as
a zip or tar.

###------ Question 1 ------
Write a JavaScript function that accepts an Array of integers as its input.
* It should return true if the list contains two integers that sum to zero.
* It should return false otherwise.

###------ Question 2 ------
Write a small webpage / application with any libraries or frameworks you want.
* The page should provide the ability to search for data based on name and active
status (active, inactive, or both).
* The results should be displayed in a
tabular / grid fashion, formatted as you see fit.
* The data is available as a REST call at the following URL:
 * http://wild-wave-4526.getsandbox.com/findPeople
 * HTTP Method is GET
* Search data parameters are:
 * name - will return data that includes that name as part of any first / middle
  / last name
 * active - if set will only return data that matches the parameter (true or
  false)

If you search for a name of 'error' (without the tick marks) the REST endpoint
will return a 500 error.
