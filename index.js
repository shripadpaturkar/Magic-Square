function check() {
    document.getElementById("table").innerHTML = "";
    document.getElementById("total").innerHTML = "";
    document.getElementById("errorP").innerHTML = "";
    start();
}

function start() {
    let userInput = document.getElementById("input").value;

    let errorDiv = document.getElementById("errorDiv");

    let errorP = document.getElementById("errorP");

    var a = /^(?!0)[0-9]+#(?!0)[0-9]+#[0-9]+$/;

    if (!userInput.match(a)) {
        errorDiv.style.display = "block";
        errorDiv.style.visibility = "visible";
        errorP.innerHTML = "Please Enter valid values";
        errorDiv.style.opacity = 0.6;
        setTimeout(fadeOutEffect, 2000);
        return;
    } else {
        errorDiv.style.visibility = "hidden";
        errorDiv.style.display = "none";
    }

    userInput = userInput.split("#").map(function (item) {
        return parseFloat(item);
    });

    let numRow = Number(userInput[0]);
    let numColumn = Number(userInput[1]);
    let startValue = Number(userInput[2]);

    if (numRow === numColumn) {

        if (numRow == 2) {
            errorDiv.style.display = "block";
            errorDiv.style.visibility = "visible";
            errorP.innerHTML = "Enter numbers greater than 2";
            errorDiv.style.opacity = 0.6;
            setTimeout(fadeOutEffect, 2000);
            return;
        }
        else{
            errorDiv.style.display = "none";
        }
        if (numRow % 2 != 0) {
            createTable(numRow, createMatrixForOdd(numRow, startValue));
            total(numRow, startValue);
        } else if (numRow % 4 == 0) {

            createMatrixForEven(numRow, startValue);
            total(numRow, startValue);

        } else if (numRow % 2 == 0 && numRow % 4 != 0) {
            createMartixForSinglyEven(numRow, startValue);
            total(numRow, startValue);
        }

    } else {
        errorDiv.style.display = "block";
        errorDiv.style.visibility = "visible";
        errorP.innerHTML = "Number of Row should be equal to number of Columns";
        errorDiv.style.opacity = 0.6;
        setTimeout(fadeOutEffect, 2000);
    }
}

function fadeOutEffect() {

    let fadeTarget = document.getElementById("errorDiv");

    let fadeEffect = setInterval(function () {
        // if (!fadeTarget.style.opacity) {
        //     fadeTarget.style.opacity = 0.6;
        // }
        if (fadeTarget.style.opacity > 0) {
            fadeTarget.style.opacity -= 0.1;
        } else {
            clearInterval(fadeEffect);
        }
    }, 100);
}

function createMatrixForOdd(num, s) {

    let matrix = new Array(num);

    for (let i = 0; i < Number(num); i++) {
        matrix[i] = [];
    }
    for (let i = 0; i < num; i++) {

        for (let j = 0; j < num; j++) {

            matrix[i][j] = 0;
        }
    }

    let row = 0;
    let col = Math.floor(num / 2);

    endValue = (num * num) + s;

    for (let i = s; i < endValue; i++) {

        matrix[row][col] = i;

        const newRow = (row - 1 + num) % num;
        const newCol = (col + 1) % num;

        if (matrix[newRow][newCol] !== 0) {
            row = (row + 1) % num;
        } else {
            row = newRow;
            col = newCol;
        }
    }
    return matrix;
}

function createMatrixForEven(num, s) {

    let matrix = new Array(num);

    for (let i = 0; i < Number(num); i++) {
        matrix[i] = [];
    }

    let startValue = s;

    for (let i = 0; i < num; i++) {

        for (let j = 0; j < num; j++) {

            matrix[i][j] = startValue++;
        }
    }

    // top left

    for (let i = 0; i < Number(num / 4); i++) {

        for (let j = 0; j < Number(num / 4); j++) {

            matrix[i][j] = (((num * num) + s + s - 1) - matrix[i][j]);

        }
    }

    // top right

    for (let i = 0; i < Number(num / 4); i++) {

        for (let j = 3 * (Number(num / 4)); j < num; j++) {

            matrix[i][j] = (((num * num) + s + s - 1) - matrix[i][j]);

        }
    }

    // bottom left

    for (let i = 3 * Number(num / 4); i < num; i++) {
        for (let j = 0; j < Number(num / 4); j++) {

            matrix[i][j] = (((num * num) + s + s - 1) - matrix[i][j]);

        }
    }

    // bottom right

    for (let i = 3 * Number(num / 4); i < num; i++) {
        for (let j = 3 * Number(num / 4); j < num; j++) {

            matrix[i][j] = (((num * num) + s + s - 1) - matrix[i][j]);

        }
    }

    // center

    for (let i = Number(num / 4); i < 3 * Number(num / 4); i++) {

        for (let j = Number(num / 4); j < 3 * Number(num / 4); j++) {

            matrix[i][j] = (((num * num) + s + s - 1) - matrix[i][j]);
        }
    }

    createTable(num, matrix);
}

