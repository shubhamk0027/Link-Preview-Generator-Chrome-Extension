// download the image and send it to the server to create a new url for it

console.log("Content Script Running");

function ScrapeImageUrl(){

    console.log("Scraping Images")
    let ar = [];

    let imageFb = document.querySelector('meta[property="og:image"]');
    if(imageFb!=null && imageFb.content!=null && imageFb.content.length>0){
        ar.push(imageFb.content);
        console.log("FB meta tags ");
        console.log(imageFb.content);
        // return imageFb.content;
    } 
    
    let imageTw = document.querySelector('meta[name="twitter:image"]');
    if(imageTw!=null && imageTw.content!=null && imageTw.content.length>0){
        ar.push(imageTw.content);
        console.log("Twitter meta tags ");
        console.log(imageTw.content);
        // return imageTw.content;
    }
    
    let imageTw2 = document.querySelector('meta[name="twitter:image:src"]');
    if(imageTw2!=null && imageTw2.content!=null && imageTw2.content.length>0){
        ar.push(imageTw2.content);
        console.log("Twitter meta tags2");
        console.log(imageTw2.content);
        // return imageTw.content;
    }
    
    let imageLink = document.querySelector('link[rel="image_src"]');
    if(imageLink!=null && imageLink.content!=null && imageLink.content.length>0){
        ar.push(imageLink.content);
        console.log("Links in headers meta tags ");
        console.log(imageLink.content);
        // return imageLink.content;
    }

    console.log("Body Images")    
    var imageUrls = Array.prototype.map.call(document.images, function (i) {
        ar.push(i.src);
        console.log(i.src);
        return i.src;
    });

    if(ar.length)   return ar[0];
    return null;
}



function ScrapeTitle(){

    console.log("Scraping Title");
    let ar=[];

    let titleFb = document.querySelector('meta[property="og:title"]');
    if(titleFb!=null && titleFb.content!=null && titleFb.content.length>0){
        ar.push(titleFb.content);
        console.log("FB meta tags ");
        console.log(titleFb.content);
        // return imageFb.content;
    } 
    
    let titleTw = document.querySelector('meta[property="twitter:title"]');
    if(titleTw!=null && titleTw.content!=null && titleTw.content.length>0){
        ar.push(titleTw.content);
        console.log("Twitter meta tags ");
        console.log(titleTw.content);
        // return imageTw.content;
    }

    let metaTitle = document.querySelector('meta[name="title"]');
    if(metaTitle!=null && metaTitle.content!=null && metaTitle.content.length>0){
        ar.push(metaTitle.content);
        console.log("Meta Title ");
        console.log(metaTitle.content);
        // return imageTw.content;
    }

    let mainTitle = document.querySelector('title').innerText;
    if(mainTitle!=null){
        ar.push(mainTitle);
        console.log("Main Page Title");
        console.log(mainTitle);
        // return imageLink.content;
    }

 
    if(ar.length) return ar[0];
    return null;
}


function ScrapeDescription(){

    console.log("Scraping Description");
    let ar=[];

    let descFb = document.querySelector('meta[property="og:description"]');
    if(descFb!=null && descFb.content!=null && descFb.content.length>0){
        ar.push(descFb.content);
        console.log("FB meta tags ");
        console.log(descFb.content);
        // return imageFb.content;
    } 
    
    let descTw = document.querySelector('meta[property="twitter:description"]');
    if(descTw!=null && descTw.content!=null && descTw.content.length>0){
        ar.push(descTw.content);
        console.log("Twitter meta tags ");
        console.log(descTw.content);
        // return imageTw.content;
    }

    let descMeta = document.querySelector('meta[name="description"]');
    if(descMeta!=null && descMeta.content!=null && descMeta.content.length>0){
        ar.push(descMeta.content);
        console.log("Meta Title ");
        console.log(descMeta.content);
        // return imageTw.content;
    }

    let desc =  document.getElementsByTagName('p');
    console.log("Possible Descriptions");
    for(let i=0;i<desc.length;i++){
        if(desc[i].innerText.length>30){
            ar.push(desc[i].innerText);
            console.log(desc[i].innerText);
        }
    }
 
    if(ar.length) return ar[0];
    return null;
}

message={
    title: ScrapeTitle(),
    description: ScrapeDescription(),
    image: ScrapeImageUrl(),
    originalUrl: window.location.href
}

console.log("Sending Response to PopUp.js");
chrome.runtime.sendMessage(message);
