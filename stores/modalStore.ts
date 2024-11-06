interface ModalStoreModel {
    isShown: boolean;
    title: string;
    description: string;
    iconName: string;
    backButtonText: string;
    extraButtonText?: string;
    extraButtonClickFunction?: (...args: any[]) => any;
}

export const useModalStore = defineStore('modal', {
    state: (): ModalStoreModel => ({
        isShown: false,
        title: '',
        description: '',
        iconName: '',
        backButtonText: 'Back',
        extraButtonText: '',
        extraButtonClickFunction: undefined
    }),
    getters: {
        IsShown: (state): boolean => state.isShown,
        Title: (state): string => state.title,
        Description: (state): string => state.description,
        IconName: (state): string => state.iconName,
        BackButtonText: (state): string => state.backButtonText,
        ExtraButtonText: (state): string | undefined => state.extraButtonText,
        ExtraButtonClickFunction: (state): ((...args: any[]) => any) | undefined => state.extraButtonClickFunction
    },
    actions: {
        setShownState(isShown: boolean) {
            this.isShown = isShown;
        },
        setTitle(title: string) {
            this.title = title;
        },
        setDescription(description: string) {
            this.description = description;
        },
        setIconName(iconName: string) {
            this.iconName = iconName;
        },
        setBackButtonText(backButtonText: string) {
            this.backButtonText = backButtonText;
        },
        setExtraButtonText(extraButtonText?: string) {
            this.extraButtonText = extraButtonText;
        },
        setExtraButtonClickFunction(extraButtonClickFunction?: (...args: any[]) => any) {
            this.extraButtonClickFunction = extraButtonClickFunction;
        },
        showModal(
            title: string,
            description: string,
            iconName: string,
            backButtonText: string,
            extraButtonText?: string,
            extraButtonClickFunction?: (...args: any[]) => any
        ) {
            this.isShown = true;
            this.title = title;
            this.description = description;
            this.iconName = iconName;
            this.backButtonText = backButtonText;
            this.extraButtonText = extraButtonText;
            this.extraButtonClickFunction = extraButtonClickFunction;
        },
        clearModal() {
            this.isShown = false;
            this.title = '';
            this.description = '';
            this.iconName = '';
            this.backButtonText = '';
            this.extraButtonText = undefined;
            this.extraButtonClickFunction = undefined;
        }
    }
});
