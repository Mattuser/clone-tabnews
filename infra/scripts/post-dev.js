const { spawn, execSync } = require("node:child_process");

process.stdin.resume();

function handleSigterm() {
  spawn("npm", ["run", "dev:up"], {
    killSignal: "SIGINT",
    stdio: "inherit",
  });
}

process.on("SIGINT", () => {
  process.stdout.write("\nCleaning up 🧹...");
  execSync("npm run services:stop");
  process.exit(0);
});

handleSigterm();
