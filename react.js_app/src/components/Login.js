import { useState, useContext } from "react"
import UserContext from "../UserContext";
import { useNavigate } from 'react-router-dom'
import { StyleSheet, css } from "aphrodite"
import { Anchor, Flex, Text, Checkbox, Title } from "@mantine/core";

const Login = ({fetchLogIn}) => {
    const navigate = useNavigate()
    const {loggedInUser} = useContext(UserContext);

    const [user, setUser] = useState({
        username: "",
        password: ""
    })
    const togglePassword = () => {
        var x = document.getElementById("login-password");
        if (x.type === "password") {
          x.type = "text";
        } else {
          x.type = "password";
        }
      }

    const handleChange = event => {
        const propertyName = event.target.name
        const copiedUser = {...user}
        copiedUser[propertyName] = event.target.value
        setUser(copiedUser)
    }

    const handleSubmit = event => {
        event.preventDefault()
        fetchLogIn(user).then(savedUser => {
            if(savedUser !== undefined && savedUser.username) {
                setUser({
                    username: "",
                    password: ""
                })
                navigate('/chat')
            }
        })
    }
    
    return (
        <div className={css(styles.mainContainer)}>
            <form onSubmit={handleSubmit} className={css(styles.formContainer)}>
                <Flex direction={"column"} gap={24} justify={"center"} >
                <div className={css(styles.titleContainer)}>
                    <Title c="white">Log In</Title>
                    <Text c="dimmed" size="sm" ta="center" mt={5}>
                        Do not have an account yet?{' '}
                        <Anchor size="sm"  href="/signup" c="#fad533">
                            Create account
                        </Anchor>
                    </Text>
                </div>
                
                {loggedInUser !== undefined && loggedInUser.message ? 
                <p >{loggedInUser.message}</p>
                :
                <p className="hidden"></p>
                }
                <div className={css(styles.feildContainer)}>
                <label >Username or Email:</label>
                <input type="text"
                id="login-username"
                name="username"
                placeholder="Username or Email"
                onChange={handleChange}
                className={css(styles.inputFeild)}
                />
                </div>
                <div className={css(styles.feildContainer)}>
                <label >Password:</label>
                <input type="password"
                id="login-password"
                name="password"
                placeholder="Password"
                onChange={handleChange}
                className={css(styles.inputFeild)}
                />
                <Checkbox label="Show Password" onChange={togglePassword} />
                </div>

                <button type="submit" className={css(styles.submitButton)}>Sign In
                </button>

                </Flex>             
            </form>
        </div>
    )
}
const styles = StyleSheet.create({
    mainContainer: {
        display: "flex",
        width: "100%",
        height: "100vh",
        flexDirection: "column",
        justifyContent: "center",
        alignItems:"center",
        gap: "32px"
    },
    titleContainer: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
    },
    formContainer: {
        width: "500px",
        backgroundColor: "black",
        padding: "30px"
    },
    submitButton: {
        backgroundColor:"#fad533",
        color: "black",
        padding: "5px",
        borderRadius: "10px",
        width: "100%",
        fontWeight: "bold"
    },
    feildContainer: {
        display:"flex",
        flexDirection: "column",
        alignItems:"flex-start",
        width:"100%",
        gap: "10px"
    },
    inputFeild: {
        width: "100%",
        padding: "5px"
    }

})
export default Login