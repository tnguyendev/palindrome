// SERVER SERVES DOCUMENTS
const http = require("http"); //imports 
const fs = require("fs"); //imports
const url = require("url");
const querystring = require("querystring");
const { json } = require("stream/consumers");

const server = http.createServer(function (req, res) {
  console.log(" i got a request");
  const page = url.parse(req.url).pathname;
  const params = querystring.parse(url.parse(req.url).query);
  console.log("params", params);
  if (page == "/") {
    fs.readFile("index.html", function (err, data) {
      res.writeHead(200, { "Content-Type": "text/html" });
      res.write(data);
      res.end();
    });
  } else if (page == "/style.css") {
    fs.readFile("style.css", function (err, data) {
      // res.writeHead(200, {'Content-Type': 'text/stylesheet'})
      res.write(data);
      res.end();
    });
  } else if (page == "/main.js") {
    fs.readFile("main.js", function (err, data) {
      res.writeHead(200, { "Content-Type": "text/javascript" });
      res.write(data);
      res.end();
    });
  } else if (page == "/api") {
    res.writeHead(200, { "Content-Type": "application/json" });

    const palindromeResult = {
      str: params['checkIfPalindrome'], //params.checkIfPalindrome - utilizing dot notation will NOT work and you must use square bracket notation to access the string
      result:"",

      checkPalindrome() {
        let wordArray = this.str.replace(" ", "").split("");
        console.log(wordArray);

        wordArray.reverse(); // The reverse method only works on arrays and not strings 

        console.log(wordArray);

        let reversedWord = wordArray.join("");
// when you're inside the object, make sure to utilize "this.property"
        if (reversedWord.toLowerCase() === this.str.replace(" ", "").toLowerCase()) { //we're re-assigning the result to the response string/message
          this.result = "It's a palindrome!";
        } else {
          this.result = "Sorry, not a palindrome!";
        }

      },

    };
    palindromeResult.checkPalindrome()
    res.end(JSON.stringify(palindromeResult));
    
  }
});

server.listen(8000);


//       function checkPalindrome(pPalindrome) {
//         // return

//         // l e o n n o e l

//         let wordArray = pPalindrome.split("");

//         console.log(wordArray);

//         wordArray.reverse();

//         console.log(wordArray);

//         //  = [ ]
//         // .reverse()
//         let reversedWord = wordArray.join("");

//         if(reversedWord.toLowerCase()=== pPalindrome.toLowerCase()){
//           return true
//         } else {
//           return false
//         }
//       }
//       console.log(checkPalindrome("LeonNoel"));
//     };

//     res.writeHead(200, { "Content-Type": "application/json" });
//     res.write(JSON.stringify(palindromeResult));
//     res.end();
//   }
