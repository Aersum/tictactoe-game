
var checkarr, svgarr;
function createSvgCircle(){
    var circle  = document.createElementNS("http://www.w3.org/2000/svg", "path");
    circle.setAttribute("class", "circle");
    circle.setAttribute("d", "M 50,10 A40,40 0 1,1 49,10 z");

    return circle;
}
function createSvgLine(direction){
    var line = document.createElementNS("http://www.w3.org/2000/svg", "path");
    if (direction=='l'){   
    line.setAttribute("d", "M 5,5 L95,95");
    line.setAttribute("class","crossl");
    }
    if (direction=='r'){   
    line.setAttribute("d", "M 95,5 L5,95");
    line.setAttribute("class","crossr");
    }
    return line;
}
function addSvgCircle(elem){
    elem.appendChild(createSvgCircle());
}
function addSvgCross(event){
    event.currentTarget.appendChild(createSvgLine('l'));
    event.currentTarget.appendChild(createSvgLine('r'));

}
function svgArrInit(){
    var field=document.getElementById("field");
    var svgarr=field.children;
    return svgarr;
}
function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min) ) + min;
}
function selectEmptyfield(){
    var countEmpty=0;
    for (var i=0;i<svgarr.length;i++){
        if (!svgarr[i].firstChild){countEmpty++;}
    }
     if (countEmpty>1){
        var roboi;
        do{
           roboi=getRndInteger(0,8); 
        }while(svgarr[roboi].firstChild); 
        return roboi;
     } else{
        return -1;
     }
}
function game(event){
    var check;
    //user turn
    addSvgCross(event);
    event.currentTarget.removeEventListener("click",game);
    check=hasWinner(svgarr);
    if(check){
        endGame(check);
        return;
    }
    //robot turn
    var roboi=selectEmptyfield();
    if(roboi!=-1){
        addSvgCircle(svgarr[roboi]);
        svgarr[roboi].removeEventListener("click",game);
    }else{
        showModal("Game Over!!! <br/> It's a draw!!!");
    }
    check=hasWinner(svgarr);
    if(check){
        endGame(check);
        return;
    }
}
function hasWinner(svgarr){
    for (var i=0;i<svgarr.length;i++){
        if(svgarr[i].firstChild){
            if(!checkarr[i]) checkarr[i]=svgarr[i].firstChild.getAttribute("class");
        }
    }
    if(checkarr[0]&&checkarr[0]==checkarr[1]&&checkarr[1]==checkarr[2]){
        return "0-2,"+checkarr[0];
    }else if(checkarr[3]&&checkarr[3]==checkarr[4]&&checkarr[4]==checkarr[5]){
        return "3-5,"+checkarr[3];
    }else if(checkarr[6]&&checkarr[6]==checkarr[7]&&checkarr[7]==checkarr[8]){
        return "6-8,"+checkarr[6];
    }else if(checkarr[0]&&checkarr[0]==checkarr[3]&&checkarr[3]==checkarr[6]){
        return "0-6,"+checkarr[0];
    }else if(checkarr[1]&&checkarr[1]==checkarr[4]&&checkarr[4]==checkarr[7]){
        return "1-7,"+checkarr[1];
    }else if(checkarr[2]&&checkarr[2]==checkarr[5]&&checkarr[5]==checkarr[8]){
        return "2-8,"+checkarr[2];
    }else if(checkarr[0]&&checkarr[0]==checkarr[4]&&checkarr[4]==checkarr[8]){
        return "0-8,"+checkarr[0];
    }else if(checkarr[2]&&checkarr[2]==checkarr[4]&&checkarr[4]==checkarr[6]){
        return "2-6,"+checkarr[2];
    }else return false;
}
function addFieldListeners(){
    svgarr=svgArrInit();
    checkarr= [];
    for (var i=0;i<svgarr.length;i++){
        svgarr[i].addEventListener("click",game);
    }
}
function deleteSvgChilds(){
    for (var i=0;i<svgarr.length;i++){
        while (svgarr[i].firstChild){
            svgarr[i].removeChild(svgarr[i].firstChild);
        }
    }    
}
function removeFieldListeners(){
    for (var i=0;i<svgarr.length;i++){
        svgarr[i].removeEventListener("click",game);
    }
}
function showModal(mess,delay){
    //delay=delay||0;
    this.delay = (typeof delay !== "undefined") ? delay : 0;
    var modal=document.getElementById("openModal");
    var modalMess= document.getElementById("modalMess");
    modalMess.innerHTML=mess;
    setTimeout(function(){
                    modal.style.cssText="display:block; pointer-events:auto;";
            },delay);
    
}
function hideModal(){
    var modal=document.getElementById("openModal");
    modal.style.cssText="display:none; pointer-events:auto;";
}
function modalOk(){
    hideModal();
    hideWinnerSVG();
    deleteSvgChilds();
    addFieldListeners();
}
function showWinnerSVG(delay){
    this.delay = (typeof delay !== "undefined") ? delay : 0;
    //delay=delay||0;
    var modal=document.getElementById("winner");
    setTimeout(function(){
                    modal.style.cssText="display:block;";
            },delay);
    
}
function hideWinnerSVG(){
    var modal=document.getElementById("winner");
    modal.style.cssText="display:none;";
}
function endGame(check){
    var winnerPos=check.slice(0,3);
    var winner=check.slice(4);
    var winnerPath=document.getElementById("winnerLine");
    
    checkarr=[];
    removeFieldListeners();
    if(winner=="crossl"){
        var message= "You Win!!!";
    }else{
        var message="You Lose..."
    }
    switch (winnerPos){
        case "0-2":
            winnerPath.setAttribute("d", "M5,51 L303,51");    
        break;
        case "3-5":
            winnerPath.setAttribute("d", "M5,154 L303,154");
        break;
        case "6-8":
            winnerPath.setAttribute("d", "M5,257 L303,257");
        break;
        case "0-6":
            winnerPath.setAttribute("d", "M51,5 L51,303");
        break;
        case "1-7":
            winnerPath.setAttribute("d", "M154,5 L154,303");
        break;
        case "2-8":
            winnerPath.setAttribute("d", "M257,5 L257,303");
        break;
        case "0-8":
            winnerPath.setAttribute("d", "M15,5 L303,295");
        break;
        case "2-6":
            winnerPath.setAttribute("d", "M303,5 L15,295");
        break;
    }
    showWinnerSVG(1000);
    showModal(message,2000);
}

window.onload=addFieldListeners;
