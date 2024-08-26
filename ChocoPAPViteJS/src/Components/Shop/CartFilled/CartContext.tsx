import { prdList } from "../../../Datas/prdList";
import { createContext, ReactNode, FC , useReducer} from "react";

export type AddItemToCart = (productId: number, quantity: number) => void;
export type RemoveItemFromCart = (productId: number) => void;

export type CartState = {
    items: { 
        id: number; 
        name: string; 
        price: number , 
        rating: number, 
        quantity: number,
        textAltImg: string,
        descriptionArticle: string,
        ingredientsArticle: string,
        urlImg: string,
        available : boolean,
    }[];
};

export type CartAction = {
    type: string;
    payload: { productId: number; quantity?: number };
};

export type CartContextProviderProps = {
    children: ReactNode 
};

export const CartContext = createContext<{
    items: { 
        id: number; 
        name: string; 
        price: number , 
        rating: number, 
        quantity: number,
        textAltImg: string,
        descriptionArticle: string,
        ingredientsArticle: string,
        urlImg: string,
        available : boolean,
    }[];
    addItemToCart: AddItemToCart;
    removeItemFromCart: RemoveItemFromCart;
  }>
  ({
      items:[],
      addItemToCart: () => {},
      removeItemFromCart: () => {},
});

const cartReducer = (state: CartState, action: CartAction): CartState  => {
      switch (action.type) {
        case 'ADD_PRODUCT_INTO_CART':
            const updatedCartItems = [...state.items];
            const existingElementIndex = updatedCartItems.findIndex(
                (cartItem) => cartItem.id === action.payload.productId
            );
            const existingElement = updatedCartItems[existingElementIndex];

            if (existingElement) {
                existingElement.quantity += action.payload.quantity!;
            } else {
                const product = prdList.find(
                    (product) => product.idArticle === action.payload.productId
                );

                if (product) {
                    updatedCartItems.push({
                        id: product.idArticle,
                        name: product.titleArticle,
                        price: product.priceArticle,
                        rating: product.ratingArticle,
                        quantity: action.payload.quantity!,
                        textAltImg: product.textAltImg,
                        descriptionArticle: product.descriptionArticle,
                        ingredientsArticle: product.ingredientsArticle,
                        urlImg: product.urlImg,
                        available: product.available,
                    });
                }
            }

            return { items: updatedCartItems };

        case 'REMOVE_PRODUCT_FROM_CART':
            return {
                ...state,
                items: state.items.filter(item => item.id !== action.payload.productId),
            };

        default:
            return state;
    }
};


export const CartContextProvider: FC<CartContextProviderProps> = ({ children }:any) => {
    
    const [cartState, cartDispatch] = useReducer (cartReducer, {
        items: [],
    }) ;

    const handleAddProductToCart = (productId: number, quantity: number) => {
        cartDispatch({
            type:'ADD_PRODUCT_INTO_CART',
            payload: { productId, quantity },
        });
    };

    const handleRemoveProductFromCart = (productId: number) => {
        cartDispatch({
            type: 'REMOVE_PRODUCT_FROM_CART',
            payload: { productId },
        });
    };

    const initialValue = { 
        items : cartState.items,
        addItemToCart : handleAddProductToCart,
        removeItemFromCart: handleRemoveProductFromCart,
    };

    return (
        <CartContext.Provider value={initialValue}>
            {children}
        </CartContext.Provider>
    );
};