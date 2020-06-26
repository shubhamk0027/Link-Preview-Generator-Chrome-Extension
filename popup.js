// by Shubham Kumar

document.addEventListener('DOMContentLoaded', function() {

    const checkPageButton = document.getElementById('generateButton');
    const linkDisplay = document.getElementById('linkDisplay');
    const titleDisplay = document.getElementById('title');
    const imageDisplay = document.getElementById('image');
    const descDisplay = document.getElementById('description');
    const originalUrlDisplay = document.getElementById('originalUrl');
    const shortUrlDisplay = document.getElementById('shortenUrl');
    const baseURL = "https://lkpw.herokuapp.com/";


    checkPageButton.addEventListener('click', function() {
        console.log("Requesting Link Generation..")
        chrome.tabs.executeScript({
            file:'contentScript.js'
        });
    }, false);



    function gotMessage(message,sender,sendResponse){

        if(message.description!=null && message.description.length>200){
            message.description=message.description.substring(0,200)+"...";
        }

        linkDisplay.setAttribute("style","display:block");
        titleDisplay.innerText=message.title
        imageDisplay.src=message.image;
        descDisplay.innerText=message.description;
        originalUrlDisplay.innerText=message.originalUrl;
        shortUrlDisplay.innerText="Share Link: Generating...";
        
        let xhr = new XMLHttpRequest(); 
        xhr.open("POST", baseURL+"generate" , true); 
        xhr.setRequestHeader("Content-Type", "application/json"); 
        xhr.onreadystatechange = function () { 
            if (xhr.readyState === 4 && xhr.status === 200) { 
                const resp = JSON.parse(this.responseText);
                shortUrlDisplay.innerText=baseURL+resp.shortenUrl;
                console.log(resp.shortenUrl);
            } else{
                shortUrlDisplay.innerText=this.responseText;
            }
        }; 
        xhr.send(JSON.stringify(message));

    }

    chrome.runtime.onMessage.addListener(gotMessage);

}, false);  





