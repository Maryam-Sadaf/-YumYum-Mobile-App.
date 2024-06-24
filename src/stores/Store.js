import { makeObservable, observable, action } from 'mobx';

class FormStore {
  formData = {
    name: '',
    phone_number: '',
    password: '',
    address: ''
  };

  errors = {
    name: '',
    phone_number: '',
    password: '',
    address: ''
  };

  constructor() {
    makeObservable(this, {
      formData: observable,
      errors: observable,
      setFormData: action,
      clearFormData: action,
      setError: action,
      validateForm: action
    });
  }

  setFormData(field, value) {
    this.formData[field] = value;
  }

  clearFormData() {
    this.formData = {
      name: '',
      phone_number: '',
      password: '',
      address: ''
    };
    this.errors = {
      name: '',
      phone_number: '',
      password: '',
      address: ''
    };
  }

  setError(field, error) {
    this.errors[field] = error;
  }

  validateForm() {
    let hasError = false;
    const { name, phone_number, password, address } = this.formData;

    if (!name) {
      this.setError('name', 'Please enter your name');
      hasError = true;
    } else {
      this.setError('name', '');
    }

    if (!/^\+92\d{10}$/.test(phone_number)) {
      this.setError('phone_number', 'Please enter a valid phone number starting with +92');
      hasError = true;
    } else {
      this.setError('phone_number', '');
    }

    const passwordErrors = [];
    if (password.length < 8) {
      passwordErrors.push('Password must be at least 8 characters long');
    }
    if (!/[A-Z]/.test(password)) {
      passwordErrors.push('Password must contain at least one uppercase letter');
    }
    if (!/[a-z]/.test(password)) {
      passwordErrors.push('Password must contain at least one lowercase letter');
    }
    if (!/\d/.test(password)) {
      passwordErrors.push('Password must contain at least one digit');
    }
    if (!/[!@#$%^&*]/.test(password)) {
      passwordErrors.push('Password must contain at least one special character');
    }
    if (passwordErrors.length > 0) {
      this.setError('password', passwordErrors.join('\n'));
      hasError = true;
    } else {
      this.setError('password', '');
    }

    if (!address) {
      this.setError('address', 'Please enter your address');
      hasError = true;
    } else {
      this.setError('address', '');
    }

    return !hasError;
  }
}

const formStore = new FormStore();
export default formStore;
