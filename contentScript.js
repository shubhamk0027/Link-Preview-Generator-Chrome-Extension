// download the image and send it to the server to create a new url for it


function ScrapeImageUrl(){

    let imageFb = document.querySelector('meta[property="og:image"]');
    if(imageFb!=null && imageFb.content!=null && imageFb.content.length>0){
        return imageFb.content;
    } 
    
    let imageTw = document.querySelector('meta[name="twitter:image"]');
    if(imageTw!=null && imageTw.content!=null && imageTw.content.length>0){
        return imageTw.content;
    }
    
    let imageTw2 = document.querySelector('meta[name="twitter:image:src"]');
    if(imageTw2!=null && imageTw2.content!=null && imageTw2.content.length>0){
        return imageTw2.content;
    }
    
    let imageLink = document.querySelector('link[rel="image_src"]');
    if(imageLink!=null && imageLink.content!=null && imageLink.content.length>0){
        return imageLink.content;
    }

    if(document.images.length>0){
      return document.images[0].src;
    }

    return null;
}



function ScrapeTitle(){

    let titleFb = document.querySelector('meta[property="og:title"]');
    if(titleFb!=null && titleFb.content!=null && titleFb.content.length>0){
        return titleFb.content;
    } 
    
    let titleTw = document.querySelector('meta[property="twitter:title"]');
    if(titleTw!=null && titleTw.content!=null && titleTw.content.length>0){
        return titleTw.content;
    }

    let metaTitle = document.querySelector('meta[name="title"]');
    if(metaTitle!=null && metaTitle.content!=null && metaTitle.content.length>0){
        return metaTitle.content;
    }

    let mainTitle = document.querySelector('title').innerText;
    if(mainTitle!=null){
        return mainTitle;
    }

    return null;
}


function ScrapeDescription(){

    let descFb = document.querySelector('meta[property="og:description"]');
    if(descFb!=null && descFb.content!=null && descFb.content.length>0){
        return descFb.content;
    } 
    
    let descTw = document.querySelector('meta[property="twitter:description"]');
    if(descTw!=null && descTw.content!=null && descTw.content.length>0){
        return descTw.content;
    }

    let descMeta = document.querySelector('meta[name="description"]');
    if(descMeta!=null && descMeta.content!=null && descMeta.content.length>0){
        return descMeta.content;
    }

    let desc =  document.getElementsByTagName('p');
    if(desc.length>0){
      return desc[0].innerText;
    }

    return null;
}

message={
    title: ScrapeTitle(),
    description: ScrapeDescription(),
    image: ScrapeImageUrl(),
    originalUrl: window.location.href
}

chrome.runtime.sendMessage(message);
