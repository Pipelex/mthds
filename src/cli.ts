#!/usr/bin/env node
import { Command, CommanderError } from "commander";
import { createRequire } from "node:module";
import * as p from "@clack/prompts";
import { showBanner } from "./commands/index.js";
import { printLogo } from "./commands/index.js";
import { installRunner } from "./commands/setup.js";
import { installMethod } from "./commands/install.js";
import { configSet, configGet, configList } from "./commands/config.js";

const require = createRequire(import.meta.url);
const pkg = require("../package.json") as { version: string };

const program = new Command();

program
  .name("mthds")
  .version(pkg.version)
  .description("CLI bridge to the Pipelex runtime")
  .exitOverride()
  .configureOutput({
    writeOut: () => {},
    writeErr: () => {},
  });

// mthds install <slug>
program
  .command("install")
  .argument("<slug>", "Method slug to install")
  .description("Install a method")
  .exitOverride()
  .action(async (slug: string) => {
    await installMethod(slug);
  });

// mthds setup runner <name>
const setup = program.command("setup").exitOverride();

setup
  .command("runner <name>")
  .description("Install a runner (e.g. pipelex)")
  .exitOverride()
  .action(async (name: string) => {
    await installRunner(name);
  });

// mthds config set|get|list
const config = program.command("config").description("Manage configuration").exitOverride();

config
  .command("set")
  .argument("<key>", "Config key (runner, api-url, api-key)")
  .argument("<value>", "Value to set")
  .description("Set a config value")
  .exitOverride()
  .action(async (key: string, value: string) => {
    await configSet(key, value);
  });

config
  .command("get")
  .argument("<key>", "Config key (runner, api-url, api-key)")
  .description("Get a config value")
  .exitOverride()
  .action(async (key: string) => {
    await configGet(key);
  });

config
  .command("list")
  .description("List all config values")
  .exitOverride()
  .action(async () => {
    await configList();
  });

// Default: show banner
program.action(() => {
  showBanner();
});

program.parseAsync(process.argv).catch((err: unknown) => {
  if (err instanceof CommanderError) {
    // --help and --version exit with code 0
    if (err.exitCode === 0) {
      process.exit(0);
    }

    printLogo();
    p.intro("mthds");

    const message = err.message
      .replace(/^error: /, "")
      .replace(/^Error: /, "");

    p.log.error(message);

    if (err.code === "commander.missingArgument") {
      p.log.info("Run mthds --help to see usage.");
    }

    p.outro("");
    process.exit(1);
  }

  printLogo();
  p.intro("mthds");
  p.log.error((err as Error).message);
  p.outro("");
  process.exit(1);
});
