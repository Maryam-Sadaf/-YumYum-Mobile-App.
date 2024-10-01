import { action, makeObservable, observable, runInAction } from 'mobx';
import { SC } from '../services/serverCall';

class RestaurantDetailStore {
  restaurant = null;
  menuItems = [];
  isLoading = false;
  error = null;
 
  constructor() {
    makeObservable(this, {
      restaurant: observable,
      menuItems: observable,
      isLoading: observable,
      error: observable,
      fetchRestaurantDetail: action,
      fetchMenuItems: action,
      setRestaurant: action,
      setMenuItems: action,
      setIsLoading: action,
      setError: action,
    });
  }

  fetchRestaurantDetail = async (id) => {
    this.setIsLoading(true);
    try {
      const url = `/dishes/${id}`;
      console.log('Fetching restaurant detail from URL:', url);
      const response = await SC.getCall(url);
      console.log('--->> Response:', response); // Log the entire response for detailed inspection
      runInAction(() => {
        if (response.data && response.data.data) {
          console.log('--->> Fetched data:', response.data.data);
          this.setRestaurant(response.data.data.restaurant);
          this.setMenuItems(response.data.data.menuItems);
          this.setError(null);
        } else {
          console.log('No data found');
          this.setError('No data found'); // Handle case where response data is empty
        }
      });
    } catch (error) {
      console.error('Error fetching restaurant detail:', error);
      console.error('Full error details:', error.response?.data); // Log the full error response if available
      runInAction(() => {
        this.setError('Error fetching data'); // Set an error message
      });
    } finally {
      this.setIsLoading(false);
    }
  };

  fetchMenuItems = async (id, menuType) => {
    this.setIsLoading(true);
    try {
      const url = `/dishes/${id}?menu=${menuType}`;
      console.log('Fetching menu items from URL:', url);
      const response = await SC.getCall(url);
      console.log('--->> Response:', response); // Log the entire response for detailed inspection
      runInAction(() => {
        if (response.data && response.data.data) {
          console.log('--->> Fetched menu items:', response.data.data);
          this.setMenuItems(response.data.data);
          this.setError(null);
        } else {
          console.log('No data found');
          this.setError('No data found'); // Handle case where response data is empty
        }
      });
    } catch (error) {
      console.error('Error fetching menu items:', error);
      console.error('Full error details:', error.response?.data); // Log the full error response if available
      runInAction(() => {
        this.setError('Error fetching data'); // Set an error message
      });
    } finally {
      this.setIsLoading(false);
    }
  };

  setRestaurant = (restaurantData) => {
    // console.log('Setting restaurant data:', restaurantData);
    this.restaurant = restaurantData;
  };

  setMenuItems = (menuItemsData) => {
    // console.log('Setting menu items data:', menuItemsData);
    this.menuItems = menuItemsData;
  };

  setIsLoading = (loading) => {
    this.isLoading = loading;
  };

  setError = (errorMessage) => {
    this.error = errorMessage;
  };

  getItems = () => {
    return this.menuItems.filter(item => !item.name.startsWith('Deal'));
  };

  getDeals = () => {
    return this.menuItems.filter(item => item.name.startsWith('Deal'));
  };
}

const restaurantDetailStore = new RestaurantDetailStore();
export default restaurantDetailStore;
