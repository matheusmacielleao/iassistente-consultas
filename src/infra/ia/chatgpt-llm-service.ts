import type OpenAI from "openai";
import type { LlmService } from "../../core/application/services/llm-service";

export class ChatGptLLMService implements LlmService {
  constructor(private readonly openai: OpenAI) {}

  async getResumeOfTextInListFormat(prompt: string): Promise<string[]> {
    console.log("Prompt: ", prompt);
    const result = await this.openai.chat.completions.create({
      messages: [
        {
          role: "user",
          content:
            "gere um resumo em pontos da seguinte trancricao de audio, sabendo que podem conter erros de transcricao: " +
            prompt,
        },
      ],
      model: "gpt-3.5-turbo",
    });

    const processedMessage = result.choices[0].message.content;
    if (!processedMessage) {
      throw new Error("Error processing message on GPT");
    }

    return processedMessage.split("\n");
  }
}
