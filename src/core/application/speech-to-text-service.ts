export interface SpeechToText {
  recognizeSpeech(audio: Buffer): Promise<string>;
}
