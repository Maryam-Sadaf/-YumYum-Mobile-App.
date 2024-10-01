import { makeObservable, observable, action, runInAction } from 'mobx';
import { SC } from '../services/serverCall';

class ProfileStore {
  username = '';
  mobileNumber = '';
  address = '';
  isModalVisible = false;
  tempUsername = '';
  tempMobileNumber = '';
  tempAddress = '';
  isLoading = false;
  userId = '123'; // This should be dynamically fetched or set

  constructor() {
    makeObservable(this, {
      username: observable,
      mobileNumber: observable,
      address: observable,
      isModalVisible: observable,
      tempUsername: observable,
      tempMobileNumber: observable,
      tempAddress: observable,
      isLoading: observable,
      setUsername: action,
      setAddress: action,
      setMobileNumber: action,
      setModalVisible: action,
      setTempUsername: action,
      setTempMobileNumber: action,
      setTempAddress: action,
      setIsLoading: action,
      fetchUserData: action,
      updateUserData: action,
      handleSave: action,
      setEditFields: action,
    });
  }

  async fetchUserData() {
    this.setIsLoading(true);

    try {
      const response = await SC.getCall('/users');
      // console.log('--->>response', response);

      runInAction(() => {
        console.log('--->> fetched data:', response.data.data);
        const { id, name, phone_number, address } = response.data.data; // Assuming these are the correct fields from the response
        this.userId = id;
        this.setUsername(name);
        this.setAddress(address);
        this.setMobileNumber(phone_number);
      });
    } catch (error) {
      if (error.response && error.response.status === 401) {
        console.error('Unauthorized: Please check your login credentials.');
      } else {
        console.error('Error fetching user data:', error.message);
      }
    } finally {
      this.setIsLoading(false);
    }
  }
  async updateUserData() {
    this.setIsLoading(true);
    try {
      const data = {
        name: this.username,
        phone_number: this.mobileNumber,
        address: this.address,
      };
      const endpoint = `/users/${this.userId}`; // Ensure this is the correct endpoint with user ID
      await SC.putCall(endpoint, data); 
    } catch (error) {
      console.error('Error updating user data:', error.message, error.response);
    } finally {
      runInAction(() => {
        this.setIsLoading(false);
        this.setModalVisible(false);
      });
    }
  }
  setUsername(newUsername) {
    this.username = newUsername;
  }
  setMobileNumber(newMobileNumber) {
    this.mobileNumber = newMobileNumber;
  }
  setAddress(newAddress) {
    this.address = newAddress;
  }
  setModalVisible(visible) {
    this.isModalVisible = visible;
  }
  setIsLoading(loading) {
    this.isLoading = loading;
  }
  setTempUsername(value) {
    this.tempUsername = value;
  }
  setTempMobileNumber(value) {
    this.tempMobileNumber = value;
  }
  setTempAddress(value) {
    this.tempAddress = value;
  }
  setEditFields() {
    this.tempUsername = this.username;
    this.tempMobileNumber = this.mobileNumber;
    this.tempAddress = this.address;
    this.setModalVisible(true);
  }
  handleSave() {
    this.setUsername(this.tempUsername);
    this.setMobileNumber(this.tempMobileNumber);
    this.setAddress(this.tempAddress);
    this.updateUserData();
  }
}
const profileStore = new ProfileStore();
export default profileStore;
