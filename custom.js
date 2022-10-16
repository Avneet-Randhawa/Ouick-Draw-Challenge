window.alert("Press Okay To Start The Game. Good Luck !!!");
objectsToDraw = ["aircraft carrier", "airplane", "alarm clock", "ambulance", "angel", "animal migration", "ant", "anvil", "apple", "arm", "asparagus", "axe", "backpack", "banana", "bandage", "barn", "baseball", "baseball bat", "basket", "basketball", "bat", "bathtub", "beach", "bear", "beard", "bed", "bee", "belt", "bench", "bicycle", "binoculars", "bird", "birthday cake", "blackberry", "blueberry", "book", "boomerang", "bottlecap", "bowtie", "bracelet", "brain", "bread", "bridge", "broccoli", "broom", "bucket", "bulldozer", "bus", "bush", "butterfly", "cactus", "cake", "calculator", "calendar", "camel", "camera", "camouflage", "campfire", "candle", "cannon", "canoe", "car", "carrot", "castle", "cat", "ceiling fan", "cello", "cell phone", "chair", "chandelier", "church", "circle", "clarinet", "clock", "cloud", "coffee cup", "compass", "computer", "cookie", "cooler", "couch", "cow", "crab", "crayon", "crocodile", "crown", "cruise ship", "cup", "diamond", "dishwasher", "diving board", "dog", "dolphin", "donut", "door", "dragon", "dresser", "drill", "drums", "duck", "dumbbell", "ear", "elbow", "elephant", "envelope", "eraser", "eye", "eyeglasses", "face", "fan", "feather", "fence", "finger", "fire hydrant", "fireplace", "firetruck", "fish", "flamingo", "flashlight", "flip flops", "floor lamp", "flower", "flying saucer", "foot", "fork", "frog", "frying pan", "garden", "garden hose", "giraffe", "goatee", "golf club", "grapes", "grass", "guitar", "hamburger", "hammer", "hand", "harp", "hat", "headphones", "hedgehog", "helicopter", "helmet", "hexagon", "hockey puck", "hockey stick", "horse", "hospital", "hot air balloon", "hot dog", "hot tub", "hourglass", "house", "house plant", "hurricane", "ice cream", "jacket", "jail", "kangaroo", "key", "keyboard", "knee", "knife", "ladder", "lantern", "laptop", "leaf", "leg", "light bulb", "lighter", "lighthouse", "lightning", "line", "lion", "lipstick", "lobster", "lollipop", "mailbox", "map", "marker", "matches", "megaphone", "mermaid", "microphone", "microwave", "monkey", "moon", "mosquito", "motorbike", "mountain", "mouse", "moustache", "mouth", "mug", "mushroom", "nail", "necklace", "nose", "ocean", "octagon", "octopus", "onion", "oven", "owl", "paintbrush", "paint can", "palm tree", "panda", "pants", "paper clip", "parachute", "parrot", "passport", "peanut", "pear", "peas", "pencil", "penguin", "piano", "pickup truck", "picture frame", "pig", "pillow", "pineapple", "pizza", "pliers", "police car", "pond", "pool", "popsicle", "postcard", "potato", "power outlet", "purse", "rabbit", "raccoon", "radio", "rain", "rainbow", "rake", "remote control", "rhinoceros", "rifle", "river", "roller coaster", "rollerskates", "sailboat", "sandwich", "saw", "saxophone", "school bus", "scissors", "scorpion", "screwdriver", "sea turtle", "see saw", "shark", "sheep", "shoe", "shorts", "shovel", "sink", "skateboard", "skull", "skyscraper", "sleeping bag", "smiley face", "snail", "snake", "snorkel", "snowflake", "snowman", "soccer ball", "sock", "speedboat", "spider", "spoon", "spreadsheet", "square", "squiggle", "squirrel", "stairs", "star", "steak", "stereo", "stethoscope", "stitches", "stop sign", "stove", "strawberry", "streetlight", "string bean", "submarine", "suitcase", "sun", "swan", "sweater", "swingset", "sword", "syringe", "table", "teapot", "teddy-bear", "telephone", "television", "tennis racquet", "tent", "The Eiffel Tower", "The Great Wall of China", "The Mona Lisa", "tiger", "toaster", "toe", "toilet", "tooth", "toothbrush", "toothpaste", "tornado", "tractor", "traffic light", "train", "tree", "triangle", "trombone", "truck", "trumpet", "tshirt", "umbrella", "underwear", "van", "vase", "violin", "washing machine", "watermelon", "waterslide", "whale", "wheel", "windmill", "wine bottle", "wine glass", "wristwatch", "yoga", "zebra", "zigzag"];
random = Math.floor((Math.random() * objectsToDraw.length));
objects = [];
randomSketch = objectsToDraw[random];
document.getElementById("sketchToDrawn").innerHTML = "Sketch To Be Drawn :- " + randomSketch;
score = 0;
document.getElementById("score").innerHTML = "Score :- " + score;
classifier = ml5.imageClassifier('DoodleNet');
statusKey = false;
body = document.getElementById("body");
coverW = 0;
check = 0;
statusvalue = 0;

