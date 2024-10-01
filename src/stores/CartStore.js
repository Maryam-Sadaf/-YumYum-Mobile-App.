import { makeObservable, observable, action, runInAction } from 'mobx';
import { SC } from '../services/serverCall';

class CartStore {
  cartItems = [];
  cartTotal = 0;

  constructor() {
    makeObservable(this, {
      cartItems: observable,
      cartTotal: observable,
      addItem: action,
      removeItem: action,
      fetchCart: action,
      incrementItem: action,
      decrementItem: action,
    });
  }

  async fetchCart() {
    try {
      const response = await SC.getCall('/carts');
      if (response.status === 200) {
        runInAction(() => {
          this.cartItems = response.data.data;
          this.cartTotal = this.cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
        });
      } else {
        console.error(`Error fetching cart: ${response.status} - ${response.statusText}`);
      }
    } catch (error) {
      console.error('Error fetching cart:', error.message);
    }
  }

 async addItem(item, quantity) {
  try {
    const requestBody = {
      itemId: item.id,
      quantity,
    };
    console.log('Request body:', requestBody); // Log the request body
    const response = await SC.postCall('/carts', requestBody);
    if (response.status === 200) {
      runInAction(() => {
        const existingItem = this.cartItems.find(cartItem => cartItem.id === item.id);
        if (existingItem) {
          existingItem.quantity += quantity;
        } else {
          this.cartItems.push({ ...item, quantity });
        }
        this.cartTotal += item.price * quantity;
      });
    } else {
      console.error(`Error adding item to cart: ${response.status} - ${response.statusText}`);
    }
  } catch (error) {
    console.error('Error adding item to cart:', error.message);
  }
}


  async removeItem(id) {
    try {
      const response = await SC.deleteCall(`/carts/${id}`);
      if (response.status === 200) {
        runInAction(() => {
          this.cartItems = this.cartItems.filter(item => item.id !== id);
          this.cartTotal = this.cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
        });
      } else {
        console.error(`Error removing item from cart: ${response.status} - ${response.statusText}`);
      }
    } catch (error) {
      console.error('Error removing item from cart:', error.message);
    }
  }

  incrementItem(id) {
    const item = this.cartItems.find(item => item.id === id);
    if (item) {
      item.quantity += 1;
      this.cartTotal += item.price;
    }
  }

  decrementItem(id) {
    const item = this.cartItems.find(item => item.id === id);
    if (item && item.quantity > 1) {
      item.quantity -= 1;
      this.cartTotal -= item.price;
    }
  }
}

const cartStore = new CartStore();
export default cartStore;
