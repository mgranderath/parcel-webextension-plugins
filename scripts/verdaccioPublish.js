const { execSync } = require("child_process");
const path = require("path");

const parent = path.resolve(__dirname, "..");

const run = (cmd) => execSync(cmd, { encoding: "utf8", cwd: parent });
const bin = (cmd) => path.join(parent, "node_modules/.bin", cmd);

const sha = run("git rev-parse --short HEAD").trim();
const version = "0.0.1"

try {
  run(
    `${bin(
      "lerna"
    )} version -y --no-push --no-git-tag-version --exact ${version}-${sha}`
  );

  
  run(`git add .`);
  run(`git commit -m 'Temp' --no-verify`);

  run(
    `${bin("lerna")} publish -y --registry http://localhost:4873 from-package`
  );
} finally {
  execSync(`git reset --hard ${sha}`);
}