function createMartixForSinglyEven(num, s) {

    let matrix = new Array(num);

    for (let i = 0; i < Number(num); i++) {
        matrix[i] = [];
    }

    let startValue = s;

    for (let i = 0; i < num; i++) {

        for (let j = 0; j < num; j++) {

            matrix[i][j] = startValue++;
        }
    }

    let finalMatrix = new Array(num);

    for (let i = 0; i < Number(num); i++) {
        finalMatrix[i] = [];
    }
    for (let i = 0; i < num; i++) {

        for (let j = 0; j < num; j++) {

            finalMatrix[i][j] = 0;
        }
    }
    createShortMatrix(num, finalMatrix, s);
}

function createShortMatrix(num, finalMatrix, s) {

    let x = Math.sqrt(num * num / 4);

    let arr1 = new Array(x);
    let arr2 = new Array(x);
    let arr3 = new Array(x);
    let arr4 = new Array(x);

    for (let i = 0; i < x; i++) {
        arr1[i] = [];
    }
    for (let i = 0; i < x; i++) {
        arr2[i] = [];
    }
    for (let i = 0; i < x; i++) {
        arr3[i] = [];
    }
    for (let i = 0; i < x; i++) {
        arr4[i] = [];
    }
    for (let i = 0; i < x; i++) {
        for (let j = 0; j < x; j++) {
            arr1[i][j] = s++;
        }
    }
    for (let i = 0; i < x; i++) {
        for (let j = 0; j < x; j++) {
            arr2[i][j] = s++;
        }
    }
    for (let i = 0; i < x; i++) {
        for (let j = 0; j < x; j++) {
            arr3[i][j] = s++;
        }
    }
    for (let i = 0; i < x; i++) {
        for (let j = 0; j < x; j++) {
            arr4[i][j] = s++;
        }
    }
    arr1 = createMatrixForOdd(x, arr1[0][0]);
    arr2 = createMatrixForOdd(x, arr2[0][0]);
    arr3 = createMatrixForOdd(x, arr3[0][0]);
    arr4 = createMatrixForOdd(x, arr4[0][0]);

    for (let i = 0, k = 0; i < x, k < x; i++, k++) {
        for (let j = 0, l = 0; j < x, l < x; j++, l++) {
            finalMatrix[i][j] = arr1[k][l];
        }
    }

    for (let i = 0, k = 0; i < x, k < x; i++, k++) {
        for (let j = x, l = 0; j < x + x, l < x; j++, l++) {
            finalMatrix[i][j] = arr3[k][l];
        }
    }
    for (let i = x, k = 0; i < x + x, k < x; i++, k++) {
        for (let j = 0, l = 0; j < x, l < x; j++, l++) {
            finalMatrix[i][j] = arr4[k][l];
        }
    }
    for (let i = x, k = 0; i < x + x, k < x; i++, k++) {
        for (let j = x, l = 0; j < x + x, l < x; j++, l++) {
            finalMatrix[i][j] = arr2[k][l];
        }
    }

    if (num == 6) {

        let j = 0;

        for (let i = 0; i < x; i++) {

            let temp = finalMatrix[i][j];

            finalMatrix[i][j] = finalMatrix[i + x][j];

            finalMatrix[i + x][j] = temp;

            if (j == 0) {
                j = 1;
            } else if (j == 1) {
                j = 0;
            }
        }

    }
    if (num >= 10) {

        for (let i = 0; i < x; i++) {

            for (let j = 0; j < Math.floor(x / 2); j++) {

                if (i === Math.floor(x / 2)) {

                    let temp = finalMatrix[i][j + 1];

                    finalMatrix[i][j + 1] = finalMatrix[i + x][j + 1];

                    finalMatrix[i + x][j + 1] = temp;
                } else {

                    let temp = finalMatrix[i][j];

                    finalMatrix[i][j] = finalMatrix[i + x][j];

                    finalMatrix[i + x][j] = temp;
                }
            }
        }

        for (let i = 0; i < x; i++) {

            for (let j = finalMatrix.length - Math.floor(finalMatrix.length / 6); j < finalMatrix.length; j++) {

                let temp = finalMatrix[i][j];

                finalMatrix[i][j] = finalMatrix[i + x][j];

                finalMatrix[i + x][j] = temp;

            }
        }
    }
    createTable(num, finalMatrix);
}

function createTable(num, arr) {

    let table = document.getElementById("table");

    for (let i = 0; i < num; i++) {

        let row = table.insertRow(i);

        for (let j = 0; j < num; j++) {

            let cell = row.insertCell(j);

            cell.innerHTML = arr[i][j];
        }
    }
}

function total(num, s) {

    let sum = s;

    for (let i = 1; i <= num * num - 1; i++) {
        sum = sum + (s + i);
    }

    let total = sum / num;

    document.getElementById("total").innerHTML = "Sum is: " + total;
}