import { useNavigate } from "react-router-dom";

export default function StartPage(){
    const nav = useNavigate()
    const navigate = () => {
        nav('/grid')
    }
    return(

        <div> 
            <h1> Welcome! </h1>
            <button onClick={navigate}>Start Game!</button>
        </div>
    );
}
//export default StartPage;