import chalk from "chalk";
import { createRequire } from "node:module";

function getVersion(): string {
  try {
    const require = createRequire(import.meta.url);
    const pkg = require("../../package.json") as { version: string };
    return pkg.version;
  } catch {
    return "0.0.0";
  }
}

const LOGO = [
  "                    __  __              __",
  "   ____ ___  ___  / /_/ /_  ____  ____/ /____",
  "  / __ `__ \\/ _ \\/ __/ __ \\/ __ \\/ __  / ___/",
  " / / / / / /  __/ /_/ / / / /_/ / /_/ (__  )",
  "/_/ /_/ /_/\\___/\\__/_/ /_/\\____/\\__,_/____/",
];

export function printLogo(): void {
  console.log();
  for (const line of LOGO) {
    console.log(chalk.white(line));
  }
  console.log();
}

export function showBanner(): void {
  const version = getVersion();

  printLogo();
  console.log(chalk.dim(`  v${version}\n`));

  console.log(chalk.bold("  Usage:"));
  console.log(`    ${chalk.green("mthds")} ${chalk.yellow("<command>")} [options]\n`);

  console.log(chalk.bold("  Commands:"));
  console.log(
    `    ${chalk.yellow("install <slug>")}         Install a method`
  );
  console.log(
    `    ${chalk.yellow("setup software <name>")} Install a software runtime`
  );
  console.log(
    `    ${chalk.yellow("--help")}                  Show this help message`
  );
  console.log(
    `    ${chalk.yellow("--version")}               Show version\n`
  );

  console.log(chalk.bold("  Examples:"));
  console.log(`    ${chalk.dim("$")} mthds install my-method-slug`);
  console.log(`    ${chalk.dim("$")} mthds setup software pipelex\n`);

  console.log(
    chalk.dim("  Docs: https://pipelex.dev/docs\n")
  );

  console.log(chalk.bold("  Telemetry:"));
  console.log(
    chalk.dim(
      "  Anonymous usage data (method slug + timestamp) is collected\n  to help rank methods. No personal info is collected.\n  Opt out: DISABLE_TELEMETRY=1\n"
    )
  );
}
