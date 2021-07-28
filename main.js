hand_1 = "";
hand_2 = "";

Webcam.set({
width : 350,
height : 300,
image_format : 'png',
png_quality : 90

});

Webcam.attach('#webcam');


function speak(){
var synth = window.speechSynthesis;
words1 = "Hand 1 is " + hand_1;
words2 = "And Hand 2 is " + hand_2;
var utterThis = new SpeechSynthesisUtterance(words1 + words2);
synth.speak(utterThis);
}




function takeSnapshot(){

Webcam.snap(function(data_uri){
document.getElementById("result").innerHTML = "<img id='hand_gesture' src="+data_uri+">";
});

}

console.log('ml5 version', ml5.version);

classifier = ml5.imageClassifier("https://teachablemachine.withgoogle.com/models/JMw0m-v3P/model.json", modelLoaded);
function modelLoaded(){
console.log("Model Loaded-");

};

function check(){
gesture = document.getElementById("hand_gesture");
classifier.classify(gesture, gotResult);

}

function gotResult(error, results){

if(error){
console.error(error)
}
else{
console.log(results);
document.getElementById("hand_1").innerHTML = results[0].label;
document.getElementById("hand_2").innerHTML = results[1].label;

hand_1 = results[0].label;
hand_2 = results[1].label;

if(results[0].label == "super"){
document.getElementById("hand_1").innerHTML = "&#128076;";
}
if(results[0].label == "victory"){
document.getElementById("hand_1"). innerHTML = "&#9996;";
}

if(results[0].label == "rockin"){
document.getElementById("hand_1").innerHTML = "&#129311;";
}

if(results[1].label == "super"){
document.getElementById("hand_2").innerHTML = "&#128076;";
}

if(results[1].label == "victory"){
document.getElementById("hand_2").innerHTML = "&#9996";
 }

if(results[1].label == "rockin"){
document.getElementById("hand_2").innerHTML = "&#129311;";
    }

}

speak();

}

