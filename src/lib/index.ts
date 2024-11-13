import type { App } from 'vue'
import * as components from '@/components'
import supabasePlugin from '../plugins/supabase'; // Import Supabase plugin

export * from '@/components'
export * from '@/components/types'

export default {
  install: (app: App, options: { supabase: { url: string; key: string } }) => {
      // Install Supabase plugin
    app.use(supabasePlugin, options.supabase);
    Object.entries(components).forEach(([name, component]) => {
      app.component(`Custom${name}`, component)
    })
  }
}