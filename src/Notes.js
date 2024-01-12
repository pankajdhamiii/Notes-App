import React, { useEffect, useState } from 'react'


const getLocalData = () => {
    const lists = localStorage.getItem("mytodolist");

    if (lists) {
        return JSON.parse(lists);
    } else {
        return [];
    }
};

const Notes = () => {

    const [inputData, setInputData] = useState("")
    const [items, setItems] = useState(getLocalData())
    const [isEditItems, setIsEditItems] = useState("")
    const [toggleButton, setToggleButton] = useState(false)

    const addItem = () => {
        if (!inputData) {
            alert("Please fill the data")
        } else if (inputData && toggleButton) {
            setItems(items.map((currElem) => {
                if (currElem.id === isEditItems) {
                    return { ...currElem, name: inputData }
                }
                return currElem
            }))
            setInputData([])
            setIsEditItems(null)
            setToggleButton(false)
        }
        else {
            const myNewInputData = {
                id: new Date().getTime().toString(),
                name: inputData
            }
            setItems([...items, myNewInputData])
            setInputData("")
        }
    }


    const editItem = (index) => {
        const item_notes_edit = items.find((currElem) => {
            return currElem.id === index
        })
        setInputData(item_notes_edit.name)
        setIsEditItems(index)
        setToggleButton(true)
    }



    const deleteItem = (index) => {
        const updatedItem = items.filter((currElem) => {
            return currElem.id !== index
        })
        setItems(updatedItem)
    }


    const removeAll = () => {
        setItems([])
    }

    useEffect(() => {
        localStorage.setItem("mytodolist", JSON.stringify(items));
    }, [items]);


    return (
        <>
            <div className='main-div'>
                <div className='child-div'>
                    <figure>
                        <img src="./images/logo.png" alt="noteslogo" />
                    </figure>
                    <div className='addItems'>
                        <input type="text" placeholder='✍️ Add items' className='form-control' value={inputData} onChange={(e) => setInputData(e.target.value)} />

                        {toggleButton ? <i className="far fa-edit add-btn" onClick={addItem}></i> :
                            <i className="fa fa-solid fa-plus" onClick={addItem}></i>}

                    </div>

                    <div className='showItems'>
                        {items.map((currElem) => {
                            return (
                                <div className='eachItem' key={currElem.id}>
                                    <h3>{currElem.name}</h3>
                                    <div className='todo-btn'>
                                        <i className="far fa-edit add-btn"
                                            onClick={() => editItem(currElem.id)}></i>
                                        <i className="far fa-trash-alt add-btn"
                                            onClick={() => deleteItem(currElem.id)}></i>
                                    </div>
                                </div>
                            )
                        })}

                    </div>

                    <div className='showItems'>
                        <button className='btn effect04' data-sm-link-text="REMOVE ALL" onClick={removeAll}>
                            <span> CHECK LIST</span>
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}


export default Notes