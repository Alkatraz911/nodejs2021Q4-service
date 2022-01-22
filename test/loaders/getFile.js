import fs from 'fs'
import path, { dirname } from 'path';

 const getFile = async (filename) => {
    console.log(path.dirname(filename))
    const fileStream = fs.createReadStream(`${path.dirname(filename)}/json/${filename}`);
    fileStream.on('data', (data) => {
       console.log( JSON.parse(data))
    });

};

export { getFile }