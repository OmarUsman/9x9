const gameBoard = [[0, 7, 1, 0, 4, 0, 0, 6, 2], [0, 0, 2, 0, 0, 7, 5, 0, 3], [0, 0, 5, 6, 2, 8, 7, 0, 0], [6, 0, 4, 1, 3, 9, 2, 0, 7], [7, 5, 0, 0, 0, 0, 6, 0, 0], [2, 0, 9, 7, 5, 0, 0, 0, 4], [0, 0, 6, 2, 0, 0, 0, 0, 0], [0, 2, 0, 0, 9, 3, 0, 7, 0], [4, 0, 7, 0, 0, 1, 9, 2, 0]]

function isValid(grid, row, col, number) {
    if (grid[row].includes(number)) return false
    else if (grid.map(c => c[col]).includes(number)) return false
    for (let i = 0; i < 3; i++) if (grid.slice(Math.floor(row / 3) * 3 + i, Math.floor(row / 3) * 3 + (1 + i)).map((m) => { return m.slice(Math.floor(col / 3) * 3, Math.floor(col / 3) * 3 + 3) })[0].includes(number)) return false
    return true
}

function solve(grid, row = 0, col = 0) {
    if (row == 9) return console.log(grid)
    else if (col == 9) return solve(grid, row + 1, 0)
    else if (grid[row][col] != 0) return solve(grid, row, col + 1)
    else {
        for (let number = 1; number < 10; number++) {
            if (isValid(grid, row, col, number)) {
                grid[row][col] = number
                if (solve(grid, row, col + 1)) return true
                grid[row][col] = 0
            }
        }
        return false
    }
}

console.time("solve");
solve(gameBoard)
console.timeEnd("solve");
