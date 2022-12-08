import React, { useState } from 'react';
import '../Main.css'
import Modal from 'react-modal';

export default function BookView({book, bookName}) {
    const [bookModalOpen, setBookModalOpen] = useState(false);
    const [bookFetch, setBookFetch] = useState(undefined);

    function dateBuilder(d, plus, method) {
        const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
        let day = days[(d.getDay() + plus) % 7];
        let month = months[d.getMonth()];
        let year = d.getFullYear();
        let date = d.getDate() + plus;
        let compMonth = d.getMonth() + 1;
        if(plus > 0) {
            if(date > 28) {
                if(month === "January" || month === "March" || month === "May" || month === "July" || month === "August" || month === "October") {
                    if(date > 31) {
                        month = months[d.getMonth() + 1];
                        compMonth = d.getMonth() + 2;
                        date = date - 31;
                    }
                }
                else if(month === "April" || month === "June" || month === "September" || month === "November") {
                    if(date > 30) {
                        month = months[d.getMonth() + 1];
                        compMonth = d.getMonth() + 2;
                        date = date - 30;
                    }
                }
                else if(month === "February") {
                    if(year % 400 === 0) {
                        if(date > 29) {
                            month = months[d.getMonth() + 1];
                            compMonth = d.getMonth() + 2;
                            date = date - 29;
                        }
                        else {
                            month = months[d.getMonth() + 1];
                            compMonth = d.getMonth() + 2;
                            date = date - 28;
                        }
                    }
                }
                else if(month === "December") {
                    if(date > 31) {
                        month = "January"
                        compMonth = 1;
                        date = date - 31;
                        year = year + 1;
                    }
                }
            } 
        }
        if(method === 'compare') {
            return `${compMonth}/${date}/${year}`;
        }
        else {
            return `${day} ${date} ${month} ${year}`;
        }
    }

    function convertDate(date) {
        const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        let dateArr = date.split(" ");
        let month = 1;
        for(let i = 0; i<months.length; i++) {
            if(dateArr[2] === months[i]) {
                month = i+1;
                break;
            }
        }
        return `${month}/${dateArr[1]}/${dateArr[3]}`;
    }

    const fetchBookInfo = async () => {
        await fetch(`https://libraryoftruthserver.fly.dev/books/${bookName}`).then(res => res.json()).then(data => {
            if(data.avail === true) {
                setBookFetch(
                    <div>
                        <div style={{width:'75%', float: 'left'}}>
                            <h2>Title - <span style={{color: '#F3D4C5'}}>{data.title}</span></h2>
                            <h2>Author - <span style={{color: '#F3D4C5'}}>{data.author}</span></h2>
                            <h2>Published - <span style={{color: '#F3D4C5'}}>{data.published}</span></h2>
                            <h2>Publisher - <span style={{color: '#F3D4C5'}}>{data.publisher}</span></h2>
                            <h2>ISBN - <span style={{color: '#F3D4C5'}}>{data.isbn}</span></h2>
                            <h1 style={{color: '#0CF120'}}>✔ Available ✔</h1>
                        </div>
                        <div style={{width:'25%', float: 'left'}}>
                            <h2 style={{color: '#0CF120', fontSize: '3rem', fontWeight:'800'}}>Enter Your Name to Check Out</h2>
                            <input type='text' id='who'/><br></br>
                            <button  id='button' onClick={() => update("out")}>Check Out</button>
                        </div>
                    </div>)
            }
            else {
                if(overdue(data.due)) {
                    setBookFetch(
                        <div>
                            <div style={{width:'75%', float: 'left'}}>
                                <h2>Title - <span style={{color: '#F3D4C5'}}>{data.title}</span></h2>
                                <h2>Author - <span style={{color: '#F3D4C5'}}>{data.author}</span></h2>
                                <h2>Published - <span style={{color: '#F3D4C5'}}>{data.published}</span></h2>
                                <h2>Publisher - <span style={{color: '#F3D4C5'}}>{data.publisher}</span></h2>
                                <h2>ISBN - <span style={{color: '#F3D4C5'}}>{data.isbn}</span></h2>
                                <h1 style={{color: '#DA1010'}}>✖ Not Available ✖</h1>
                                <h2>Checked Out By - <span style={{color: '#F3D4C5'}}>{data.who}</span></h2>
                                <h2>Due - <span style={{color: '#F3D4C5'}}>{data.due}</span></h2>
                            </div>
                            <div style={{width:'25%', float: 'left'}}>
                                <h1 style={{color: '#DA1010', fontSize: '4rem', fontWeight:'800'}}>OVERDUE!</h1>
                                <button  id='button' onClick={() => update("in")}>Check In</button>
                            </div>
                        </div>)
                }
                else {
                    setBookFetch(
                        <div>
                            <div style={{width:'75%', float: 'left'}}>
                                <h2>Title - <span style={{color: '#F3D4C5'}}>{data.title}</span></h2>
                                <h2>Author - <span style={{color: '#F3D4C5'}}>{data.author}</span></h2>
                                <h2>Published - <span style={{color: '#F3D4C5'}}>{data.published}</span></h2>
                                <h2>Publisher - <span style={{color: '#F3D4C5'}}>{data.publisher}</span></h2>
                                <h2>ISBN - <span style={{color: '#F3D4C5'}}>{data.isbn}</span></h2>
                                <h1 style={{color: '#DA1010'}}>✖ Not Available ✖</h1>
                                <h2>Checked Out By - <span style={{color: '#F3D4C5'}}>{data.who}</span></h2>
                                <h2>Due - <span style={{color: '#F3D4C5'}}>{data.due}</span></h2>
                            </div>
                            <div style={{width:'25%', float: 'left'}}>
                                <h1 style={{color:'#EAB724', fontSize: '4rem', fontWeight:'800'}}>DUE SOON!</h1>
                                <button  id='button' onClick={() => update("in")}>Check In</button>
                            </div>
                        </div>)
                }
            }
        });
    }
    
    const openModal = async () => {
        fetchBookInfo();
        setBookModalOpen(true);
    }
    const closeModal = () => {
        setBookModalOpen(false);
    }

    function overdue(dueDate) {
        let currDate = dateBuilder(new Date(), 0, "compare");
        let due = convertDate(dueDate);
        if(new Date(currDate) > new Date(due)) {
            return true;
        }
        return false;
    }

    async function update(status) {
        let obj;
        if(status === "out") {
            let who = document.getElementById("who").value;
            let date = dateBuilder(new Date(), 3);
            obj = {avail:false, who:who, due:date};
        }
        else {
            obj = {avail:true, who:"", due:""};
        }
        let JSONobj = JSON.stringify(obj);
        var req = new XMLHttpRequest();
        req.open("PUT", `https://libraryoftruthserver.fly.dev/books/${bookName}`, false);
        req.setRequestHeader('Content-Type', 'application/json');
        req.send(JSONobj);
        await fetchBookInfo();
    }

    return(
        <div id='view'>
            <img className='bookImg' src={book}  onClick={openModal} />
            <Modal
                className='modal'
                isOpen={bookModalOpen}
                onRequestClose={closeModal}
                ariaHideApp={false}
                >
                <button className='close' onClick={closeModal}>✖</button>
                <div className='ModalDiv'>
                    {bookFetch}
                </div>
            </Modal>
        </div>
    );
}