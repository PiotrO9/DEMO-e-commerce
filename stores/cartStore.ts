import { defineStore } from 'pinia';
import { watch } from 'vue';
import type { Product } from '@prisma/client';

interface CartProductModel {
    product: Product;
    quanitity: number;
}

interface CartStoreModel {
    items: CartProductModel[];
    amountOfItems: number;
}

const STORAGE_KEY = 'cart_store';

export const useCartStore = defineStore('cart', {
    state: (): CartStoreModel => ({
        items: [],
        amountOfItems: 0
    }),
    getters: {
        Items(state): number {
            return state.items.length;
        },
        uniqueProductsCount(state): number {
            return state.items.length;
        },
        totalProductsCount(state): number {
            return state.items.reduce((total, item) => total + item.quanitity, 0);
        }
    },
    actions: {
        loadCartFromStorage() {
            const storedCart = localStorage.getItem(STORAGE_KEY);

            if (storedCart) {
                try {
                    const parsedCart = JSON.parse(storedCart) as CartStoreModel;

                    this.items = parsedCart.items || [];
                    this.amountOfItems = parsedCart.amountOfItems || 0;
                }
                catch (error) {
                    console.error('Failed to parse cart from localStorage:', error);
                }
            }
        },
        saveCartToStorage() {
            try {
                const serializedCart = JSON.stringify(this.$state);

                localStorage.setItem(STORAGE_KEY, serializedCart);
            }
            catch (error) {
                console.error('Failed to save cart to localStorage:', error);
            }
        },
        addItem(product: Product, quanitity: number = 1) {
            const existingProduct = this.items.find(item => item.product.id === product.id);

            if (existingProduct) {
                existingProduct.quanitity += quanitity;
            }
            else {
                this.items.push({ product, quanitity: quanitity });
            }

            this.updateAmountOfItems();
        },
        updateProductQuantity(productId: string, amount: number) {
            const productToUpdate = this.items.find(item => item.product.id === productId);

            if (productToUpdate) {
                productToUpdate.quanitity = amount > 0 ? amount : 0;

                if (amount === 0) {
                    this.items = this.items.filter(item => item.product.id !== productId);
                }

                this.updateAmountOfItems();
                this.saveCartToStorage();
            }
        },
        removeItem(index: number) {
            this.items.splice(index, 1);
            this.updateAmountOfItems();
        },
        removeItemById(productId: string) {
            this.items = this.items.filter(item => item.product.id !== productId);
            this.updateAmountOfItems();
        },
        clearCart() {
            this.items = [];
            this.amountOfItems = 0;
            localStorage.removeItem(STORAGE_KEY);
        },
        updateAmountOfItems() {
            this.amountOfItems = this.items.reduce((total, item) => total + item.quanitity, 0);
        }
    }
});

export function initializeCartStore() {
    const cartStore = useCartStore();

    cartStore.loadCartFromStorage();
    watch(
        () => cartStore.$state,
        () => {
            cartStore.saveCartToStorage();
        },
        { deep: true }
    );
}
