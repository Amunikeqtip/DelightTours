export {};

declare global {
  interface Window {
    paypal?: {
      Buttons: (config: {
        style?: Record<string, string>;
        onClick?: (data: unknown, actions: { resolve: () => void; reject: () => void }) => void | Promise<void>;
        createOrder: () => Promise<string>;
        onApprove: (data: { orderID: string }) => Promise<void>;
        onError?: (err: unknown) => void;
        onCancel?: () => void;
      }) => {
        render: (selector: string | HTMLElement) => Promise<void>;
        close?: () => Promise<void>;
      };
      HostedButtons: (config: { hostedButtonId: string }) => {
        render: (selector: string) => Promise<void> | void;
      };
    };
  }
}
