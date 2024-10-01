import { makeObservable, observable, action, runInAction } from 'mobx';
import { SC } from '../services/serverCall'; // Assuming this is where your API service functions are defined

class SidebarStore {
  isSidebarVisible = false;
  user = {
    name: '',
    phone_number: '',
    address: '',
  };

  constructor() {
    makeObservable(this, {
      isSidebarVisible: observable,
      user: observable,
      toggleSidebar: action,
      fetchUserData: action,
      setUser: action,
    });
  }

  toggleSidebar() {
    this.isSidebarVisible = !this.isSidebarVisible;
  }

  async fetchUserData() {
    try {
      const response = await SC.getCall('/users'); // Adjust endpoint according to your API
      if (response.status === 200) {
        runInAction(() => {
          const userData = response.data.data; // Assuming this is structured as { id, name, phone_number, address }
          this.setUser(userData);
        });
      } else {
        console.error(`Error fetching user data: ${response.status} - ${response.statusText}`);
      }
    } catch (error) {
      console.error('Error fetching user data:', error.message);
    }
  }

  setUser(userData) {
    this.user = userData;
  }
}

const sidebarStore = new SidebarStore();
export default sidebarStore;
