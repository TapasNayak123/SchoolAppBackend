const tempStr = "aaabbbccccaadddddp";

//Output :- if iteration 1 : abcad
//Output :- if iteration 2 : aabbccaadd
//Output :- if iteration 3 : aaabbbbccccddd
//Output :- if iteration 4 : ccccdddd
//Output :- if iteration 5 : ddddd
//Output :- if iteration 6 : ""

function createPatterns(str, iteration) {
    let finalPattern = "";
    let tempResult = [];
    let result = [];
    for (let char of str) {
        if (tempResult.includes(char)) {
            tempResult.push(char)
        } else {
            if (tempResult.length === 0) {
                tempResult.push(char)
            } else {
                result.push(tempResult)
                tempResult = [];
                tempResult.push(char)
            }

        }
    }

    if (tempResult.length > 0) {
        result.push(tempResult)
    }

    result.forEach(elements => {
        if (elements.length >= iteration) {
            finalPattern += elements.slice(0, iteration)
        }
    })
    console.log("Result is ", result)
    console.log("finalPattern is rrrr ", finalPattern.replaceAll(',', ''))
}

createPatterns(tempStr, 2)
