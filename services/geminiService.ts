// Claude-backed services (the page's `sample` capability). Filename kept so imports stay stable.
import { GeneratedPrayerResponse } from "../types";
import { ATLANTIS_BOOK_FULL_TEXT } from "../data/atlantisKnowledge";

const getSample = async (): Promise<any> => {
  const c = (window as any).claude;
  const sample = c?.use ? await c.use("sample") : null;
  if (!sample) throw new Error("The Atlantis oracle is unavailable in this view.");
  return sample;
};

export interface AtlantisChat {
  sendMessage: (args: { message: string }) => Promise<{ text: string }>;
}

const CHAT_SYSTEM = `You are the Atlantis AI.
SOURCE MATERIAL: ${ATLANTIS_BOOK_FULL_TEXT}

CORE DIRECTIVE: Be EXTREMELY concise and fast.
- Limit responses to 1-3 short sentences maximum.
- Use bullet points for steps/lists.
- Prioritize high-vibrational, practical advice.
- Do not include long introductions or conclusions.
- Style: Wise, direct, and swift.`;

export const createAtlantisChat = (): AtlantisChat => {
  const history: { role: "user" | "assistant"; content: string }[] = [];
  return {
    async sendMessage({ message }) {
      const sample = await getSample();
      history.push({ role: "user", content: message });
      const input = [
        { role: "user" as const, content: CHAT_SYSTEM + "\n\nConversation follows. Reply as the Atlantis AI to the last user message." },
        { role: "assistant" as const, content: "Understood." },
        ...history,
      ];
      const r = await sample(input, { cache: false, modelTier: "quick" });
      history.push({ role: "assistant", content: r.text });
      return { text: r.text };
    },
  };
};

export const generatePrayer = async (
  topic: string,
  length: "short" | "medium" | "long" = "medium"
): Promise<GeneratedPrayerResponse> => {
  const sample = await getSample();
  const lengthInstruction = {
    short: "Keep the prayer very brief (1-2 sentences).",
    medium: "Standard length prayer (1-2 paragraphs).",
    long: "Extensive and ornate multi-paragraph prayer.",
  }[length];
  const prompt = `Compose a sacred, dignified prayer for: "${topic}". Length: ${lengthInstruction}
Include English, traditional Latin, and Italian versions.
Return ONLY JSON of this shape:
{"title": string, "englishText": string, "latinText": string, "italianText": string,
 "metrics": {"power": integer 0-100, "faith": integer 0-100},
 "categories": string[] (e.g. Gratitude, Guidance, Healing, Protection, Comfort)}`;
  const r = await sample.json(prompt, { cache: false });
  return r as GeneratedPrayerResponse;
};
