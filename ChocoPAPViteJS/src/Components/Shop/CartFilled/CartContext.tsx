import { prdList } from "Datas/prdList";
import { createContext, ReactNode, FC , useReducer} from "react";
import { Product } from "../Product/Product";

export const CartContext = createContext<any>({
      items:[],
      addItemToCart: () => {},
});

const cartReducer = (state:any, action:any) => {
    console.log(state);
    if (action.type === "ADD_PRODUCT_INTO_CART") {
        const updateCartItems  = [...state.item];
        const existingElementIndex = updateCartItems.findIndex(
            (cartItem) => cartItem.id === action.payload.productId
        );
        const existingElement = updateCartItems[existingElementIndex]

        if(existingElement){

        }else {
            const product = prdList.find(
                (product) => Product.id === action.payload.prodductid
            );

            if (product){
                updateCartItems.push({
                    id: product.id,
                    name : product.name,
                    quantity : 1,
                });
            };
        return items:updateCartItems
    };
    return state;
};

export type CartContextProviderProps = {
    children: ReactNode ;
}

export const CartContextProvider: FC<CartContextProviderProps> = ({ children }:any) => {
    
    const [cartState, cartDispatch] = useReducer (cartReducer, {
        items: [],
    }) ;

    const handleAddProductToCart = (productId:any) => {
        cartDispatch({
            type:'ADD_PRODUCT_INTO_CART',
            payload : {productId:productId},
        });
    };

    const initialValue = { 
        items : cartState.items,
        addItemToCart : handleAddProductToCart,
    };

    return (
        <CartContextProvider value={initialValue}>
            {children}
        </CartContextProvider>
    );
};


// src/context/CartContext.js

// import React, { createContext, useReducer } from 'react';

// const CartContext = createContext();

// const initialState = {
//   items: [],
// };

// const cartReducer = (state, action) => {
//   switch (action.type) {
//     case 'ADD_ITEM':
//       return {
//         ...state,
//         items: [...state.items, action.payload],
//       };
//     case 'REMOVE_ITEM':
//       return {
//         ...state,
//         items: state.items.filter(item => item.id !== action.payload.id),
//       };
//     default:
//       return state;
//   }
// };

// const CartProvider = ({ children }) => {
//   const [state, dispatch] = useReducer(cartReducer, initialState);

//   const addItem = item => {
//     dispatch({ type: 'ADD_ITEM', payload: item });
//   };

//   const removeItem = item => {
//     dispatch({ type: 'REMOVE_ITEM', payload: item });
//   };

//   return (
//     <CartContext.Provider value={{ items: state.items, addItem, removeItem }}>
//       {children}
//     </CartContext.Provider>
//   );
// };

// export { CartContext, CartProvider };