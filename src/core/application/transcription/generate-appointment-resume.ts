import type { LlmService } from "../services/llm-service";
import type { SpeechToText } from "../services/speech-to-text-service";

export class GenerateAppointmentResume {
  constructor(
    private readonly llmService: LlmService,
    private readonly speechToText: SpeechToText
  ) {}

  async OfAudioRecording(
    audioFilePath: string,
    hash: string
  ): Promise<string[]> {
    const transcription = await this.speechToText.recognizeSpeech(
      audioFilePath,
      hash
    );
    return this.llmService.getResumeOfTextInListFormat(transcription);
  }
}
