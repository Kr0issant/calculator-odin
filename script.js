const displayOp = document.querySelector(".display-op");
const displayResult = document.querySelector(".display-result");

var phase = "arg1"; // arg1 -> op -> arg2
var calc = {
    "arg1": "",
    "op": "",
    "arg2": ""
}

function query(n) {
    switch (phase) {
        case "arg1":
            if (calc["arg1"] === "" && n === ".") { calc["arg1"] = "0"; }
            calc["arg1"] += n;
            break;
        case "op":
            calc["op"] = n;
            break;
        case "arg2":
            if (calc["arg2"] === "" && n === ".") { calc["arg2"] = "0"; }
            calc["arg2"] += n;
            break;
    }
    displayOp.innerText = `${calc["arg1"]} ${calc["op"]} ${calc["arg2"]}`;
}

function evaluate() {
    let res = 0;
    let zerodiv = false;

    // Remove trailing decimals
    if (calc["arg1"].charAt(calc["arg1"].length - 1) === ".") {
        calc["arg1"] = calc["arg1"].slice(0, calc["arg1"].length - 1);
    }
    if (calc["arg2"].charAt(calc["arg2"].length - 1) === ".") {
        calc["arg2"] = calc["arg2"].slice(0, calc["arg2"].length - 1);
    }

    switch (calc["op"]) {
        case "+":
            res = Number(calc["arg1"]) + Number(calc["arg2"]);
            break;
        case "-":
            res = Number(calc["arg1"]) - Number(calc["arg2"]);
            break;
        case "×":
            res = Number(calc["arg1"]) * Number(calc["arg2"]);
            break;
        case "÷":
            if (Number(calc["arg2"]) === 0) {
                zerodiv = true;
                calc["arg1"] = "";
                calc["op"] = "";
                calc["arg2"] = "";
                displayOp.innerText = "";
                displayResult.innerText = "Undefined";
                phase = "arg1"

            } else {
                res = Number(calc["arg1"]) / Number(calc["arg2"]);
            }
            break;
        case "^":
            res = Math.pow(Number(calc["arg1"]), Math.round(Number(calc["arg2"])));
            break;
    }
    if (zerodiv) { return; }
    phase = "arg1";
    calc["arg1"] = res.toFixed(3);
    while (true) {
        let last = calc["arg1"].length - 1;
        if ((calc["arg1"].includes(".") && calc["arg1"].charAt(last) === "0") || (calc["arg1"].charAt(last) === ".")) {
            calc["arg1"] = calc["arg1"].slice(0, last - 1)
        } else {
            break;
        }
    }
    calc["op"] = "";
    calc["arg2"] = "";
    displayResult.innerText = calc["arg1"];
}

document.querySelectorAll(".button.num").forEach((i) => {
    if (i.innerText === ".") {
        i.addEventListener("click", () => {
            if (!calc[phase].includes(".")) { // No more than one . (decimal)
                if (phase === "op") {
                    phase = "arg2";
                }
                query(i.innerText);
            }
        })
    } else {
        i.addEventListener("click", () => {
            if(!(phase === "op" && calc["op"].length === 0)) {
                if (phase === "op") {
                    phase = "arg2";
                }
                query(i.innerText);
            }
        })
    }
})
document.querySelectorAll(".button.op").forEach((i) => {
    i.addEventListener("click", () => {
        if (phase === "arg2") {
            evaluate();
        } else if (phase === "arg1" && calc["arg1"] === "") {
            calc["arg1"] = "0";
        }
        phase = "op";
        query(i.innerText);
    })
})
document.querySelectorAll(".button.action").forEach((i) => {
    i.addEventListener("click", ()=> {
        if (i.innerText === "ENTER") {
            if (phase === "arg2") {
                evaluate();
            }
        } else if (i.innerText === "AC") {
            displayOp.innerText = "";
            displayResult.innerText = "";
            calc = {"arg1": "", "op": "", "arg2": ""};
            phase = "arg1";
        } else if (i.innerText === "DEL") {
            if (phase === "op") {
                if (calc["op"].length === 0) {
                    phase = "arg1";
                    calc["arg1"] = calc["arg1"].slice(0, calc["arg1"].length - 1);
                } else {
                    calc["op"] = "";
                }
            } else {
                if (phase === "arg2" && calc["arg2"].length === 0) {
                    phase = "op";
                }
                if (calc[phase].length > 0) {
                    calc[phase] = calc[phase].slice(0, calc[phase].length - 1);
                }
            }
            displayOp.innerText = `${calc["arg1"]} ${calc["op"]} ${calc["arg2"]}`;
        }
    })
})

document.addEventListener("keydown", (e) => {
    switch (e.key) {
        case "0": document.getElementById("0").click(); break;
        case "1": document.getElementById("1").click(); break;
        case "2": document.getElementById("2").click(); break;
        case "3": document.getElementById("3").click(); break;
        case "4": document.getElementById("4").click(); break;
        case "5": document.getElementById("5").click(); break;
        case "6": document.getElementById("6").click(); break;
        case "7": document.getElementById("7").click(); break;
        case "8": document.getElementById("8").click(); break;
        case "9": document.getElementById("9").click(); break;
        case ".": document.getElementById("dot").click(); break;

        case "+": document.getElementById("add").click(); break;
        case "-": document.getElementById("subtract").click(); break;
        case "*": document.getElementById("multiply").click(); break;
        case "/": document.getElementById("divide").click(); break;
        case "^": document.getElementById("power").click(); break;

        case "Backspace": document.getElementById("delete").click(); break;
        case "Enter": document.getElementById("evaluate").click(); break;
        case " ": document.getElementById("clear").click(); break;
    }
})