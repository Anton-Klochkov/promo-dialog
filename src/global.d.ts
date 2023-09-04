declare module '*.module.scss';

declare global {
  interface FormData {
    entries(): Iterator<[USVString, USVString | Blob]>;
  }
}
