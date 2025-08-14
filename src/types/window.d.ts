// Cookie Store API types
interface CookieStoreGetOptions {
  name?: string;
  url?: string;
}

interface CookieInit {
  name: string;
  value: string;
  expires?: number;
  domain?: string;
  path?: string;
  sameSite?: 'strict' | 'lax' | 'none';
  secure?: boolean;
}

interface CookieListItem {
  name: string;
  value: string;
  domain?: string;
  path?: string;
  expires?: number;
  secure?: boolean;
  sameSite?: 'strict' | 'lax' | 'none';
}

interface CookieStore extends EventTarget {
  get(name?: string): Promise<CookieListItem | null>;
  get(options?: CookieStoreGetOptions): Promise<CookieListItem | null>;
  getAll(name?: string): Promise<CookieListItem[]>;
  getAll(options?: CookieStoreGetOptions): Promise<CookieListItem[]>;
  set(name: string, value: string): Promise<void>;
  set(options: CookieInit): Promise<void>;
  delete(name: string): Promise<void>;
  delete(options: CookieInit): Promise<void>;
}

interface CookieChangeEvent extends Event {
  changed: CookieListItem[];
  deleted: CookieListItem[];
}

// Extend the Window interface
declare global {
  interface Window {
    cookieStore?: CookieStore;
  }
}

export {};