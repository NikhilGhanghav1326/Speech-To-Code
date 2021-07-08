var speechRecognition=window.webkitSpeechRecognition

var recognition=new speechRecognition()

var textbox =$("#totext")
var instruction =$("#con")
var content =''
var precontent=''
recognition.onstart =function(){
    instruction.text("voice start")
}
recognition.onspeechend=function(){
    instruction.text("No Activity")

}
recognition.onerror=function(event){
    instruction.text("error")
    console.log(event);
}
textbox.on('input',function(){
    content=$(this).val
})
recognition.continuous =true
recognition.onresult=function(event){
    var current =event.resultIndex;
    var transcript =event.results[current][0].transcript
    content += transcript
    precontent=content;
    textbox.val(content)
    doSomething(transcript);
}

$("#btn").click(function(event){
    if(content.length){
        content+= ''
    }
    recognition.start()
})

function doSomething(message){
if(message.includes("scroll down")){
   console.log("scroll") 
   window.scrollBy(0, 200);
}
if(message.includes("scroll up")){
    console.log("scroll") 
    window.scrollBy(0, -200);
 }
 if(message.includes("make for loop")){
    var length=message.length-1;
    var till=message[length]
    content = precontent+'for(int i=0;i<'+till+';i++){}'
    textbox.val(content)
    precontent='';
 }
 if(message.includes("make while loop upto")){
     var length=message.length-1;
     var till=message[length]
     console.log(length,till)
    content = precontent+'while(t<'+till+'){}'
    textbox.val(content)
    precontent='';
 }
 if(message.includes("declare int")){
    var length=message.length-1;
    var till=message[length]
    console.log(length,till)
   content =precontent+ 'int '+till
   precontent=''
   textbox.val(content)
}
if(message.includes("function main")){
   content = precontent+'int main(){ return 0;}'
   precontent=''
   textbox.val(content)
}
if(message.includes("cout")){
    content = precontent+'cout<<'
    precontent=''
    textbox.val(content)
 }
 
}