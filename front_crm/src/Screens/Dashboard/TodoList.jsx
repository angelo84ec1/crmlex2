import React from 'react'
import PlusIcon from '../../assets/images/plus-icon.svg'

export default function TodoList() {
    return (
        <React.Fragment>
            <div className="rectangle-sec mt-3">
                <div className="todo-list">
                    <h4 className="mt-2">TODOLIST</h4>
                    <form action="#">
                        <input className="input-text" type="text" name="" value="" placeholder="buy dogs food" />
                        <span><button className="add-btn"><img src={PlusIcon} alt="plus" /></button></span>
                    </form>
                    <div className="edit-sec mt-2 me-3 ms-3">
                        <div className="edit-row  pe-2 ps-2 pt-2 pb-2">
                            <input type="checkbox" name="" id="" />
                            <span className="ms-1">read the book</span>
                            <span className="icon float-end">
                                <a href=""><i className=' cross-icon bx bx-x'></i></a>
                                <a href=""> <i className='bx bxs-pencil'></i></a>
                            </span>
                        </div>
                    </div>
                    <div className="edit-sec mt-2 me-3 ms-3">
                        <div className="edit-row  pe-2 ps-2 pt-2 pb-2">
                            <input type="checkbox" name="" id="" />
                            <span className="ms-1">read the book</span>
                            <span className="icon float-end">
                                <a href=""><i className=' cross-icon bx bx-x'></i></a>
                                <a href=""> <i className='bx bxs-pencil'></i></a>
                            </span>
                        </div>
                    </div>
                    <div className="todo-task mt-3 me-3 ms-3">
                        <button className="task-btn" style={{ position: "relative" }}>1 of two task done</button>
                        <button className="float-end remove-btn">Remove checked</button>
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}
