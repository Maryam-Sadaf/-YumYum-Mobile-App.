// import { makeObservable, observable, action } from 'mobx';

// class HomeStore {
//   user = {
//     name: 'yum yum',
//   };
  
//   specialDeals = [
//     {
//       id: 1,
//       title: 'Yum yum Special Burger',
//       price: 800,
//       image: 'https://example.com/burger.png',
//     },
//     {
//       id: 2,
//       title: 'Food delivery',
//       description: 'Order food you love',
//       image: 'https://example.com/delivery.png',
//     },
//     {
//       id: 3,
//       title: 'Become a partner',
//       description: 'get 10 free delivery',
//       image: 'https://example.com/partner.png',
//     },
//   ];

//   constructor() {
//     makeObservable(this, {
//       user: observable,
//       specialDeals: observable,
//       addToCart: action,
//     });
//   }

//   addToCart(deal) {
//     // Add logic to handle cart functionality
//     console.log(`Added ${deal.title} to cart`);
//   }
// }
// const store = new HomeStore();
// export default store;
