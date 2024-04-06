import type { LlmService } from "../services/llm-service";
import type { SpeechToText } from "../services/speech-to-text-service";

export class GenerateAppointmentResume {
  constructor(
    private readonly llmService: LlmService,
    private readonly speechToText: SpeechToText
  ) {}

  async OfAudioRecording(audioFilePath: string): Promise<string[]> {
    const transcription = await this.speechToText.recognizeSpeech(
      audioFilePath
    );
    return this.llmService.getResumeOfTextInListFormat(transcription);
  }
}
