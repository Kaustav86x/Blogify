const textToSpeech = require('@google-cloud/text-to-speech');
const fs = require('fs');
const util = require('util');
const path = require('path');

// Path to your credentials
process.env.GOOGLE_APPLICATION_CREDENTIALS = path.join(__dirname, '../config/google-tts-key.json');

const client = new textToSpeech.TextToSpeechClient();

const generateAudio = async (text, fileName = 'output') => {
  const request = {
    input: { text },
    voice: { languageCode: 'en-US', ssmlGender: 'FEMALE' },
    audioConfig: { audioEncoding: 'MP3' },
  };

  const [response] = await client.synthesizeSpeech(request);

  const outputPath = path.join(__dirname, `../public/audio/${fileName}.mp3`);
  const writeFile = util.promisify(fs.writeFile);
  await writeFile(outputPath, response.audioContent, 'binary');

  console.log(`Audio content written to file: ${outputPath}`);
  return `/audio/${fileName}.mp3`;
};

module.exports = generateAudio;