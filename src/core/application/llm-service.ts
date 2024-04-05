export interface LlmService {
  getResumeOfTextInListFormat(text: string): Promise<string[]>;
}
