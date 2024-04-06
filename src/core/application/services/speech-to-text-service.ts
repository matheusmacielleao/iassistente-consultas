export interface SpeechToText {
  recognizeSpeech(audioFilePath: string): Promise<string>;
}
