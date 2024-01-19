import { useState } from "react";
import { useNavigate} from 'react-router-dom';
import { StyleSheet, css } from "aphrodite";
import { Flex, Anchor, Button, Text, Title } from "@mantine/core";

const Registration = ({addUser}) => {
    const navigate = useNavigate()
    const [newUser, setNewUser] = useState(
        {
            username: "", 
            email: "",
            password:"",
            confirmPassword:""
        }
        );

        const [match, setMatch] = useState(false);

        const handleChange = event => {
            const name = event.target.name;
            const updatedUser = {...newUser}
            updatedUser[name] = event.target.value;
            setNewUser(updatedUser);          
        }

        const handleSubmit = event => {
            event.preventDefault();
            if (match){
                addUser(newUser);
                setMatch(false);          
                setNewUser({
                    username: "", 
                    email: "",
                    password:"",
                    confirmPassword:""    
                })
                navigate('/')
            }
        }

        const checkPassword = event =>{
            if (newUser.password === event.target.value){
                setMatch(true);
            }else{
                setMatch(false)
            }
        }

    return(
        <div className={css(styles.mainContainer)}>
            <form onSubmit={handleSubmit} className={css(styles.formContainer)}>
                <Flex direction={"column"} gap={24} justify={"center"} align={"center"}>
                <div className={css(styles.titleContainer)}>
                    <Title c="white" order={2}>Let's get started</Title>
                    <Text c="dimmed" size="sm" ta="center" mt={5}>
                    Create your account to get started on your journey with us!
                    </Text>
                </div>
                <div className={css(styles.feildContainer)}>
                <label htmlFor="email">Email:</label>
                <input className={css(styles.inputFeild)} id="email" type="email" name="email" 
                placeholder="Email" value={newUser.email} required onChange={handleChange}/>
                </div>
                <div className={css(styles.feildContainer)}>
                <label htmlFor="username">Username:</label>
                <input className={css(styles.inputFeild)} id="username" type="text" name="username" 
                placeholder="Username" value={newUser.username} required onChange={handleChange}/>
                </div>
                <div className={css(styles.feildContainer)}>
                <label htmlFor="password">Password (minimum 1 characters): </label>
                <input className={css(styles.inputFeild)} id="password" type="password" name="password" 
                placeholder="Password" value={newUser.password} minLength="1" required onChange={handleChange}/>
                </div>
                <div className={css(styles.feildContainer)}>
                <label htmlFor="confirm_password">Confirm Password: </label>
                <input className={css(styles.inputFeild)} id="confirm_password" type="password" name="confirmPassword" 
                placeholder="Confirm Password" value={newUser.confirmPassword} minLength="1" 
                required onChange={handleChange} onKeyUp={checkPassword}/>
                </div>
                { newUser.confirmPassword !== "" ?
                    <div className="pwd-message">
                    {match? <p>Passwords match ✅</p> : <p>Passwords don't match ❌</p>}
                    </div>
                : <p className="hidden"></p>}
                <div className={css(styles.actionContainer)}>
                    <button className={css(styles.submitButton)} id="create-account-btn" type="submit" disabled={newUser.confirmPassword !== '' && match? false: true}>
                        Create Account
                    </button>

                    <Anchor href="/">
                        <Button size="lg" color="#fad533" variant="outline"> Back to Login</Button>
                    </Anchor>
                </div>
                </Flex>
            </form>
        </div>
    );

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
    formContainer: {
        width: "500px",
        backgroundColor: "black",
        padding: "30px",
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
    },
    submitButton: {
        backgroundColor:"#fad533",
        color: "black",
        padding: "5px",
        borderRadius: "10px",
        fontWeight: "bold",
        paddingLeft: "20px",
        paddingRight: "20px"
    },
    actionContainer: {
        display: "flex",
        width: "100%",
        justifyContent: "space-between",
        marginTop: "14px"
    },
    titleContainer: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
    },

})

export default Registration;