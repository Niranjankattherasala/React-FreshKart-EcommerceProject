// src/store.js
import { configureStore, createSlice } from "@reduxjs/toolkit";
import Chocolate from "./Chocolate";

//localStorage functions to get the data from local storage and save the data to the local storage


//food slice

// store.subscribe(() => {
//   localStorage.setItem("cart", JSON.stringify(store.getState().cart));
// });
// const data =JSON.parse(localStorage.getItem("cart" ));



const foodSlice = createSlice({
  name: "food",
  initialState: {
    veg: [
      {
        productId: 1001,
        productName: "Tomato",
        productPrice: 30,
        productImage: "/images/tomato.jpg",
       
        discount: "10% OFF",
      },
      {
        productId: 1002,
        productName: "Ladyfinger ",
        productPrice: 50,
        productImage: "/images/ladyfinder.jpg",
      
        discount: "5% OFF",
      },
      {
        productId: 1003,
        productName: "Brinjal ",
        productPrice: 40,
        productImage: "/images/brinjal.jpg",
       
        discount: "15% OFF",
      },
      {
        productId: 1004,
        productName: "broccoli",
        productPrice: 40,
        productImage:"/images/broccoli.jpg",
        discount: "15% OFF"

      },
      {
        productId: 1005,
        productName: "bittergourd",
        productPrice: 40,
        productImage:"/images/bittergourd.jpg",
        discount: "15% OFF"

      },
      {
        productId: 1006,
        productName: "cabage",
        productPrice: 30,
        productImage:"/images/cabagenew.jpg",
        discount: "10% OFF"

      },
      {
        productId: 1007,
        productName: "capsicum",
        productPrice: 40,
        productImage:"/images/capsicum.jpg",
        discount: "15% OFF"

      },
      {
        productId: 1008,
        productName: "carat",
        productPrice: 40,
        productImage:"/images/carrot.jpg",
        discount: "15% OFF"

      },
      {
        productId: 1009,
        productName: "potato",
        productPrice: 40,
        productImage:"/images/potato.jpg",
        discount: "15% OFF"

      },
       {
        productId: 1010,
        productName: "onion",
        productPrice: 60,
        productImage:"/images/onion.jpg",
        discount: "15% OFF"

      },
       {
        productId: 1011,
        productName: "peas",
        productPrice: 90,
        productImage:"/images/peas.jpg",
        discount: "1% OFF"

      },
       {
        productId: 1012,
        productName: "pumkin.jpg",
        productPrice: 40,
        productImage:"/images/pumkin.jpg",
        discount: "15% OFF"

      },
       {
        productId: 1013,
        productName: "radish",
        productPrice: 80,
        productImage:"/images/radishnew.jpg",
        discount: "5% OFF"

      },
       {
        productId: 1014,
        productName: "lettuce",
        productPrice: 90,
        productImage:"/images/lettucenew.jpg",
        discount: "40% OFF"

      },
       {
        productId: 1015,
        productName: "redcabage",
        productPrice: 40,
        productImage:"/images/redcabage.jpg",
        discount: "15% OFF"

      },
       {
        productId: 1016,
        productName: "spinach",
        productPrice: 40,
        productImage:"/images/spinachnew.jpg",
        discount: "15% OFF"

      },
    ],

    nonveg: [
      {
        productId: 2001,
        productName: "Chicken",
        productPrice: 220,
        productImage:"/images/chickencurry.jpg",
        discount: "10% OFF",
      },
      {
        productId: 2002,
        productName: "Fish",
        productPrice: 180,
        productImage:"/images/fishcurrynew.jpg",
        discount: "12% OFF",
      },
      {
        productId: 2003,
        productName: "egg omlete",
        productPrice: 100,
        productImage:"/images/eggomlete.jpg.png",
        discount: "8% OFF",
      },
      {
        productId: 2004,
        productName: "prawns",
        productPrice: 200,
        productImage:"/images/prawnsnew.jpg",
        discount: "8% OFF",
      },
      {
        productId: 2005,
        productName: "crabcakes",
        productPrice: 200,
        productImage:"/images/crabcakes.jpg",
        discount: "8% OFF",
      },
      {
        productId: 2006,
        productName: "goanfish",
        productPrice: 200,
        productImage:"/images/goanfish.jpg",
        discount: "8% OFF",
      },
      {
        productId: 2007,
        productName: "prawns",
        productPrice: 200,
        productImage:"/images/prawnsnew.jpg",
        discount: "8% OFF",
      },
      {
        productId: 2008,
        productName: "mutton",
        productPrice: 200,
        productImage:"/images/mutton.jpg",
        discount: "8% OFF",
      },
    ],

    Drinks: [
      {
        productId: 2009,
        productName: "7up",
        productPrice: 40,
        productImage:"/images/7up.jpg",
        discount: "15% OFF"


      },
      {
        productId: 2010,
        productName: "appyfizz",
        productPrice: 40,
        productImage:"/images/appyfizz.jpg",
        discount: "15% OFF"


      },
      {
        productId: 2011,
        productName: "coco-cola",
        productPrice: 40,
        productImage:"/images/coco-cola.jpg",
        discount: "15% OFF"


      },
      {
        productId: 2012,
        productName: "fanta",
        productPrice: 40,
        productImage:"/images/fanta.jpg",
        discount: "15% OFF"


      },
      {
        productId: 2013,
        productName: "campa",
        productPrice: 40,
        productImage:"/images/campa.jpg",
        discount: "15% OFF"


      },
      {
        productId: 2014,
        productName: "limca",
        productPrice: 40,
        productImage:"/images/limca.jpg",
        discount: "15% OFF"


      },
      {
        productId: 2015,
        productName: "maaza",
        productPrice: 60,
        productImage:"/images/maaza.jpg",
        discount: "15% OFF"


      },
      {
        productId: 2016,
        productName: "pulpiorange",
        productPrice: 80,
        productImage:"/images/pulpiorange.jpg",
        discount: "15% OFF"


      },
      {
        productId: 2017,
        productName: "redbull",
        productPrice: 100,
        productImage:"/images/redbull.jpg",
        discount: "15% OFF"


      },
      {
        productId: 2018,
        productName: "sprite",
        productPrice: 90,
        productImage:"/images/spritetin.jpg",
        discount: "15% OFF"


      },
      {
        productId: 2019,
        productName: "mountaindew",
        productPrice: 40,
        productImage:"/images/mountaindew.jpg",
        discount: "15% OFF"


      },
      {
        productId: 2020,
        productName: "pepsi",
        productPrice: 40,
        productImage:"/images/pepsi.jpg",
        discount: "15% OFF"


      },
      
  ],
     chocolate : [
           {
        productId: 2021,
        productName: "5star",
        productPrice: 200,
        productImage:"/images/5star.jpg",
        discount: "18% OFF",
      },
       {
        productId: 2022,
        productName: "kinderjoy",
        productPrice: 200,
        productImage:"/images/kinderjoynew.jpg",
        discount: "10% OFF",
      },
      {
        productId: 2023,
        productName: "kitkat",
        productPrice: 200,
        productImage:"/images/kitkat.jpg",
        discount: "10% OFF",
      },
      {
        productId: 2024,
        productName: "munch",
        productPrice: 120,
        productImage:"/images/munch.jpg",
        discount: "10% OFF",
      },
      {
        productId: 2025,
        productName: "mars",
        productPrice: 100,
        productImage:"/images/mars.jpg",
        discount: "10% OFF",
      },
      {
        productId: 2026,
        productName: "bar one",
        productPrice: 200,
        productImage:"/images/bar one.jpg",
        discount: "10% OFF",
      },
      {
        productId: 2027,
        productName: "bournville",
        productPrice: 50,
        productImage:"/images/bournville.jpg",
        discount: "10% OFF",
      },
      {
        productId: 2028,
        productName: "perk",
        productPrice: 60,
        productImage:"/images/perk.jpg",
        discount: "10% OFF",
      },
      {
        productId: 2029,
        productName: "cadburydairymilk",
        productPrice: 200,
        productImage:"/images/cadburydairymilk.jpg",
        discount: "10% OFF",
      },
      {
        productId: 2030,
        productName: "reeses",
        productPrice: 200,
        productImage:"/images/reeses.jpg",
        discount: "10% OFF",
      },
      {
        productId: 2031,
        productName: "twix",
        productPrice: 200,
        productImage:"/images/twix.jpg",
        discount: "10% OFF",
      },
      {
        productId: 2032,
        productName: "hersheys",
        productPrice: 200,
        productImage:"/images/hershey's.jpg",
        discount: "10% OFF",
      },
      ]
  

  },
  reducers: {}, // no reducers
});

