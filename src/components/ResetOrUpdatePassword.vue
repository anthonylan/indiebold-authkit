<template>
    <div>
      <!-- Update Password Form -->
      <form @submit.prevent="setNewPassword" v-if="isPasswordRecovery">
        <div :style="styleSheet.wrapper">
          <label v-if="config?.showInputLabel || true" for="newPassword">New password</label>
          <input :class="classNames?.input" type="password" v-model="form.newPassword" required />
        </div>
        <div :style="styleSheet.wrapper">
          <label v-if="config?.showInputLabel || true" for="newConfirm">Confirm password</label>
          <input :class="classNames?.input" type="password" v-model="form.confirmPassword" required />
        </div>
        <div :style="styleSheet.wrapper"> 
          <button :class="[classNames?.btnPrimary, loading ? classNames?.btnLoading : '']" type="submit" :style="styleSheet.btn">Update password</button>
        </div>
      </form>
      <!-- Reset Password Form -->
     <form @submit.prevent="requestPasswordResetLink" v-else>
        <div :style="styleSheet.wrapper">
          <label v-if="config?.showInputLabel || true" for="email">Email address</label>
          <input :class="classNames?.input" type="email" v-model="form.email" required />
        </div>
        <div :style="styleSheet.wrapper"> 
          <button :class="[classNames?.btnPrimary, loading ? classNames?.btnLoading : '']" type="submit" :style="styleSheet.btn">Reset password</button>
        </div>
      </form>
    </div>
  </template>
  
  <script setup lang="ts">
  import { getCurrentInstance, reactive, ref, onMounted } from 'vue';
  import type { classNames } from './types';
  
  const emit = defineEmits(['success', 'error']);
  const instance = getCurrentInstance() as any;
  const $indiebold = instance?.proxy?.$supabase;
  
  const loading = ref(false);
  const isPasswordRecovery = ref(false);
  const styleSheet = ref({ wrapper: { marginTop: '20px' }, btn: { width: '100%', marginTop: '10px' } });
  const form = reactive({ email: '', newPassword: '', confirmPassword: '' });
  
  const props = defineProps<{ 
    classNames?: classNames; 
    config: { updatePasswordUrl: string; showInputLabel?: boolean } 
  }>();
  
  class Auth {
    static async handleReset(email: string) {
      const { data, error } = await $indiebold.auth.resetPasswordForEmail(email, { redirectTo: props.config.updatePasswordUrl });
      return error ? { error: error.message } : { error: null, data };
    }
  
    static async handlePassword(password: string) {
      const { data, error } = await $indiebold.auth.updateUser({ password });
      return error ? { error: error.message } : { error: null, data };
    }
  }
  
  const requestPasswordResetLink = async () => {
    const { data, error } = await Auth.handleReset(form.email);
    if (error) return emit('error', error);
    emit('success', data);
  };
  
  const setNewPassword = async () => {
    if (form.newPassword !== form.confirmPassword) return emit('error', "Passwords don't match");
    const { data, error } = await Auth.handlePassword(form.newPassword);
    
    if (error) return emit('error', error);
    emit('success', data);
    isPasswordRecovery.value = false;
  };
  
  onMounted(() => {
    $indiebold.auth.onAuthStateChange((event: string) => {
      if (event === "PASSWORD_RECOVERY") isPasswordRecovery.value = true;
    });
  });
  </script>
  