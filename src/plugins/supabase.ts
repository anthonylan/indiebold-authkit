// src/plugins/supabase.ts
import type { App } from 'vue';
import { createClient } from '@supabase/supabase-js';

export interface SupabaseOptions {
  url: string;
  key: string;
}

export default {
  install(app: App, options: SupabaseOptions) {
    const supabase = createClient(options.url, options.key);

    // Add Supabase client to global properties
    app.config.globalProperties.$supabase = supabase;
  },
};
