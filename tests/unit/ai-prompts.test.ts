import { describe, expect, it } from "vitest";
import { composeSystemPrompt } from "@/lib/ai/prompts";

describe("system prompt response preferences", () => {
  it.each([
    ["hi", "Hindi"],
    ["es", "Spanish"],
    ["fr", "French"],
    ["de", "German"],
    ["pt", "Portuguese"],
    ["ja", "Japanese"],
  ] as const)("requests responses in %s", (language, expectedLanguage) => {
    expect(composeSystemPrompt("default", language)).toContain(`Always respond in ${expectedLanguage}`);
  });

  it("keeps custom instructions explicitly subordinate to system and safety instructions", () => {
    const prompt = composeSystemPrompt("default", "en", "build", "Use metric units.");

    expect(prompt).toContain("Use metric units.");
    expect(prompt).toContain("user preference");
    expect(prompt).toContain("consistent with system and safety instructions");
  });

  it("uses the complete mode-specific prompt and defaults to Ask", () => {
    const ask = composeSystemPrompt();
    const plan = composeSystemPrompt("default", "en", "plan");
    const build = composeSystemPrompt("default", "en", "build");

    expect(ask).toContain("[Mode Instruction - ASK]");
    expect(ask).toContain("MASTER BEHAVIOURAL PROMPT");
    expect(ask).toContain("20. ASK MODE COMPLETION STANDARD");
    expect(plan).toContain("[Mode Instruction - PLAN]");
    expect(plan).toContain("PERSONAL STRATEGY, GOAL DESIGN, CAREER ROADMAPS & EXECUTION PLANNING");
    expect(plan).toContain("END OF RADIANCE PLAN MODE INSTRUCTIONS");
    expect(build).toContain("[Mode Instruction - BUILD]");
    expect(build).toContain("RADIANCE BUILD MODE");
    expect(build).toContain("19. FINAL BEHAVIOURAL STANDARD");
    expect(plan).not.toBe(build);
    expect(ask).not.toContain("END OF RADIANCE PLAN MODE INSTRUCTIONS");
    expect(plan).not.toContain("RADIANCE BUILD MODE");
    expect(build).not.toContain("MASTER BEHAVIOURAL PROMPT");
  });

  it("falls back to Ask for an unknown mode and keeps shared controls", () => {
    const prompt = composeSystemPrompt("concise", "ja", "unexpected-mode", "Prefer examples.");

    expect(prompt).toContain("[Mode Instruction - ASK]");
    expect(prompt).toContain("MASTER BEHAVIOURAL PROMPT");
    expect(prompt).toContain("Always respond in Japanese.");
    expect(prompt).toContain("Prefer examples.");
  });
});
