const fs = require(`fs`);
const file = `videos/video.mp4`;

const readStream = fs.createReadStream(file);

fs.stat(file, (err, data) => {
  const total = data.size;

  let progres = 0;
  let percent = 0

  readStream.on(`data`, chunk => {
    console.log(`%${Math.round(percent)}`)

    progres += chunk.length;
    percent = progres*100/total

  });

  readStream.on(`end`, () => {
    console.log(`veri okuması bitti`);
  });
});
