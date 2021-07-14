import React from "react";
import "./Search.scss"
import searchIcon from "../../assets/images/search.svg";

function Search() {
    return <div className="search">
        <input className="search__input"></input>
        <img className="search__icon" src={searchIcon}></img>
    </div>
}

export default Search