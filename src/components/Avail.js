import React, { useState } from 'react';
import '../Main.css'
import Modal from 'react-modal';

export default function Avail({open, close}) {
    const [availModalOpen, setAvailModalOpen] = useState(false);
    const [avail, setAvail] = useState(undefined);
    const openModal = async ()  => {
        await fetch("http://localhost:9000/books").then(res => res.json()).then(data => {
            let books = []
        for(let i = 0; i<data.length; i++) {
            if(data[i].avail === true) {
                books.push(<h2>{data[i].title} - <span style={{color: '#0CF120'}}>Available ✔</span></h2>);
            }
            else {
                books.push(<h2>{data[i].title} - <span style={{color: '#DA1010'}}>Not Available ✖</span></h2>);
            }
        }
        setAvail(books);
        });
        setAvailModalOpen(true);
    }
    const closeModal = () => {
        setAvailModalOpen(false);
    }

    return(
        <div id='header'>
            <button id='button' onClick={openModal}>Availability</button>
            <Modal
                className='modal'
                isOpen={availModalOpen}
                onRequestClose={closeModal}
                ariaHideApp={false}
                >
                <button className='close' onClick={closeModal}>✖</button>
                <div className='ModalDiv'>
                    {avail}
                </div>
            </Modal>
        </div>
    );
}