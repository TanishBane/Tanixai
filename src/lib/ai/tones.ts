import type { ToneDefinition, ToneKey } from "@/lib/types/chat";

export const TONES: Record<ToneKey, ToneDefinition> = {
  default: {
    id: "default",
    label: "Default",
    icon: "✦",
    desc: "Natural, balanced & direct",
    prompt: "",
  },
  formal: {
    id: "formal",
    label: "Formal",
    icon: "🎯",
    desc: "Professional, structured & precise",
    prompt: "Respond in a formal, professional tone. Use precise language, clean transitions, and avoid colloquialisms.",
  },
  casual: {
    id: "casual",
    label: "Casual",
    icon: "💬",
    desc: "Relaxed, warm & conversational",
    prompt: "Respond in an approachable, casual conversational tone. Friendly, concise, and direct — like talking to a sharp peer.",
  },
  concise: {
    id: "concise",
    label: "Concise",
    icon: "⚡",
    desc: "2–3 sentences max, zero filler",
    prompt: "Be extremely concise: 2 to 3 sentences maximum unless the question strictly requires more. No preamble, no postamble. Get directly to the answer.",
  },
  academic: {
    id: "academic",
    label: "Academic",
    icon: "📚",
    desc: "Scholarly, rigorous & cited",
    prompt: "Respond in an academic tone with rigorous logical progression, accurate domain terminology, and clear conceptual grounding.",
  },
  executive: {
    id: "executive",
    label: "Executive",
    icon: "📊",
    desc: "C-suite brief, key takeaway first",
    prompt: "Respond in an executive summary style. Lead with the single key takeaway in sentence one. Follow with 2–3 actionable supporting points.",
  },
  mentor: {
    id: "mentor",
    label: "Mentor",
    icon: "🧭",
    desc: "Guiding, honest & empowering",
    prompt: "Respond as a wise technical mentor who challenges assumptions constructively, highlights blind spots, and empowers independent understanding.",
  },
  technical: {
    id: "technical",
    label: "Technical",
    icon: "⚙️",
    desc: "Implementation-ready & rigorous",
    prompt: "Respond with high technical precision. Include implementation details, typings, edge cases, and architectural trade-offs.",
  },
  socratic: {
    id: "socratic",
    label: "Socratic",
    icon: "🔍",
    desc: "Question-led exploration",
    prompt: "Guide the user Socratically through well-placed inquiry and step-by-step reasoning rather than simply providing the final answer.",
  },
  devil: {
    id: "devil",
    label: "Devil's Advocate",
    icon: "😈",
    desc: "Challenges underlying assumptions",
    prompt: "Play devil's advocate. Respectfully and vigorously challenge the premises of the question. Offer the strongest reasonable counter-argument.",
  },
};
