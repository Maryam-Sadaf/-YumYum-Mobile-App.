import { makeAutoObservable, runInAction } from 'mobx';
import { SC } from '../services/serverCall';

class HomeStore {
  restaurants = [];
  isLoading = false;

  constructor() {
    makeAutoObservable(this);
  }

  async fetchRestaurantsData() {
    this.setIsLoading(true);
    try {
      const response = await SC.getCall('/all_restaurants');
      runInAction(() => {
        // console.log('--->> fetched data:', response.data.data);
        this.setRestaurants(response.data.data);
      });
    } catch (error) {
      if (error.response && error.response.status === 401) {
        // console.error('Unauthorized: Please check your login credentials.');
      } else {
        // console.error('Error fetching restaurant data:', error.message);
      }
    } finally {
      this.setIsLoading(false);
    }
  }

  setRestaurants(restaurantData) {
    this.restaurants = restaurantData;
  }

  setIsLoading(loading) {
    this.isLoading = loading;
  }
}

const homestore = new HomeStore();
export default homestore;