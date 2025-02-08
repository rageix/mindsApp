export default async function streamToUint8Array(stream: NodeJS.ReadableStream) {
  const chunks = [];
  for await (const chunk of stream) {
    chunks.push(chunk);
  }
  // @ts-ignore
  return new Uint8Array(Buffer.concat(chunks));
}