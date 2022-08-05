import styled from 'styled-components'
const Fullpage = styled.div`
    min-height: 100vh;
   

`
const PrimaryButton = styled.button`
font-family: 'Inter', sans-serif;
font-family: 'Poppins', sans-serif;
 display: flex;
 font-size: 24px;
flex-direction: row;
justify-content: center;
align-items: center;
padding: 0px;
gap: 10px;
background: #1BA160;
border-radius: 8px;
padding:.5em 4em .5em 4em;
border:none;
color: ${props => props.color};
font-weight: ${props => props.weight};
align-self: ${props => props.alignSelf};
@media (max-width:475px){
    font-size: 16px;
}

`
export { PrimaryButton, Fullpage }