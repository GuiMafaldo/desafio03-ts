import { Box, Center, Input } from "@chakra-ui/react";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../components/AppContext";
import { Card } from "../components/Card";
import DButton from "../components/DButton";
import { login } from "../services/login";
import { changeLocalStorage } from "../services/storage";


const Home = () => {
    const [ email, setEmail ] = useState<string>('')
    const [pass, setPass] = useState<string>('')
    const { setIsLoggedIn } = useContext(AppContext)
    const navigate = useNavigate()

    const validateUser = async (email: string, password: string) => {
        const loggedIn = await login(email, password)

        if(!loggedIn && email || !loggedIn && password){
            return alert('Email ou senha incorretos,  verifique suas credenciais!')
        }

        setIsLoggedIn(true)
        changeLocalStorage({ login: true })
        navigate('/conta/1')
    }
  
    return (
        <Box padding="25px">
            <Card>
                <Center>
                    <h1>Faça o login</h1>
                </Center>
                <Input placeholder="email" value={email} onChange={(event) => setEmail(event.target.value)} />
                <Input placeholder="password"  value={pass} onChange={(event) => setPass(event.target.value)}/>
                <Center>
                    <DButton
                        onClick={() => validateUser(email, pass)}
                    />
                    
                </Center>
            </Card>
        </Box>
    );
}

export default Home;
