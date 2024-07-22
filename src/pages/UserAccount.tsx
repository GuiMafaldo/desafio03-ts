import { useContext, useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { AppContext } from "../components/AppContext"
import { api } from "../api"
import { Center, SimpleGrid, Spinner } from "@chakra-ui/react"
import CardInfo from "../components/CardInfo"

interface DataUser {
    email: string
    password: string
    name: string
    balance: number
    id: string
}


const NewUserAccount = () => {
    const [ dataUser, setData ] = useState<null | DataUser>()
    const { id } = useParams()
    const navigate = useNavigate()

    const { isLoggedIn } = useContext(AppContext)

    !isLoggedIn && navigate('/')


    useEffect(() => {
        const getData = async() =>{
            const data: any | DataUser = await api
            setData(data)
        }
        getData()
    }, [])

    if(dataUser && id !== dataUser.id){
        navigate('/')
    }

    return(
        <Center>
            <SimpleGrid columns={1} spacing={8} paddingTop={16}>
                {
                    dataUser === undefined || dataUser === null ?
                    (  
                        <Center>
                            <Spinner size='xl' color='white'/>
                        </Center>
                    ) : 
                    (
                        <>
                            <CardInfo mainContent={`Bem vindo ${dataUser?.name}`} content={`${dataUser.email}`} />
                        </>
                    )
                }
            </SimpleGrid>    
        </Center>
    )
}

export default NewUserAccount