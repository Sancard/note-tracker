import React, { Component } from 'react';
import Modal from "react-modal";
import * as styles from './DialogModal.css';

type Props = {
  modalIsOpen: boolean,
  modalTrigger: () => void,
  onConfirm: () => void,
  onDecline: () => void,
};


class DialogModal extends Component<Props> {
  state = {
    modalIsOpen: false
  };


  componentWillReceiveProps(props) {
    this.setState({ modalIsOpen: props.modalIsOpen});
  }

  onModalTrigger = (state) => {
    this.setState({ modalIsOpen: state });
    this.props.modalTrigger(false);
  };

  render() {
    return (
      <Modal
        isOpen={this.state.modalIsOpen}
        contentLabel="Dialog Modal"
        onRequestClose={() => this.onModalTrigger(false)}
        className={styles.modal}
        overlayClassName={styles.backdrop}
        shouldCloseOnOverlayClick={true}
        ariaHideApp={false}
      >
        <p>Are you sure?</p>
        <b className={[styles.hr, styles.anim].join(' ')}></b>
        <button type="button" onClick={this.props.onConfirm}>Yes, do it!</button>
        <button type="button" onClick={this.props.onDecline}>No, abort.</button>
      </Modal>
    );
  }
}

export default DialogModal;
