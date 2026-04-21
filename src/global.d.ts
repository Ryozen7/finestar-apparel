declare module '*.css' {
  const content: { [className: string]: string };
  export default content;
}

declare module 'util' {
  export class TextEncoder {
    encode(input?: string): Uint8Array;
  }
  export class TextDecoder {
    decode(input?: Uint8Array): string;
  }
}

// Jest and Node globals for test environment
declare var global: any;