let data = JSON.parse(localStorage.getItem("cart")) || [];

let cartSlice = createSlice({
  name: "cartSlice",
  initialState: data,
  reducers:{
    addToCart: (state , action) => {
      const item = state.find(i => i.productId === action.payload.productId);
      if(item) item.quantity += 1;
      else state.push({...action.payload, quantity: 1});
      
    },
    removeFromCart: (state, action) => {
      const index = state.findIndex(item => item.productId === action.payload.productId);
      if(index !== -1) {
        state.splice(index, 1);
      }
     
    },
    increaseQuantity: (state, action) => {
      const item = state.find(item => item.productId === action.payload.productId);
      if(item) {
        item.quantity += 1;
      }
    },
    decreaseQuantity: (state, action) => {
      const itemIndex = state.findIndex(item => item.productId === action.payload.productId);
      if(itemIndex !== -1){
        if(state[itemIndex].quantity > 1) {
          state[itemIndex].quantity -= 1;
        } else {
          state.splice(itemIndex, 1);
        }
      }
      
    },

    clearCart : () => {
        localStorage.removeItem("cart");
      return [];//reseting the cart into initial state;

    }

    
  }
});

//orders slice
let ordersSlice = createSlice({
  name : "orders",
  initialState : [],
  reducers: {
    addOrders:(state , action) => {
          state.push(action.payload)
    }
  }
})

let registerSlice = createSlice({
  name:"registerUser",
  initialState:{users:[],currentUser:null,isAuthenticated:false},
  reducers:{
    register:(state,action) =>{
      state.users.push(action.payload);
      
    },

    loginUser:(state,action) =>{
        const {username,password} = action.payload;
        let user = state.users.find((user)=> (user.username === username && user.password === password));
        if(user){ 
          state.currentUser = user.name;
          state.isAuthenticated = true ;
        }else{
          state.currentUser = null;
          state.isAuthenticated = false ;
        }
    },
    logoutUser:(state)=>{
      state.isAuthenticated = false;
      state.currentUser = null;
    } 

  }
})

const store = configureStore({
  reducer: {
    food: foodSlice.reducer,
    cart: cartSlice.reducer,
    orders : ordersSlice.reducer,
    registerUser: registerSlice.reducer,
  },
});

store.subscribe(() => {
  localStorage.setItem("cart", JSON.stringify(store.getState().cart));
});






export let { addToCart, removeFromCart, increaseQuantity, decreaseQuantity ,clearCart} = cartSlice.actions;
export let { addOrders } = ordersSlice.actions;
export const { register,loginUser,logoutUser } = registerSlice.actions;


export default store;


