import { Component } from 'react';
import { FiPlusSquare } from 'react-icons/fi';
import { IHeaderProps } from '../../types/IFoodTypes';
import { Container } from './styles';

import Logo from '../../assets/logo.svg';

export function Header(props: IHeaderProps) { 
  const { openModal } = props

  return (
    <Container>
      <header>
        <img src={Logo} alt="GoRestaurant" />
        <nav>
          <div>
            <button
              type="button"
              onClick={openModal}
            >
              <div className="text">Novo Prato</div>
              <div className="icon">
                <FiPlusSquare size={24} />
              </div>
            </button>
          </div>
        </nav>
      </header>
    </Container>
  )
}