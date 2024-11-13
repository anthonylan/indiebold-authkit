<template>
       <div>
        <!-- Social Login -->
         <div :style="{ display: 'flex', gap: '12px', alignItems: 'center', flexDirection: socials?.fluid ? 'column' : 'row' }">
           <button v-for="provider in socials?.providers" 
             @click="submit(provider)" 
             :class="[socials?.btnClass, loading ? classNames?.btnLoading : '']" 
             :style="styleSheet.btn">
             <span class="icon">
               <i class="fab" :class="`fa-${provider}`"></i>
             </span>
             <span v-if="socials?.showLabel">{{ provider }}</span>
           </button>
        </div>
   
       <!-- Seperator -->
       <div v-if="socials?.providers?.length" :style="styleSheet.hrContainer">
         <span :style="styleSheet.hr"></span>
         <span>Or sign {{ isLogin ? 'in' : 'up' }} in with</span>
         <span :style="styleSheet.hr"></span>
       </div>
   
       <!-- Form -->
       <form @submit.prevent="submit('email')">
         <div :style="styleSheet.wrapper">
           <label v-if="config?.showInputLabel || true" for="email">Email address</label>
           <input :class="classNames?.input" type="email" v-model="form.email" required />
         </div>
   
         <div :style="styleSheet.wrapper">
           <label v-if="config?.showInputLabel || true" for="password">Password</label>
           <slot name="password" :model="form.password" :updated="($event: any) => form.password = $event.target.value">
             <input :class="classNames?.input" type="password" v-model="form.password" required />
           </slot>
         </div>
   
         <div :style="styleSheet.wrapper" v-if="!isLogin">
           <label v-if="config?.showInputLabel || true" for="fullname">Full name</label>
           <input :class="classNames?.input" type="text" v-model="form.name" required />
         </div>
         
         <div :style="styleSheet.wrapper">
           <button :class="[classNames?.btnPrimary, loading ? classNames?.btnLoading : '']" type="submit" :style="styleSheet.btn">Sign {{ isLogin ? 'In' : 'Up' }}</button>
         </div>
        </form>
       </div>
   
   
   </template>
   
  
<script setup lang="ts">
import { getCurrentInstance, reactive, ref, computed } from 'vue'
import type { Socials, classNames } from './types'

const props = defineProps<{
  socials?: Socials,
  classNames?: classNames,
  config?: { showInputLabel: boolean, ui: string }
}>()

const emit = defineEmits(['success', 'error'])
const instance = getCurrentInstance() as any
const $indiebold = instance?.proxy?.$supabase 
const loading = ref(false)
const isLogin = computed(() => props.config?.ui?.toLocaleLowerCase() == 'login')  

   
const styleSheet = ref({
  hr: { flex: '1', height: '1px', background: '#e7e7e7' },
  hrContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '10px',
    padding: '20px 0',
    marginTop: '10px'
  },
  wrapper: { marginTop: '20px' },
  btn: { width: '100%', marginTop: '10px' },
})


interface Form { email: string, password: string, name?: string }
const form = reactive<Form>({ email: '', password: '', name: '' }) 


class Auth {
    static async handleOAuth(provider: string) {
      const { data, error } = await $indiebold.auth.signInWithOAuth({ provider, options: { redirectTo: props?.socials?.callbackUrl } });
      return error ? { error: error.message } : { error: null, data };
    }

    static async handleEmailAuth(form: Form) {
      const signInOrSignUp = isLogin.value
            ? $indiebold.auth.signInWithPassword({
                email: form.email,
                password: form.password,
            })
            : $indiebold.auth.signUp({
                email: form.email,
                password: form.password,
                options: {
                    data: { display_name: form.name }
                },
            });

        const { data, error } = await signInOrSignUp;
        return error ? { error: error.message } : { error: null, data };
    }
}
   
   
const submit = async (provider: any): Promise<void> => {
    loading.value = true;
    const response = provider === 'email' ? await Auth.handleEmailAuth(form) : await Auth.handleOAuth(provider);

    loading.value = false;
    response.error ? emit('error', response.error) : emit('success', response.data);
};
   
   
       
       
   
   </script>
   
   
   
   