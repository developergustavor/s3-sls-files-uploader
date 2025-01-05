// functions
export function extractBoundary(contentType: string): string {
  const matches = contentType.match(/boundary=(?:"([^"]+)"|([^;]+))/i);
  if (!matches) {
    throw new Error("No boundary found in content-type header");
  }
  return matches[1] || matches[2];
}

export function createBoundaryBuffers(boundary: string) {
  return {
    start: Buffer.from(`--${boundary}\r\n`),
    delimiter: Buffer.from(`\r\n--${boundary}\r\n`),
    end: Buffer.from(`\r\n--${boundary}--`),
  };
}
