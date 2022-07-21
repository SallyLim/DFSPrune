// CONSTRAINT FUNCTIONS
// Returns true if the constraint fails; false otherwise
var A_G = function(assignment) {return assignment["A"]!== null && assignment["G"]!== null && !(assignment["A"] >= assignment["G"])}
var A_H = function(assignment) {return assignment["A"]!== null && assignment["H"]!== null && !(assignment["A"] < assignment["H"])}
var F_B = function(assignment) {return assignment["F"]!== null && assignment["B"]!== null && !(Math.abs(assignment["F"]-assignment["B"]) === 1)}
var G_H = function(assignment) {return assignment["G"]!== null && assignment["H"]!== null && !(assignment["G"] < assignment["H"])}
var G_C = function(assignment) {return assignment["G"]!== null && assignment["C"]!== null && !(Math.abs(assignment["G"]-assignment["C"]) === 1)}
var H_C = function(assignment) {return assignment["H"]!== null && assignment["C"]!== null && !((Math.abs(assignment["H"]-assignment["C"]) % 2) === 0)}
var H_D = function(assignment) {return assignment["H"]!== null && assignment["D"]!== null && !(assignment["H"] !== assignment["D"])}
var D_G = function(assignment) {return assignment["D"]!== null && assignment["G"]!== null && !(assignment["D"] >= assignment["G"])}
var D_C = function(assignment) {return assignment["D"]!== null && assignment["C"]!== null && !(assignment["D"] !== assignment["C"])}
var E_C = function(assignment) {return assignment["E"]!== null && assignment["C"]!== null && !(assignment["E"] !== assignment["C"])}
var E_D = function(assignment) {return assignment["E"]!== null && assignment["D"]!== null && !(assignment["E"] < (assignment["D"]-1))}
var E_H = function(assignment) {return assignment["E"]!== null && assignment["H"]!== null && !(assignment["E"] !== (assignment["H"]-2))}
var G_F = function(assignment) {return assignment["G"]!== null && assignment["F"]!== null && !(assignment["G"] !== assignment["F"])}
var H_F = function(assignment) {return assignment["H"]!== null && assignment["F"]!== null && !(assignment["H"] !== assignment["F"])}
var C_F = function(assignment) {return assignment["C"]!== null && assignment["F"]!== null && !(assignment["C"] !== assignment["F"])}
var D_F = function(assignment) {return assignment["D"]!== null && assignment["F"]!== null && !(assignment["D"] !== assignment["F"])}
var E_F = function(assignment) {return assignment["E"]!== null && assignment["F"]!== null && !((Math.abs(assignment["E"]-assignment["F"]) % 2) === 1)}

// CSP Object with variables, domain and constraint functions
var CSP = {
  variable: ["F","H","C","D","G","E","A","B"],
  domain: [1,2,3,4],
  constraints: [A_G, A_H, F_B, G_H, G_C, H_C, H_D, D_G, D_C, E_C, E_D, E_H, G_F, H_F, C_F, D_F, E_F]
}

// Initial object with assignments initialized to null
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

// Global variables
var solutions = []
var failedCount = 0

// DSP Pruning function
function DFSPrune(assignment, CSP) {

    //initialize frontier with initial assignment
    let frontier = []
    frontier.push(assignment)

    //keep looping and checking assignments in the frontier until it is empty
    while (frontier.length !== 0) {
        console.log({Frontier: frontier})
        
        let currAssignment = frontier.pop()

        console.log({CurrentAssignment: currAssignment})

        if (complete(currAssignment)){
            //if completed assignment, check if consistent, if so, then it is a solution
            if (consistent(currAssignment, CSP["constraints"])){
                solutions.push(currAssignment)
            } else {
                failedCount++
            }
        } else {
            //if not completed assignment yet, continue to add to the frontier
            let nextVariable = getNextVarToAssign(CSP["variable"], currAssignment)
            for (let i=0; i < CSP["domain"].length; i++) {
                //deep copy of assignment
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

// Gets the next variable that has not been assigned yet
// Returns the variable
function getNextVarToAssign(variable, assignment){
    for (let i = 0; i < variable.length; i++){
        if (assignment[variable[i]] === null){
            return variable[i]
        }
    }
}

// Returns true if assigned variables meet the constraints; false otherwise
function consistent(assignment, constraints) {
  for (let i=0; i<constraints.length; i++) {
    if (constraints[i](assignment)) {
      // comes into the if statement if constraint have been violated
      return false
    }
  }
  return true
}

// Returns true if all variables have been assigned; false otherwise
function complete(assignment) {
  return Object.values(assignment).every(x => x !== null)
}

// Running the code and console.log to see the count of failed branches and solutions
DFSPrune(initialAssignment,CSP)
console.log([failedCount, solutions])






