function strToArr(vector) {
    let arrVector = [];
    for (let i = 0; i < vector.length; i++) {
        arrVector.push(parseInt(vector[i]));
    }
    return arrVector;
}

function arrToStr(vector) {
    const strVector = vector.join("")
    return strVector
}

function shiftVector(vector, position) {
    let newVector = [];
    for(let i = 0; i < position; i++) {
        newVector.push(0);
    }
    for(let i = position; i < vector.length; i++) {
        newVector.push(vector[i-position]);
    } 
    return newVector;
}

function resultantVector(vector, shiftVector) {
    let newVector = [];
    for(let i = 0; i < vector.length; i++) {
        newVector.push(vector[i] || shiftVector[i]);
    }
    return newVector;
}

function process(vector, position, indicator) {
    if(position <= vector.length) {
        if (vector[vector.length - position] == 0) {
            const iterationName = `Posicion (${indicator + position})`
            const shiftedVector = shiftVector(vector, position)
            const result = resultantVector(vector, shiftedVector)
            const iteration = {
                iterationName,
                vector,
                shiftedVector,
                result
            }
            saveData(iteration)
            
            if(vector.every((element, i) => element === result[i])) {
                return
            }
            if(result.includes(0)) {
                process(result, 1, `${position}, `)
            }
        }
        process(vector, position + 1, indicator)
    }
    else {
        return
    }
}

function saveData(iteration) {
    if (localStorage.getItem('iterations') === null) {
        let iterations = [];
        iterations.push(iteration);
        localStorage.setItem('iterations', JSON.stringify(iterations));
    }
    else {
        let iterations = JSON.parse(localStorage.getItem('iterations'));
        iterations.push(iteration);
        localStorage.setItem('iterations', JSON.stringify(iterations));
    }
}


localStorage.clear();

const vectorData = document.querySelector("#vector-data");

vectorData.addEventListener("submit", calculateProcess);


function calculateProcess(e) {
    e.preventDefault();
    const initialVector = document.querySelector("#vector").value;
    const vector = strToArr(initialVector);
    process(vector, 1, "") 
    vectorData.reset();
    showResults();
}

function showResults() {
    const results = JSON.parse(localStorage.getItem('iterations'));
    const resultsContainer = document.querySelector('.results');
    console.log(results)
    resultsContainer.innerHTML = ''
    resultsContainer.innerHTML += `<div class="process-heading">
            <h3>Vector: ${arrToStr(results[0].vector)}</h3>
        </div>`;

    for (let i = 0; i < results.length; i++) {
        resultsContainer.innerHTML += `<div class="result">
            <div class="result__heading">
                <p>${results[i].iterationName}</p>
            </div>
            <div class="result__content">
                <div class="result__content--vectors">
                    <p>${arrToStr(results[i].vector) }</p>
                    <p>${arrToStr(results[i].shiftedVector)}</p>
                </div>
                <div class="result__content--line">
                    <hr></hr>
                </div>
                <div class="result__content--result">
                    <p>${arrToStr(results[i].result)}</p>
                </div>
            </div>
        </div>`

    } 

}
