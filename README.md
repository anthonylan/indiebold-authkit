
# IndieBold AuthKit Vue Component powered by Supabase

This component provides a social login and email authentication functionality. It allows users to authenticate using different social providers (e.g., Google, Facebook) or through email/password authentication. 

```sh
npm install @indiebold/authkit
```

## Table of Contents
1. [Props](#props)
2. [Events](#events)
3. [Styling](#styling)
4. [Usage](#usage)

---

## Props

### `socials` (optional)
An object that defines the social login settings.

- **`providers`** (array): A list of social login providers (e.g., `['google', 'facebook']`).
- **`callbackUrl`** (string): URL to redirect to after successful authentication.
- **`showLabel`** (boolean, optional): Determines if the provider name should be displayed alongside the icon (default: `false`).
- **`btnClass`** (string, optional): A custom CSS class for the login buttons.
- **`fluid`** (boolean, optional): If `true`, the buttons will stack vertically (default: `false`).

### `classNames` (optional)
An object to apply custom CSS classes to specific elements.

- **`btnPrimary`** (string, optional): A class for the primary submit button.
- **`btnLoading`** (string, optional): A class to apply when the component is loading.
- **`input`** (string, optional): A class for the input fields.

### `config` (optional)
An object to customize input labels and the UI type (either 'login' or 'signup').

- **`showInputLabel`** (boolean): Controls whether input labels are displayed (default: `true`).
- **`ui`** (string): The UI mode ('login' or 'signup').

---

## Events

- **`success`**: Emitted when the authentication is successful.
- **`error`**: Emitted when an error occurs during authentication.

---
## Styling

The component uses inline styles for layout and button design. You can override these styles by passing custom classes via the `classNames` prop.

---

## Usage

### Example
```vue
<template>
  <AuthFlow
    :socials="{
      providers: ['google', 'facebook'],
      callbackUrl: 'https://your-app.com/callback',
      showLabel: true,
      btnClass: 'custom-btn-class'
    }"
    :classNames="{
      btnPrimary: 'btn-primary',
      btnLoading: 'btn-loading',
      input: 'custom-input-class'
    }"
    :config="{
      showInputLabel: true,
      ui: 'login'
    }"
    @success="handleSuccess"
    @error="handleError"
  />
</template>

<script setup lang="ts">
import { AuthFlow } from '@indiebold/authkit';

const handleSuccess = (data: any) => {
  console.log('Login Successful:', data);
};

const handleError = (error: string) => {
  console.error('Error:', error);
};
</script>
```



# Password Recovery & Reset Component

This Vue component handles the user flow for password recovery and resetting. It includes two forms: one for resetting the password via email and another for updating the password once the user has received a reset link.

## Props

### `classNames`
An object to customize the CSS class names for various elements.
- **btnPrimary** *(optional)*: The class for the primary button.
- **btnLoading** *(optional)*: The class for the button in a loading state.
- **input** *(optional)*: The class for input fields.

### `config`
An object containing configuration options.
- **updatePasswordUrl**: The URL to which the user will be redirected to update their password.
- **showInputLabel** *(optional, default: `true`)*: Whether to display input labels.

## Usage

```vue
<template>
  <PasswordRecovery
    :classNames="{
      btnPrimary: 'btn-primary',
      btnLoading: 'btn-loading',
      input: 'custom-input-class'
    }"
    :config="{
      showInputLabel: true,
      updatePasswordUrl: '/set-new-password'
    }"
    @success="handleSuccess"
    @error="handleError"
  />
</template>

<script setup lang="ts">
import { PasswordRecovery } from '@indiebold/authkit';

const handleSuccess = (data: any) => {
  console.log('Login Successful:', data);
};

const handleError = (error: string) => {
  console.error('Error:', error);
};
</script>
```



