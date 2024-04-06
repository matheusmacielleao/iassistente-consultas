import type OpenAI from "openai";
import type { SpeechToText } from "../../core/application/services/speech-to-text-service";
import fs from "fs";
import mm, { type IAudioMetadata } from "music-metadata";
const MediaSplit = require("../../../media-split");

export class WhisperService implements SpeechToText {
  private readonly whisperFileLimit;
  constructor(private readonly openai: OpenAI) {
    this.whisperFileLimit = process.env.OPEN_AI_WHISPER_FILE_LIMIT_MB
      ? Number(process.env.OPEN_AI_WHISPER_FILE_LIMIT_MB)
      : 25;
  }

  async recognizeSpeech(audioFilePath: string): Promise<string> {
    const splitedFilesPaths = await this.splitMp3File(audioFilePath);

    const transcriptions = await Promise.all(
      splitedFilesPaths.map((filePath) => this.sendToWhisper(filePath))
    );
    return transcriptions.join(" ");
  }
  async sendToWhisper(audioFilePath: string): Promise<string> {
    const transcription = await this.openai.audio.transcriptions.create({
      file: fs.createReadStream(audioFilePath),
      model: "whisper-1",
      response_format: "verbose_json",
      timestamp_granularities: ["word"],
    });

    return transcription.text;
  }

  async splitMp3File(filePath: string): Promise<SlitedFilePaths> {
    const mbChuncksSize = this.whisperFileLimit;

    const parser: IAudioMetadata = await mm.parseFile(filePath, {
      duration: true,
    });
    const file = Bun.file(filePath);

    const fileSizeMb = file.size / 1000000;

    if (!parser.format.duration) {
      throw new Error("Error parsing file duration");
    }

    const duration = parser.format.duration | 0;
    const rest = fileSizeMb % mbChuncksSize;

    const cuts =
      rest !== 0
        ? ((fileSizeMb / mbChuncksSize) | 0) + 1
        : (fileSizeMb / mbChuncksSize) | 0;

    const sectionsSize = ((duration / cuts) | 0) + 1;

    const date = new Date(Date.UTC(2000, 0, 0, 0, 0, 0, 0));
    const sections: string[] = [];

    for (let i = 0; i < cuts; i++) {
      const start = `${date.getMinutes()}:${date.getSeconds()}`;
      date.setTime(date.getTime() + sectionsSize * 1000);
      const end = `${date.getMinutes()}:${date.getSeconds()}`;
      sections.push(`[${start} - ${end}] part-${i + 1}`);
    }

    const split = new MediaSplit({
      input: filePath,
      sections,
    } as any);

    const splitedFilesPaths: Array<string> = (await split.parse()).map(
      (section: { name: string }) => {
        return section.name;
      }
    );
    return splitedFilesPaths;
  }
}

export type SlitedFilePaths = Array<string>;
