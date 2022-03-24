export interface IFood {
    id: number;
    name: string;
    description: string;
    price: number;
    isAvailable: boolean;
    image: string;
}

export interface IFoodProps { 
    food:IFood;
    handleEditFood: (food: IFood) => void; 
    handleDelete: (id:number) => void;
}

export interface IHeaderProps { 
    openModal: () => void;
}

export interface IModalProps { 
    isOpen: boolean;
    setIsOpen: () => void;
    children: JSX.Element;
}

export interface IModalAddFoodProps { 
    setIsOpen: () => void;
    handleAddFood: (food: IFood) => void; 
    isOpen: boolean;
}

export interface IModalEditFoodProps { 
    handleUpdateFood: (food: IFood) => void; 
    setIsOpen: () => void;
    isOpen: boolean;
    editingFood: IFood;
}


//style 
export interface IContainerProps {
    available: boolean;
}

export interface IContainerInputProps {
    isFocused: boolean;
    isFilled: boolean;
}