console.log("Hello World");

// status: 0 = not started, 1 = started, 2 = finished
let gStatus = 0;


let results = {
    correct: 0,
    incorrect: 0,
    total: 0,
    accuracy: 0,
    avgTime: 0,
}

let listeners = [];

document.getElementById("start").addEventListener("click", async function () {
    this.disabled = true;

    await new Promise(resolve => {
        for (let i = 0; i < 3; i++) {
            setTimeout(function () {
                document.getElementById("word").innerHTML = 3 - i
            }, i * 1000)
        }
        setTimeout(function () {
            gStatus = 1;
            newColor();
            resolve();
        }, 3000)
    });
    for (let i = 0; i < 60; i++) {
        setTimeout(function () {
            document.getElementById("timer").innerHTML = 60 - 1 - i;
        }, i * 1000);
    }
    await new Promise(resolve => {
        setTimeout(function () {
            resolve();
        }, 60000)
    });

    document.getElementById("word").innerHTML = "Done!";
    document.getElementById("word").classList = "word";
    for (let stat of document.getElementsByClassName("result")) {
        stat.style.display = "inline";
    }
    for (let item of document.getElementsByClassName("color-btn")) {
        item.removeEventListener("click", click);
    }
    gStatus = 2;
    
});

for (let item of document.getElementsByClassName("color-btn")) {
    item.addEventListener("click", click);
};

document.getElementById("reset").addEventListener("click", reset);

function newColor() {
    let colors = ["red", "blue", "limegreen", "yellow"];
    let color = colors[Math.floor(Math.random() * 4)];
    let farbe = ["rot", "blau", "grün", "gelb"][Math.floor(Math.random() * 4)];
    document.getElementById("word").innerHTML = farbe;
    document.getElementById("word").classList = "word " + color;
}

function reset() {
    location.reload();
}

function click() {
    if(!gStatus == 1) return console.log("not started");
    let col = this.style.backgroundColor;
    let check = document.getElementById("word").classList.contains(col);
    if (check) {
        results.correct++;
    } else {
        results.incorrect++;
    }
    results.total++;
    results.accuracy = results.correct / results.total;
    document.getElementById("accuracy").innerHTML = document.getElementById("accuracy").innerHTML.split(" ")[0] + " " + results.accuracy.toFixed(2);
    document.getElementById("correct").innerHTML = document.getElementById("correct").innerHTML.split(" ")[0] + " " + results.correct;
    document.getElementById("incorrect").innerHTML = document.getElementById("incorrect").innerHTML.split(" ")[0] + " " + results.incorrect;
    document.getElementById("total").innerHTML = document.getElementById("total").innerHTML.split(" ")[0] + " " + results.total;

    // avg time in ms
    results.avgTime = 60000 / results.total;
    document.getElementById("avgTime").innerHTML = document.getElementById("avgTime").innerHTML.split(" ")[0] + " " + results.avgTime.toFixed(2) + " ms";

    newColor();

}