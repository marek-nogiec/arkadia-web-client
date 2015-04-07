'use strict';

function negotiate(telnetSocket, chunk) {
  // info: http://tools.ietf.org/html/rfc1143#section-7
  // refuse to start performing and ack the start of performance
  // DO -> WONT; WILL -> DO

  var packetLength = chunk.length, negData = chunk, cmdData, negResp;

  for (var i = 0; i < packetLength; i+=3) {
    if (chunk[i] != 255) {
      negData = chunk.slice(0, i);
      cmdData = chunk.slice(i);
      break;
    }
  }

  negResp = negData
    .toString('hex')
    .replace(/fd/g, 'fc')
    .replace(/fb/g, 'fd');

  if (telnetSocket.writable)
    telnetSocket.write(Buffer(negResp, 'hex'));
}

module.exports = {
  negotiate: negotiate
};