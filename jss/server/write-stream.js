const fs = require(`fs`);
const file = `videos/video.mp4`;

const readStream = fs.createReadStream(file);
const writeStream = fs.createWriteStream(`videos/new.mp4`)

fs.stat(file, (err, data) => {
  const total = data.size;

  let progres = 0;
  let percent = 0

  readStream.on(`data`, chunk => {
    console.log(`%${Math.round(percent)}`)

    progres += chunk.length;
    percent = progres*100/total

  });

  readStream.pipe(writeStream)

  writeStream.on(`finish` , (err,data) => {
    console.log(`new.mp4 oluşturuldu.`);
  })


  readStream.on(`end`, () => {
    console.log(`veri okuması bitti`);
  });
});