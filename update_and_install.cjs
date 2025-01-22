const { execSync } = require("child_process");

function runCommand(command) {
  console.log(`Running: ${command}`);
  execSync(command, { stdio: "inherit" });
}

runCommand("git pull");

runCommand("npm install --force");
