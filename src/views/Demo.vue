<template>

 
  <section>
    <h1>User auth without social connections</h1>
    <AuthFlow 
        @error="($e) => console.log($e, 'error')" 
        @success="($s) => console.log($s, 'success')" 
        :classNames="{ input: 'form-control', btnPrimary: 'btn btn-primary' }"
   />
  </section>

<hr>

  <section>
    <h1>User auth with social connections</h1>
    <AuthFlow 
        @error="($e) => console.log($e)" 
        @success="($s) => console.log($s)" 
        :classNames="{ input: 'form-control', btnPrimary: 'btn btn-primary mb-3' }"
        :socials="{ providers: ['google', 'twitter'], callbackUrl: 'http://myapp.com/oauth/auth', btnClass: 'btn btn-secondary', showLabel: true }"
   />
  </section>

<hr>
  <section>
    <h1>Password recovery</h1>
    <PasswordRecovery 
      :config="{ updatePasswordUrl: '/update-password' }" 
      :classNames="{ input: 'form-control mt-1', btnPrimary: 'btn btn-primary' }" 
      @error="($e) => console.log($e, 'error')" 
      @success="($s) => console.log($s, 'success')"
    />

  </section>

</template>

<script setup lang="ts">
import { AuthFlow, PasswordRecovery } from '@/components'

</script>


<style lang="scss">
@import url('https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css');


section{
  max-width: 500px;
  margin: 50px auto;

  h1{
    font-size: 1.4rem;
  }
}



</style>