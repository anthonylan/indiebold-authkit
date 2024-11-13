
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import supabasePlugin from './plugins/supabase' // Import Supabase client

const app = createApp(App)


app.use(supabasePlugin, {
    url: import.meta.env.VITE_SUPABASE_URL,
    key: import.meta.env.VITE_SUPABASE_ANON_KEY,
})

app.use(router)
app.mount('#app')
