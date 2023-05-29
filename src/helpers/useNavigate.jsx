import React from "react";
import { useNavigate } from "react-router-dom";

export default function useNavigate(){
let instance = useNavigate();

 const navigate = (param) => {
    instance(param);
};
}