import { makeObservable, observable, action, runInAction } from 'mobx';
import { SC } from "../services/serverCall"; // Ensure this is correctly set up

class ProfileStore {
    username = '';
    mobileNumber = '';
    isModalVisible = false;
    editField = '';
    tempValue = '';
    isLoading = false;

    constructor() {
        makeObservable(this, {
            username: observable,
            mobileNumber: observable,
            isModalVisible: observable,
            editField: observable,
            tempValue: observable,
            isLoading: observable,
            setUsername: action,
            setMobileNumber: action,
            setModalVisible: action,
            setEditField: action,
            setTempValue: action,
            setIsLoading: action,
            fetchUserData: action,
            updateUserData: action,
            handleSave: action,
        });
    }
    async fetchUserData() {
        this.setIsLoading(true);
        try {
          const response = await SC.getCall('/users');
          console.log("resoponse---->>",response)
          runInAction(() => {
            const { username, mobileNumber } = response.data.data;
            this.setUsername(username);
            this.setMobileNumber(mobileNumber);
          });
        } catch (error) {
          if (error.response && error.response.status === 401) {
            console.error('Unauthorized: Please check your login credentials.');
            // Optionally, redirect to login screen or clear user token
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
                username: this.username,
                mobileNumber: this.mobileNumber,
            };
            await SC.putCall('/users/:id', data); // Ensure you replace ':id' with the actual user ID
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

    setModalVisible(visible) {
        this.isModalVisible = visible;
    }

    setIsLoading(loading) {
        this.isLoading = loading;
    }

    setEditField(field) {
        this.editField = field;
        this.tempValue = field === 'username' ? this.username : this.mobileNumber;
        this.setModalVisible(true);
    }

    setTempValue(value) {
        this.tempValue = value;
    }

    handleSave() {
        if (this.editField === 'username') {
            this.setUsername(this.tempValue);
        } else {
            this.setMobileNumber(this.tempValue);
        }
        this.updateUserData();
    }
}

const profileStore = new ProfileStore();
export default profileStore;
