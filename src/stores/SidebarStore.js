import { makeObservable, observable, action } from 'mobx';

class SidebarStore {
  isSidebarVisible = false;

  constructor() {
    makeObservable(this, {
      isSidebarVisible: observable,
      toggleSidebar: action
    });
  }

  toggleSidebar() {
    this.isSidebarVisible = !this.isSidebarVisible;
  }
}

const sidebarStore = new SidebarStore();
export default sidebarStore;
