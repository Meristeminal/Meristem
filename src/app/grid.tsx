import {useNavigate} from "react-router-dom";

export default function Grid(){
    const nav = useNavigate()
    const navigate = () => {
        nav('/startPage')
    }
    return(
        <div> 
            <h1> You started the game! </h1>
            <button onClick = {navigate}>End Game</button>
        </div>
    )
}
// export default Grid;