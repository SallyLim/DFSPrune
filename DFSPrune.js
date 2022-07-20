//CONSTRAINT FUNCTIONS
var A_G = function(assignment) {return assignment["A"]!== null && assignment["G"]!== null && !(assignment["A"] >= assignment["G"])}
var A_H = function(assignment) {return assignment["A"]!== null && assignment["H"]!== null && !(assignment["A"] < assignment["H"])}
var F_B = function(assignment) {return assignment["F"]!== null && assignment["B"]!== null && !(Math.abs(assignment["F"]-assignment["B"]) === 1)}
var G_H = function(assignment) {return assignment["G"]!== null && assignment["H"]!== null && !(assignment["G"] < assignment["H"])}
var G_C = function(assignment) {return assignment["G"]!== null && !assignment["C"]!== null && !(Math.abs(assignment["G"]-assignment["C"]) === 1)}
var H_C = function(assignment) {return assignment["H"]!== null && !assignment["C"]!== null && !((Math.abs(assignment["H"]-assignment["C"]) % 2) === 0)}
var H_D = function(assignment) {return assignment["H"]!== null && !assignment["D"]!== null && !(assignment["H"] !== assignment["D"])}
var D_G = function(assignment) {return assignment["D"]!== null && !assignment["G"]!== null && !(assignment["D"] >= assignment["G"])}
var D_C = function(assignment) {return assignment["D"]!== null && !assignment["C"]!== null && !(assignment["D"] !== assignment["C"])}
var E_C = function(assignment) {return assignment["E"]!== null && !assignment["C"]!== null && !(assignment["E"] !== assignment["C"])}
var E_D = function(assignment) {return assignment["E"]!== null && !assignment["D"]!== null && !(assignment["E"] < assignment["D"]-1)}
var E_H = function(assignment) {return assignment["E"]!== null && !assignment["H"]!== null && !(assignment["E"] !== assignment["H"]-2)}
var G_F = function(assignment) {return assignment["G"]!== null && !assignment["F"]!== null && !(assignment["G"] !== assignment["F"])}
var H_F = function(assignment) {return assignment["H"]!== null && !assignment["F"]!== null && !(assignment["H"] !== assignment["F"])}
var C_F = function(assignment) {return assignment["C"]!== null && !assignment["F"]!== null && !(assignment["C"] !== assignment["F"])}
var D_F = function(assignment) {return assignment["D"]!== null && !assignment["F"]!== null && !(assignment["D"] !== assignment["F"])}
var E_F = function(assignment) {return assignment["E"]!== null && !assignment["F"]!== null && !((Math.abs(assignment["E"]-assignment["F"]) % 2) === 1 || assignment["E"] === assignment["F"])}

var CSP = {
  variable: ["A","B","C","D","E","F","G","H"],
  domain: [1,2,3,4],
  constraints: [A_G, A_H, F_B, G_H, G_C, H_C, H_D, D_G, D_C, E_C, E_D, E_H, G_F, H_F, C_F, D_F, E_F]
}

var initialAssignment = {
    A: null,
    B: null,
    C: null,
    D: null,
    E: null,
    F: null,
    G: null,
    H: null,
}

//CONSTRAINT FUNCTIONS
// var X_Y = function(assignment) {return (assignment["X"] !== null && assignment["Y"] !== null && assignment["X"] === assignment["Y"])}
// var Y_Z = function(assignment) {return (assignment["Y"] !== null && assignment["Z"]!== null && assignment["Y"] === assignment["Z"])}

// var CSP = {
//   variable: ["X","Y","Z"],
//   domain: ["t","f"],
//   constraints: [X_Y, Y_Z]
// }

// var initialAssignment = {
//     X: null,
//     Y: null,
//     Z: null,
// }






var solutions = []
var failedCount = 0

function DFSPrune(assignment, CSP) {

    let frontier = []
    frontier.push(assignment)

    while (frontier.length !== 0) {
        // console.log({frontier: frontier})
        let currAssignment = frontier.pop()

        if (complete(currAssignment)){
            if (consistent(currAssignment, CSP["constraints"])){
                solutions.push(currAssignment)
            } else {
                failedCount++
            }
        } else {
            let nextVariable = getNextVarToAssign(CSP["variable"], currAssignment)
            for (let i=0; i < CSP["domain"].length; i++) {
                let clone = JSON.parse(JSON.stringify(currAssignment))
                clone[nextVariable] = CSP["domain"][i]
                if (consistent(clone, CSP["constraints"])){
                    frontier.push(clone)
                }  else {
                    failedCount++
                }
            }
        }

        
    }

}

function getNextVarToAssign(variable, assignment){
    for (let i = 0; i < variable.length; i++){
        if (assignment[variable[i]] === null){
            return variable[i]
        }
    }
}


function consistent(assignment, constraints) {
  for (let i=0; i<constraints.length; i++) {
    // console.log(constraints[i])
    // console.log(constraints[i](assignment))
    if (constraints[i](assignment)) {
        // come in if constraint have been violated
      return false
    }
  }
  return true
}

function complete(assignment) {
  return Object.values(assignment).every(x => x !== null)
}


DFSPrune(initialAssignment,CSP)
console.log([failedCount, solutions])






