// some sites does not allow sending request like geeks for geeks
document.addEventListener('DOMContentLoaded', function() {

    const checkPageButton = document.getElementById('generateButton');
    const linkDisplay = document.getElementById('linkDisplay');
    const titleDisplay = document.getElementById('title');
    const imageDisplay = document.getElementById('image');
    const descDisplay = document.getElementById('description');
    const originalUrlDisplay = document.getElementById('originalUrl');
    const shortUrlDisplay = document.getElementById('shortenUrl');


    checkPageButton.addEventListener('click', function() {
        console.log("Requesting Link Generation..")

        chrome.tabs.executeScript({
            file:'contentScript.js'
        });
    }, false);



    // get the Scraped Text ->  send it to the server -> get the shorten url
    function gotMessage(message,sender,sendResponse){

        linkDisplay.setAttribute("style","display:block");
        titleDisplay.innerText=message.title
        imageDisplay.src=message.image;
        descDisplay.innerText=message.description;
        originalUrlDisplay.innerText=message.originalUrl;
        shortUrlDisplay.innerText="Share Link: Generating...";
        
        const baseURL = " https://84d116263b96.ngrok.io/";

        let xhr = new XMLHttpRequest(); 
        xhr.open("POST", baseURL+"generate" , true); 
        xhr.setRequestHeader("Content-Type", "application/json"); 
        xhr.onreadystatechange = function () { 
            if (xhr.readyState === 4 && xhr.status === 200) { 
                const resp = JSON.parse(this.responseText);
                shortUrlDisplay.innerText=" https://84d116263b96.ngrok.io/"+resp.shortenUrl;
                console.log(resp.shortenUrl);
            } else{
                shortUrlDisplay.innerText=this.responseText;
            }
        }; 
        xhr.send(JSON.stringify(message));

        console.log("Request sent: "+ JSON.stringify(message));
    }

    chrome.runtime.onMessage.addListener(gotMessage);

}, false);  





