<script setup>
  useHead({
    link: [
      {
        href: "https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.min.css",
        rel: "stylesheet",
        integrity: "sha384-rbsA2VBKQhggwzxH7pPCaAqO46MgnOM80zW1RWuH61DGLwZJEdK2Kadq2F9CUG65",
        crossorigin: "anonymous"
      }
    ],
    script: [
      {
        src: "https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/js/bootstrap.bundle.min.js",
        integrity: "sha384-kenU1KFdBIe4zVF0s0G1M5b4hcpxyD9F7jL+jjXkk+Q2h455rYXK/7HAuoJl+0I4",
        crossorigin: "anonymous"
      }
    ],
    bodyAttrs: {
      class: "bg-black text-white"
    }
  })

  const gameBoard = ref([[null, null, null, null, null, null, null, null, null], [null, null, null, null, null, null, null, null, null], [null, null, null, null, null, null, null, null, null], [null, null, null, null, null, null, null, null, null], [null, null, null, null, null, null, null, null, null], [null, null, null, null, null, null, null, null, null], [null, null, null, null, null, null, null, null, null], [null, null, null, null, null, null, null, null, null], [null, null, null, null, null, null, null, null, null]])

  function isValid(grid, row, col, number) { if (grid[row].includes(number) || grid.map(c => c[col]).includes(number)) return !1; for (let i = 0; i < 3; i++)if (grid.slice(Math.floor(row / 3) * 3 + i, Math.floor(row / 3) * 3 + (1 + i)).map((m) => { return m.slice(Math.floor(col / 3) * 3, Math.floor(col / 3) * 3 + 3) })[0].includes(number)) return !1; return !0 } function solve(grid, row = 0, col = 0) { if (row == 9) { return gameBoard.value = grid } else if (col == 9) return solve(grid, row + 1, 0); else if (grid[row][col] != 0 && grid[row][col] != null && grid[row][col] != undefined) return solve(grid, row, col + 1); else { for (let number = 1; number < 10; number++) { if (isValid(grid, row, col, number)) { grid[row][col] = number; if (solve(grid, row, col + 1)) return !0; grid[row][col] = 0 } } return !1 } }

  const solveHandler = (values, actions) => {
    if (!solve(gameBoard.value)) actions.setFieldError("error", "Cannot solve this puzzle")
  }

  function gamePiece(value) {
    if (value && value > 9 || value < 0) return false
    return true;
  }

  function setBold(e) {
    e.target.classList.add('fw-bold')
  }
</script>
<template>
  <main class="container d-flex align-items-center justify-content-center">
    <div class="row justify-content-center">
      <Form @submit="solveHandler">
        <div class="col-12">
          <h1 class="fs-1">nine x nine</h1>
        </div>
        <div class="col-12 game">
          <template v-for="row in 9">
            <Field v-for="col in 9" :name="row + 'x' + col" v-model.number="gameBoard[row-1][col-1]" type="number"
              class="form-control game-input fs-3" @change="setBold($event)" />
          </template>
        </div>
        <div class="col-12 mt-3 text-end">
          <button class="btn btn-lg btn-outline-light px-5 rounded-0 me-3" type="reset">CLEAR</button>
          <button class="btn btn-lg btn-outline-light px-5 rounded-0" type="submit">SOLVE</button>
          <ErrorMessage class="mt-2" as="div" name="error" v-slot="{ message }">
            <p class="form-message text-danger mt-1">{{
              message
              }}
            </p>
          </ErrorMessage>
        </div>
      </Form>
    </div>
  </main>
</template>