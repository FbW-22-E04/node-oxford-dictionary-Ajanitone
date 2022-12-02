const { promisify } = require('util')
const { exec } = require('child_process')

const asyncExec = promisify(exec);

const termsDefs = [
    ['lazy', 'unwilling'],
    ['arrest', 'custody'],
    ['host', 'receiving'],
    ['landscape', 'visible features']
]

async function runCommand(command) {
  const out = await asyncExec(command)
  return out.stdout.replace(/(\r\n|\n|\r)/gm, "") // remove line breaks
}

describe("Program", () => {
    test("solution.js exists", async () => {
        require('../solution.js')
    })

    test("program outputs definition for passed term", async () => {
        const randNum = Math.floor(Math.random() * 4)
        const termDef = termsDefs[randNum]
        const result = await runCommand(`node solution.js ${termDef[0]}`)

        expect(result).toMatch(termDef[1])
    })
});