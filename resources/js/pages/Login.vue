<script setup>
import { useForm } from 'vee-validate';
import * as yup from 'yup';
import Blank from './Blank.vue';
import { useUserStore } from '@/stores/UserStore';
import { useToast } from "vue-toastification";
import { useRouter } from 'vue-router';
const router = useRouter();


const toast = useToast();

// Access the user store
const userStore = useUserStore();
const { loginUser } = userStore; // Assume loginUser action exists in your user store

// Validation schema for login
const { values, errors, handleSubmit, defineField } = useForm({
  validationSchema: yup.object({
    email: yup.string().email('Please enter a valid email').required('Email is required'),
    password: yup
      .string()
      .min(6, 'Password must be at least 6 characters')
      .required('Password is required'),
  }),
});

// Define the fields
const [email, emailAttrs] = defineField('email');
const [password, passwordAttrs] = defineField('password');

const onSubmit = handleSubmit(async (values) => {
  console.log('Login Form Submitted:', values);
  try {
    const loginAction = await loginUser(values); // Assuming loginUser is a store action
    console.log("loginuser", loginAction);
    
    // Check if the response status is 200 for success
    if (loginAction.status != 200) {
      toast.error(loginAction.data.message || 'Invalid login credentials', {});
      return;
    }
    
    toast.success("Login successful!", {});
    router.push("Home");
  } catch (error) {
    console.error('Error logging in:', error);
    toast.error('Failed to log in, please try again.', {});
  }
});

</script>

<template>
  <Blank>
    <div class="min-h-screen flex flex-col justify-between">
      <div class="mx-auto p-8 bg-white shadow-lg rounded-lg mt-8 mb-6">
        <h2 class="text-3xl font-semibold text-center text-gray-800 mb-8">Login to Your Account</h2>

        <!-- Login Form -->
        <form @submit.prevent="onSubmit" class="space-y-6">
          
          <!-- Email Field -->
          <div>
            <label for="email" class="block text-sm font-medium text-gray-700">Email</label>
            <input
              v-model="email"
              v-bind="emailAttrs"
              type="email"
              id="email"
              class="mt-2 block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            />
            <span class="text-red-500 text-sm">{{ errors.email }}</span>
          </div>

          <!-- Password Field -->
          <div>
            <label for="password" class="block text-sm font-medium text-gray-700">Password</label>
            <input
              v-model="password"
              v-bind="passwordAttrs"
              type="password"
              id="password"
              class="mt-2 block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            />
            <span class="text-red-500 text-sm">{{ errors.password }}</span>
          </div>

          <!-- Submit Button -->
          <button
            type="submit"
            class="w-full bg-blue-500 text-white py-3 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Login
          </button>
        </form>
      </div>

      <!-- Footer -->
      <footer class="mt-auto py-6 text-center bg-gray-100">
        <p class="text-gray-500">© 2024 Your Company. All rights reserved.</p>
      </footer>
    </div>
  </Blank>
</template>

<style scoped>
/* Optional custom styles */
</style>
