import * as p from "@clack/prompts";
import { isPipelexInstalled } from "../runtime/check.js";
import { ensureRuntime } from "../runtime/installer.js";
import { shutdown } from "../telemetry/posthog.js";
import { printLogo } from "./index.js";

export async function installSoftware(name: string): Promise<void> {
  printLogo();
  p.intro("mthds setup");

  if (name !== "pipelex") {
    p.log.error(`Unknown software: ${name}`);
    p.log.info("Available software: pipelex");
    p.outro("Done");
    process.exit(1);
  }

  if (isPipelexInstalled()) {
    p.log.success("pipelex is already installed.");
    p.outro("Done");
    await shutdown();
    return;
  }

  await ensureRuntime();
  p.log.success("pipelex installed successfully.");
  p.outro("Done");
  await shutdown();
}
