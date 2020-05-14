import React from 'react';

const ButtonStop = ({ onClick = () => {} }) => (
    <div
        style={{
            position: 'relative',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            width: '200px',
            height: '50px',
            margin: 'auto',
            fontSize: '32px',
            fontStyle: 'italic',
            textAlign: 'center',
            lineHeight: '50px',
            cursor: 'pointer',
            backgroundColor: '#FF4646',
            color: '#21222C'
        }}
        onClick={onClick}
    >
        STOP !
    </div>
);

export default ButtonStop;
