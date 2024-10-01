declare global {
  interface Window {
    electron: {
      ipcRenderer: {
        send: (channel: string, ...args: any[]) => void;
        on: (channel: string, func: (...args: any[]) => void) => void;
        invoke: (channel: string, ...args: any[]) => Promise<any>;
      };
      fileSystem: {
        readData: (fileName: string) => Promise<any>;
        writeData: (fileName: string, data: any) => Promise<boolean>;
      };
    };
  }
}

export {};
