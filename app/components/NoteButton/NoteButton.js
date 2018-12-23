import React from 'react';
import styles from './NoteButton.css';

type Props = {
  onClick: () => void,
  padding?: string,
  disabled?: boolean,
  children: React.Children,
};

const NoteButton = (props: Props) => {

  const buttonStyle = {
    padding: props.padding ? props.padding : '20px 45px'
  };


  return (
    <button style={buttonStyle} type="button" className={styles.button}
            onClick={props.onClick} disabled={props.disabled}>{props.children}</button>
  );
};

export default NoteButton;
