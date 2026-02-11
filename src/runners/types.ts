export type RunnerType = "api" | "pipelex";

export interface RunOptions {
  input?: Record<string, unknown>;
}

export interface RunResult {
  output: unknown;
}

export interface Runner {
  readonly type: RunnerType;
  run(pipe: string, options?: RunOptions): Promise<RunResult>;
}
