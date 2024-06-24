import { makeObservable, observable, action } from 'mobx';
import { SC } from '../services/serverCall'; // Adjust import as per your file structure
import AsyncStorage from '@react-native-async-storage/async-storage';

class SigninStore {
  formData = {
    phone_number: '',
    password: '', // Added password field
  };
  errors = {
    phone_number: '',
    password: '',
    general: '',
  };

  constructor() {
    makeObservable(this, {
      formData: observable,
      errors: observable,
      setFormData: action,
      clearFormData: action,
      setError: action,
      validateForm: action,
      signInUser: action,
    });
  }

  setFormData(field, value) {
    this.formData[field] = value;
  }

  clearFormData() {
    this.formData = {
      phone_number: '',
      password: '',
    };
    this.errors = {
      phone_number: '',
      password: '',
      general: '',
    };
  }

  setError(field, error) {
    this.errors[field] = error;
  }

  validateForm() {
    const errors = {};

    if (!this.formData.phone_number) {
      errors.phone_number = 'Phone number is required';
    }

    if (!this.formData.password) {
      errors.password = 'Password is required';
    }

    this.errors = errors;
    return Object.keys(errors).length === 0;
  }

  async signInUser() {
    if (this.validateForm()) {
      try {
        const result = await SC.postCall('/user_login', {
          phone_number: this.formData.phone_number,
          password: this.formData.password,
        });

        if (result.data && result.data.data && result.data.data.token){
          await AsyncStorage.setItem('token', JSON.stringify(result.data.data.token));
          return { success: true };
        } else {
          this.setError('general', result.data.message || 'Sign in failed');
          return { success: false };
        }
      } catch (error) {
        this.setError('general', 'Something went wrong. Please try again.');
        console.error('Error in signInUser:', error);
        return { success: false };
      }
    } else {
      this.setError('general', 'Please fix the errors and try again.');
      return { success: false };
    }
  }
}

const signinStore = new SigninStore();
export default signinStore;
