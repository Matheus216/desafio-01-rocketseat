import { FiCheckSquare } from 'react-icons/fi';
import { Form } from './styles';
import { Modal } from '../Modal';
import { IFood, IModalEditFoodProps } from '../../types/IFoodTypes';

import Input from '../Input';

export function ModalEditFood({ setIsOpen, handleUpdateFood, isOpen, editingFood }: IModalEditFoodProps) {

  const handleSubmit = async (data: IFood) => {
    handleUpdateFood(data);
    setIsOpen();
  };

  return (
    <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
      <Form onSubmit={handleSubmit} initialData={editingFood}>
        <h1>Editar Prato</h1>
        <Input name="image" placeholder="Cole o link aqui" icon={undefined} />

        <Input name="name" placeholder="Ex: Moda Italiana" icon={undefined} />
        <Input name="price" placeholder="Ex: 19.90" icon={undefined} />

        <Input name="description" placeholder="Descrição" icon={undefined} />

        <button type="submit" data-testid="edit-food-button">
          <div className="text">Editar Prato</div>
          <div className="icon">
            <FiCheckSquare size={24} />
          </div>
        </button>
      </Form>
    </Modal>
  )
}