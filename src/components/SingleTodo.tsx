import React, { useEffect, useRef, useState } from 'react'
import { Todo } from '../model';
import {ReactComponent as EditSVG} from "../icons/edit.svg";
import {ReactComponent as TrashSVG} from "../icons/trash.svg";
import {ReactComponent as CheckmarkSVG} from "../icons/checkmark.svg";

interface Props {
    todo:Todo;
    todos:Todo[];
    setTodos:React.Dispatch<React.SetStateAction<Todo[]>>;
}

const SingleTodo:React.FC<Props> = ({todo,todos,setTodos}) => {
    const [edit, setEdit] = useState<boolean>(false);
    const [editTodo, setEditTodo] = useState<string>(todo.todo);
    const inputRef = useRef<HTMLInputElement>(null)

    const handleDone = (id:number) => {
        todos.map((todo)=>todo.id===id ? {...todo,isDone: !todo.isDone} : todo);
    }
    const handleDelete = (id:number) => {
        setTodos(todos.filter((todo)=>todo.id!==id));
    }
    const handleEdit = (e:React.FormEvent,id:number) => {
        e.preventDefault();
        setTodos(todos.map((todo)=>todo.id===id?{...todo,todo:editTodo}:todo));
        setEdit(false);
    }

    useEffect(()=>{
        inputRef.current?.focus();
    }, [edit]);
    return (
        <form className="todos-single" onSubmit={(e)=>{
            handleEdit(e,todo.id)
        }}>
            {
                edit ? (
                    <input ref={inputRef} type="text" className="todos-single-text" value={editTodo} onChange={(e)=>setEditTodo(e.target.value)} />
                ) : (
                    <span className={`todos-single-text ${todo.isDone?'struck':''}`} >{todo.todo}</span>
                )
            }
            
            <div className="todos-single-tools">
                <span className="icon" onClick={()=>{
                    if(!edit && !todo.isDone) {
                        setEdit(!edit);
                    }
                }}>
                    <EditSVG/>
                </span>
                <span className="icon" onClick={()=>handleDelete(todo.id)}>
                    <TrashSVG/>
                </span>
                <span className="icon" onClick={()=>handleDone(todo.id)}>
                    <CheckmarkSVG/>
                </span>
            </div>
        </form>
    )
}

export default SingleTodo;