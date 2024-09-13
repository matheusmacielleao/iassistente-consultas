export interface SpeechToText {
  recognizeSpeech(
    audioFilePath: string,
    hashFolderPath: string
  ): Promise<string>;
}