timerCurrent = 0;
turncurrent = 0;




timerMax = prompt("Enter the time limit for the challenge but less than 500 and greater than 0 otherwise it will be set to 500");
if(timerMax > 500 || timerMax < 1 || timerMax === ""){
    timerMax = 500;
}

turns = prompt("Enter the number of objcts you want to draw as challenge. (Enter More than or equal to 10 otherwise it will be set to 10)");
if(turns <10 || turns === ""){
    turns = 10;
}
turns = Number(turns);
 if(Number. isNaN(turns)){
     prompt("You must enter the number of turns for challenge in number!"); 
}
document.getElementById("turns").innerHTML = turncurrent + "/" + turns;
sketchDrawn = "";
answer = false;



function preload() {
    classifier = ml5.imageClassifier('DoodleNet');
    statusKey = true;
}

function setup() {
    canvas = createCanvas(350, 350);
    canvas.center();
    background("white");
    canvas.mouseReleased(classifyCanvas);
}

function classifyCanvas() {
    classifier.classify(canvas, gotResults);
    if (sketchDrawn == randomSketch && timerCurrent != 0) {
        timerCurrent = 0;
        turncurrent = turncurrent + 1;
        document.getElementById("turns").innerHTML = turncurrent + "/" + turns;
        score = score + 1;
        document.getElementById("score").innerHTML = "Score :- " + score;
        updateCanvas();
    }
}

function gotResults(error, results) {
    if (error) {
        console.error(error);
    } else {
        //console.log(results);
        objects = results;
        document.getElementById("yourSketch").innerHTML = "Your Sketch :- " + results[0].label;
        sketchDrawn = results[0].label;
        document.getElementById("confidence").innerHTML = "Confidence :- " + Math.round(results[0].confidence * 100) + "%";
    }
}

function updateCanvas() {
    background("white");
    random = Math.floor((Math.random() * objectsToDraw.length));
    randomSketch = objectsToDraw[random];
    document.getElementById("sketchToDrawn").innerHTML = "Sketch To Be Drawn :- " + randomSketch;
}

function draw() {
    if (statusKey == true) {
        stroke("rgb(0,0,0)");
        if (turncurrent != turns) {
            if (mouseIsPressed) {
                line(pmouseX, pmouseY, mouseX, mouseY);
            }
            timerCurrent++;
            document.getElementById("timer").innerHTML = "Timer :- " + timerCurrent;
            if (timerCurrent == timerMax || timerCurrent > timerMax && turncurrent != turns) {
                turncurrent = turncurrent + 1;
                document.getElementById("turns").innerHTML = turncurrent + "/" + turns;
                updateCanvas();
                timerCurrent = 0;
            }
        }
        if (turncurrent == turns) {
            result();
            console.log("Function is Called");
            check += 1;
        }
    }
}

function result() {
    statusvalue = score/turns;
    if(check === 1){
        console.log("Score :- " + score);
        console.log("Turns :- " + turns);
    document.getElementById("game").style.display = "none";
    console.log("Step 1 Done");
    document.getElementById("result").style.display = "inherit";
    console.log("Step 2 Done");
    canvas.hide();
    console.log("Step 3 Done");
    body.style.height = "100vh";
    console.log("Step 4 Done");
    document.querySelector("#finalscoreresult").innerHTML += score+"/"+turns;
    console.log("Step 5 Done");

        if(statusvalue == 1){
            document.querySelector("#statusvalresult").innerHTML = "Congratulations! You Did It";
        }
        if(statusvalue < 1 && statusvalue >0.79){
            document.querySelector("#statusvalresult").innerHTML = "Almost There!";
        }
        if(statusvalue < 0.80 && statusvalue > 0.49){
            document.querySelector("#statusvalresult").innerHTML = "Try Next Time!";
        }
        if(statusvalue < 0.50 && statusvalue > 0.29){
            document.querySelector("#statusvalresult").innerHTML = "Better Luck Next Time!";
        }
        if(statusvalue < 0.30 && statusvalue > 0.09){
            document.querySelector("#statusvalresult").innerHTML = "Try Next Time!";
        }
        if(statusvalue < 0.1 && statusvalue > 0){
            document.querySelector("#statusvalresult").innerHTML = "Needs A Lot Of Perfection!";
        }
        if(statusvalue === 0){
            document.querySelector("#statusvalresult").innerHTML = "Very Poor!";
        }
    }
}