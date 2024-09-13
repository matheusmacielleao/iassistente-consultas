import { generateAppointmentResume } from "../../../config";

export const handlerAudioResume = async (
  request: Request
): Promise<Response> => {
  const formData = await request.formData();
  const audio = formData.get("audio");
  if (!audio) {
    return new Response("Audio is required", { status: 400 });
  }

  const blob = audio as unknown as Blob;
  const hash = Math.random().toString(36).substring(7);

  const audioFilePath = `temp/${hash}-audio.mp3`;

  await Bun.write(audioFilePath, blob);

  const resume = await generateAppointmentResume.OfAudioRecording(
    audioFilePath,
    hash
  );

  return Response.json(resume);
};
