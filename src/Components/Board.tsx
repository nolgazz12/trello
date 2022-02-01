import React, { useRef } from "react";
import { useForm } from "react-hook-form"
import { Droppable } from "react-beautiful-dnd";
import styled from "styled-components";
import DraggableCard from "./DraggableCard";
import { ITodo, toDoState } from "../atoms";
import { useSetRecoilState } from "recoil";

const Wrapper = styled.div`
padding :10px 0px;
width: 300px;
background-color: ${(props) => props.theme.boardColor};
border-radius: 5px;
display: flex;
flex-direction: column;
`
const Title = styled.h2`
    text-align: center;
    font-weight: 600;
    margin-bottom: 10px;
    font-size: 18px;
`
interface IAreaProps {
    draggingFromThisWith : boolean;
    isDraggingOver:boolean;
}

const Area = styled.div<IAreaProps>`
    background-color: ${(props) => 
    props.isDraggingOver ? "#dfe6e9" : 
    props.draggingFromThisWith ? "#b2bec3" : "trpnsparent"};
    flex-grow: 1;
    transition: background-color .5s ease-in-out ;
    padding : 20px;
`
const Form = styled.form`
    width : 300px;
`

interface IBoardProps {
    toDos : ITodo[];
    boardId : string;
}

interface IForm {
    toDo : string;
}

function Board({toDos, boardId}:IBoardProps) {
    const setToDos = useSetRecoilState(toDoState)
    const { register, setValue, handleSubmit } = useForm<IForm>();
    const onValid = ({toDo}:IForm) => {
        const newToDo ={
            id : Date.now(),
            text : toDo,
        }
        setToDos(allBoards => {
            return {
                ...allBoards,
                [boardId] : [newToDo, wi...allBoards[boardId]],
            }
        })
        setValue("toDo", "")
    }
    return (
        <Wrapper>
            <Title>{boardId}</Title>
            <Form onSubmit={handleSubmit(onValid)}>
                <input {...register("toDo", {required : true})} type="text" placeholder={`add sask on ${boardId}`} />
            </Form>
            <Droppable droppableId={boardId}>
                {(magic, snapshot) => (
                <Area draggingFromThisWith={Boolean(snapshot.draggingFromThisWith)} isDraggingOver={snapshot.isDraggingOver} ref={magic.innerRef} {...magic.droppableProps}>
                    {toDos.map((toDo, index) => (
                        <DraggableCard key={toDo.id}
                        index={index} toDoId={toDo.id} toDoText={toDo.text}/>
                
                            ))}
                            {magic.placeholder}
                    </Area>)}
                </Droppable>
            </Wrapper>      
        )
}

export default React.memo(Board)