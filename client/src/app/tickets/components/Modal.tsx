import React, { PropsWithChildren } from 'react';
import PropTypes from 'prop-types';

type PropsType = PropsWithChildren<{
  //
}>;

function Modal({ children }: PropsType) {
  // const modal = document.querySelector('.modal') as Element;

  // const toggleModal = () => {
  //   modal.classList.toggle('hide');
  // };

  return (
    <div>
      <div className="modal hide">
        <div className="modal__inner">{children}</div>
      </div>
    </div>
  );
}

export default Modal;
