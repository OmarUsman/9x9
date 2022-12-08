// Create 9x9 2d array to hold game state
const gameBoard = [
    [0, 7, 1, 0, 4, 0, 0, 6, 2],
    [0, 0, 2, 0, 0, 7, 5, 0, 3],
    [0, 0, 5, 6, 2, 8, 7, 0, 0],

    [6, 0, 4, 1, 3, 9, 2, 0, 7],
    [7, 5, 0, 0, 0, 0, 6, 0, 0],
    [2, 0, 9, 7, 5, 0, 0, 0, 4],

    [0, 0, 6, 2, 0, 0, 0, 0, 0],
    [0, 2, 0, 0, 9, 3, 0, 7, 0],
    [4, 0, 7, 0, 0, 1, 9, 2, 0]
]

// Function to validate each move
function isValid(grid, row, col, number) {
    // If the number already exists in the row solution is incorrect
    if (grid[row].includes(number)) return false

    // If the number already exists in the column solution is incorrect
    else if (grid.map(c => c[col]).includes(number)) return false

    // The number exists in the quadrant the column solution is incorrect
    for (let i = 0; i < 3; i++) {
        if (grid.slice(Math.floor(row / 3) * 3 + i, Math.floor(row / 3) * 3 + (1 + i)).map((m) => { return m.slice(Math.floor(col / 3) * 3, Math.floor(col / 3) * 3 + 3) })[0].includes(number)) return false
    }
    // Return true if none of the conditions are true
    return true
}

// Function to recursively try every possbile move and backtrack at deadends
function solve(grid, row = 0, col = 0) {
    // Puzzle completed
    if (row == 9) return console.log(grid)

    // Row completed move to next row
    if (col == 9) return solve(grid, row + 1, 0)

    // Skip numbers that have already been set
    else if (grid[row][col] != 0) return solve(grid, row, col + 1)

    else {
        // Loop that tries every number 1-9
        for (let number = 1; number < 10; number++) {
            // Check if current number is a viable solution
            if (isValid(grid, row, col, number)) {
                // If so, Change number on grid
                grid[row][col] = number
                // Move on to next number
                if (solve(grid, row, col + 1)) return true
                // If execution stack comes here, a dead end was reached so undo number change and try next solution
                grid[row][col] = 0
            }
        }
        return false
    }
}

console.time("solve");
solve(gameBoard)
console.timeEnd("solve");
