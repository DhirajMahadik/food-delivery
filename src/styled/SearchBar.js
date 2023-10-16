import styled from "styled-components";

const SearchBar =styled.div`

    justify-content: end;
    input{
    padding: 10px;
    border-radius: 30px;
    border: solid #fff 1px;
    background-color: transparent !important;
    box-shadow: none !important;
    transition: 0.3s;
    color: #fff;
    :focus{
        color: #fff;
    }
    }
    input::placeholder{
        color: #fff;
    }
 

`;

export default SearchBar;