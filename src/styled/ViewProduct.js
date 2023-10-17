import styled from "styled-components";

const ViewProduct = styled.div`

    background-color: #00000063;
    height: -webkit-fill-available;

    .card{
        max-width: 700px;
        .row{
            .col-md-4{
                display: flex;
                padding: 10px;
                img{
                    height: 200px;
                    width: 270px;
                    margin: auto;
                }
            }
        }
    }

    @media (max-width:400px){
        .card{
            margin: auto 20px !important;
        }
    }

`;

export default ViewProduct;