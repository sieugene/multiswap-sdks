export interface AppWindow extends Window {
  Buffer: Buffer;
}

(window as any).process = window.process || require('process');
(window as any).Buffer = (window as any).Buffer || require('buffer').Buffer;
