import { Component } from "react";
import { MenuData } from "./MenuData";
import "./NavbarStyles.scss"
import Logo from "../../../assets/logo.png"
class Navbar extends Component{
    render()
    {
        return(
            <nav className="NavbarItems">
        <h1 className="logonav">
        <img className="logo-img"src={Logo} alt="logo"  width="40px"></img> 
        <h1 className="title">EduHub</h1>
        </h1>
        
        <ul className="nav-menu">
            {MenuData.map((item,index)=>{
                return(
                    <li key={index}>
                    <a href={item.url}
                    className={item.cName}>
                     {item.title}
                    </a>
                </li>
                )
            })}
           
        </ul>
       
      </nav>
        );
    }
}
export default Navbar;