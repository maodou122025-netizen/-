declare module '*.css';

declare namespace JSX {
  interface IntrinsicElements {
    [elementName: string]: any;
  }
}

declare module 'react' {
  export type FormEvent<T = Element> = {
    preventDefault(): void;
    currentTarget: T;
  };
  export type ChangeEvent<T = Element> = {
    target: T;
    currentTarget: T;
  };

  export const StrictMode: (props: { children?: any }) => any;
  export function useEffect(effect: () => void | (() => void), deps?: readonly unknown[]): void;
  export function useMemo<T>(factory: () => T, deps?: readonly unknown[]): T;
  export function useState<T>(initialState: T | (() => T)): [T, (value: T | ((previous: T) => T)) => void];
}

declare module 'react-dom/client' {
  export function createRoot(container: Element): { render(children: any): void };
}

declare module 'react/jsx-runtime' {
  export const jsx: any;
  export const jsxs: any;
  export const Fragment: any;
}
