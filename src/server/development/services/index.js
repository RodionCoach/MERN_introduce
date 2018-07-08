import {Duplex} from 'stream';

export const streamToBuffer = (stream) => {
    return new Promise((resolve, reject) => {
        let buffers = [];
        stream.on('error', reject);
        stream.on('data', (data) => buffers.push(data));
        stream.on('end', () => resolve(Buffer.concat(buffers)));
    });
};

export const bufferToStream = (buffer) => {
    let stream = new Duplex();
    stream.push(buffer);
    stream.push(null);
    return stream;
};
