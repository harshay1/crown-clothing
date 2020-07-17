import React from 'react';
import './signup.styles.scss';
import FormInput from '../form-input/form-input.component';
import CustomButton from '../custom-button/custom-button.component';
import {auth, createUserProfileDocument} from '../../firebase/firebase.utils';

class SignUp extends React.Component {
    constructor(props){
        super(props);
        
        this.state = {
            displayName: '',
            email: '',
            password: '',
            confirmPassword: ''
        }
    }

    handleSubmit = async event => {
        event.preventDefault();
        const { displayName, email, password, confirmPassword} = this.state;

        if (password !== confirmPassword) {
            alert("Passwords Must Match");
            return;
        }

        try {
            const {user} = await auth.createUserWithEmailAndPassword(email,password);

            await createUserProfileDocument(user, {displayName});
            this.setState({
                displayName: '',
                email: '',
                password: '',
                confirmPassword: ''
            });
        } catch (error) {
            console.error(error);
            
        }
        this.setState({email: '', password: ''});
    }

    handleChange = event => {
        const {value, name} = event.target;
        this.setState({[name]: value});
    }

    render() {
        const { displayName, email, password, confirmPassword} = this.state;
        return (<div className='sign-up'>
            <h2 className='title'>I Do Not have an account</h2>
            <span>Please Sign Up with your email and password</span>
            <form className='sign-up-form' onSubmit={this.handleSubmit}>
                <FormInput 
                    name="displayName" 
                    label="displayName"
                    type="text" 
                    value={displayName} 
                    required 
                    handleChange={this.handleChange} />
                <FormInput 
                    name="email" 
                    label="email"
                    type="email" 
                    value={email} 
                    required 
                    handleChange={this.handleChange} />
                <FormInput 
                    name="password" 
                    label="password" 
                    type="password" 
                    value={password} 
                    required 
                    handleChange={this.handleChange} />
                <FormInput 
                    name="confirmPassword" 
                    label="Confirm Password" 
                    type="password" 
                    value={confirmPassword} 
                    required 
                    handleChange={this.handleChange} />
                <div className='buttons'>
                    <CustomButton type="submit">Sign Up</CustomButton>
                </div>
                
            </form>
        </div>);
    }
}

export default SignUp;