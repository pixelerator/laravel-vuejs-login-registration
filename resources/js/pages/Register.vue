<script setup>
import { useForm } from 'vee-validate';
import * as yup from 'yup';
import Blank from './Blank.vue';
import { useUserStore } from '@/stores/UserStore';
import { useToast } from "vue-toastification";

const toast = useToast();


const userStore = useUserStore();
const { getUser, addUser } = userStore;
console.log(getUser);

// Validation schema
const { values, errors, handleSubmit, defineField } = useForm({
  validationSchema: yup.object({
    name: yup.string().required('Name is required'),
    email: yup.string().email('Please enter a valid email').required('Email is required'),
    password: yup
      .string()
      .min(6, 'Password must be at least 6 characters')
      .required('Password is required'),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref('password')], 'Passwords must match')
      .required('Confirm Password is required'),
    agreeToTerms: yup
      .boolean()
      .oneOf([true], 'You must agree to the terms and conditions'),
  }),
});

// Define the fields
const [name, nameAttrs] = defineField('name');
const [email, emailAttrs] = defineField('email');
const [password, passwordAttrs] = defineField('password');
const [confirmPassword, confirmPasswordAttrs] = defineField('confirmPassword');
const [agreeToTerms, agreeToTermsAttrs] = defineField('agreeToTerms');

// Handle form submission asynchronously
const onSubmit = handleSubmit(async (values) => {
  console.log('Form Submitted:', values);
  try {
    const userAction = await addUser(values);
    console.log('User added successfully:', userAction);
    if(userAction.status==400){
      toast.error(userAction.response.data.message, {});
      return;
    }
      toast.success("You have been registerd successfuly, pleae activate your account to continue", {});
   
  } catch (error) {
    console.error('Error adding user:', error);
  }
});
</script>

<template>
  <Blank>
    <div class="min-h-screen flex flex-col justify-between">
      <div class="mx-auto p-8 bg-white shadow-lg rounded-lg mt-8 mb-6">
        <h2 class="text-3xl font-semibold text-center text-gray-800 mb-8">Create Your Account</h2>

        <!-- Registration Form -->
        <form @submit.prevent="onSubmit" class="space-y-6">
          <!-- Name Field -->
          <div>
            <label for="name" class="block text-sm font-medium text-gray-700">Name</label>
            <input
              v-model="name"
              v-bind="nameAttrs"
              type="text"
              id="name"
              class="mt-2 block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            />
            <span class="text-red-500 text-sm">{{ errors.name }}</span>
          </div>

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

          <!-- Confirm Password Field -->
          <div>
            <label for="confirmPassword" class="block text-sm font-medium text-gray-700">Confirm Password</label>
            <input
              v-model="confirmPassword"
              v-bind="confirmPasswordAttrs"
              type="password"
              id="confirmPassword"
              class="mt-2 block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            />
            <span class="text-red-500 text-sm">{{ errors.confirmPassword }}</span>
          </div>

          <!-- Agree to Terms Field -->
          <div class="flex items-center">
            <input
              v-model="agreeToTerms"
              v-bind="agreeToTermsAttrs"
              type="checkbox"
              id="agreeToTerms"
              class="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
            />
            <label for="agreeToTerms" class="ml-2 block text-sm text-gray-900">
              I agree to the
              <a href="#" class="text-blue-600 hover:underline">terms and conditions</a>
            </label>
          </div>
          <span class="text-red-500 text-sm">{{ errors.agreeToTerms }}</span>

          <!-- Submit Button -->
          <button
            type="submit"
            class="w-full bg-blue-500 text-white py-3 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Register
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
