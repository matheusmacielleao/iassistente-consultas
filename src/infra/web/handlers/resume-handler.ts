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

  await Bun.write("temp/audio.mp3", blob);

  const audioFilePath = "temp/audio.mp3";
  const resume = await generateAppointmentResume.OfAudioRecording(
    audioFilePath
  );

  return Response.json(resume);
};
