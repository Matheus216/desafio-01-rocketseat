import { Component, createRef } from 'react';
import { FiCheckSquare } from 'react-icons/fi';

import { Form } from './styles';
import { Modal } from '../Modal';
import Input from '../Input';
import { IFood, IModalAddFoodProps } from '../../types/IFoodTypes';
import { useState } from 'react';

export function ModalAddFood({ setIsOpen, handleAddFood, isOpen }: IModalAddFoodProps) {

  const handleSubmit = async (data: IFood) => {
    handleAddFood(data);
    setIsOpen();
  };

  const [form, setForm] = useState()

  return (
    <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
      <Form ref={form} onSubmit={handleSubmit}>
        <h1>Novo Prato</h1>
        <Input icon={''} name="image" placeholder="Cole o link aqui" />

        <Input icon={''} name="name" placeholder="Ex: Moda Italiana" />
        <Input icon={''} name="price" placeholder="Ex: 19.90" />

        <Input icon={''} name="description" placeholder="Descrição" />
        <button type="submit" data-testid="add-food-button">
          <p className="text">Adicionar Prato</p>
          <div className="icon">
            <FiCheckSquare size={24} />
          </div>
        </button>
      </Form>
    </Modal>
  );
}