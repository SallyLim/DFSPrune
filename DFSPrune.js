// //CONSTRAINT FUNCTIONS
// var A_G = function(assignment) {return !assignment["A"] && !assignment["G"] && assignment["A"] >= assignment["G"]}
// var A_H = function(assignment) {return !assignment["A"] && !assignment["H"] && assignment["A"] < assignment["H"]}
// var F_B = function(assignment) {return !assignment["F"] && !assignment["B"] && Math.abs(assignment["F"]-assignment["B"]) === 1}
// var G_H = function(assignment) {return !assignment["G"] && !assignment["H"] && assignment["G"] < assignment["H"]}
// var G_C = function(assignment) {return !assignment["G"] && !assignment["C"] && Math.abs(assignment["G"]-assignment["C"]) === 1}
// var H_C = function(assignment) {return !assignment["H"] && !assignment["C"] && (Math.abs(assignment["H"]-assignment["C"]) % 2) === 0}
// var H_D = function(assignment) {return !assignment["H"] && !assignment["D"] && assignment["H"] !== assignment["D"]}
// var D_G = function(assignment) {return !assignment["D"] && !assignment["G"] && assignment["D"] >= assignment["G"]}
// var D_C = function(assignment) {return !assignment["D"] && !assignment["C"] && assignment["D"] !== assignment["C"]}
// var E_C = function(assignment) {return !assignment["E"] && !assignment["C"] && assignment["E"] !== assignment["C"]}
// var E_D = function(assignment) {return !assignment["E"] && !assignment["D"] && assignment["E"] < assignment["D"]-1}
// var E_H = function(assignment) {return !assignment["E"] && !assignment["H"] && assignment["E"] !== assignment["H"]-2}
// var G_F = function(assignment) {return !assignment["G"] && !assignment["F"] && assignment["G"] !== assignment["F"]}
// var H_F = function(assignment) {return !assignment["H"] && !assignment["F"] && assignment["H"] !== assignment["F"]}
// var C_F = function(assignment) {return !assignment["C"] && !assignment["F"] && assignment["C"] !== assignment["F"]}
// var D_F = function(assignment) {return !assignment["D"] && !assignment["F"] && assignment["D"] !== assignment["F"]}
// var E_F = function(assignment) {return !assignment["E"] && !assignment["F"] && (Math.abs(assignment["E"]-assignment["F"]) % 2) === 1}
// edit above odd. 0 can be both even and odd

// var CSP = {
//   variable: ["A","B","C","D","E","F","G","H"],
//   domain: [1,2,3,4],
//   constraints: [A_G, A_H, F_B, G_H, G_C, H_C, H_D, D_G, D_C, E_C, E_D, E_H, G_F, H_F, C_F, D_F, E_F]
// }

// var order = ["A","B","C","D","E","F","G","H"]

// var initialAssignment = {
//     A: null,
//     B: null,
//     C: null,
//     D: null,
//     E: null,
//     F: null,
//     G: null,
//     H: null,
// }

//CONSTRAINT FUNCTIONS
// TODO: Need to make this so that it will return true when it's false
var X_Y = function(assignment) {return (assignment["X"] !== null && assignment["Y"] !== null && assignment["X"] === assignment["Y"])}
var Y_Z = function(assignment) {return (assignment["Y"] !== null && assignment["Z"]!== null && assignment["Y"] === assignment["Z"])}

var CSP = {
  variable: ["X","Y","Z"],
  domain: ["t","f"],
  constraints: [X_Y, Y_Z]
}

var initialAssignment = {
    X: null,
    Y: null,
    Z: null,
}

var solutions = []
// var failedCount = 0

function DFSPrune(assignment, CSP) {

    let frontier = []
    frontier.push(assignment)
    while (frontier.length !== 0) {

        let currAssignment = frontier.pop()
        console.log({currAssignment: currAssignment})
        
        if (complete(currAssignment)){
            if (consistent(currAssignment, CSP["constraints"])){
                solutions.push(currAssignment)
            }
        } else {
            let nextVariable = getNextVarToAssign(CSP["variable"], currAssignment)
            for (let i=0; i < CSP["domain"].length; i++) {
                currAssignment[nextVariable] = CSP["domain"][i]
                console.log({assignmentVar: currAssignment[nextVariable]})
                // if (consistent(currAssignment, CSP["constraints"])){
                    console.log({curr: currAssignment})
                    frontier.push(currAssignment)
                    console.log({frontier: frontier})

                // }
            }
        }

        
    }

}
//     //exit condition...?
//   if (complete(assignment)) {
//     // solutions.push(assignment)
//     // return
//     return assignment
//   }

//   let nextVariable = getNextVarToAssign(CSP["variable"], assignment)
  
//   for (let i=0; i < CSP["domain"].length; i++) {
//     assignment[nextVariable] = CSP["domain"][i]
//     console.log(assignment)

//     if (consistent(assignment, CSP["constraints"])) {
//       var result = DFSPrune(assignment, CSP)
        
//       if (result !== "FAIL") {
//         // solutions.push(result)
//         // return
//         return result
//       }
//     }
//     //   else {
//     //     failedCount++;
//     // }
//     assignment[nextVariable] = null

//   }
//   return "FAIL"
// }

function getNextVarToAssign(variable, assignment){
    for (let i = 0; i < variable.length; i++){
        if (assignment[variable[i]] === null){
            return variable[i]
        }
    }
}


function consistent(assignment, constraints) {
  for (let i=0; i<constraints.length; i++) {
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
console.log(solutions)






