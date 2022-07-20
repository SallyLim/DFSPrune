// CONSTRAINT FUNCTIONS
// Returns true if the constraint has been violated
var A_G = function(assignment) {return !assignment["A"] && !assignment["G"] && assignment["A"] < assignment["G"]}
var A_H = function(assignment) {return !assignment["A"] && !assignment["H"] && assignment["A"] >= assignment["H"]}
var F_B = function(assignment) {return !assignment["F"] && !assignment["B"] && Math.abs(assignment["F"]-assignment["B"]) !== 1}
var G_H = function(assignment) {return !assignment["G"] && !assignment["H"] && assignment["G"] >= assignment["H"]}
var G_C = function(assignment) {return !assignment["G"] && !assignment["C"] && Math.abs(assignment["G"]-assignment["C"]) !== 1}
var H_C = function(assignment) {return !assignment["H"] && !assignment["C"] && (Math.abs(assignment["H"]-assignment["C"]) % 2) !== 0}
var H_D = function(assignment) {return !assignment["H"] && !assignment["D"] && assignment["H"] === assignment["D"]}
var D_G = function(assignment) {return !assignment["D"] && !assignment["G"] && assignment["D"] < assignment["G"]}
var D_C = function(assignment) {return !assignment["D"] && !assignment["C"] && assignment["D"] === assignment["C"]}
var E_C = function(assignment) {return !assignment["E"] && !assignment["C"] && assignment["E"] === assignment["C"]}
var E_D = function(assignment) {return !assignment["E"] && !assignment["D"] && assignment["E"] >= assignment["D"]-1}
var E_H = function(assignment) {return !assignment["E"] && !assignment["H"] && assignment["E"] === assignment["H"]-2}
var G_F = function(assignment) {return !assignment["G"] && !assignment["F"] && assignment["G"] === assignment["F"]}
var H_F = function(assignment) {return !assignment["H"] && !assignment["F"] && assignment["H"] === assignment["F"]}
var C_F = function(assignment) {return !assignment["C"] && !assignment["F"] && assignment["C"] === assignment["F"]}
var D_F = function(assignment) {return !assignment["D"] && !assignment["F"] && assignment["D"] === assignment["F"]}
var E_F = function(assignment) {return !assignment["E"] && !assignment["F"] && (Math.abs(assignment["E"]-assignment["F"]) % 2) !== 1 || assignment["E"] !== assignment["F"]}

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
        console.log({frontier: frontier})
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
    console.log("here")
  for (let i=0; i<constraints.length; i++) {
    console.log({constraints: constraints[i]})
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






