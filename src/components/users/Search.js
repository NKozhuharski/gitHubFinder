import React, { useContext, useState } from 'react'
import PropTypes from 'prop-types'
import GitHubContext from '../../context/gitHub/gitHubContext';
import AlertContext from '../../context/alert/alertContext';

const Search = () => {

    const [text, setText] = useState('');
    const gitHubcontext = useContext(GitHubContext);
    const alertContext = useContext(AlertContext);
    
    const {users, searchUsers, clearUsers} = gitHubcontext;
    const onSubmit = (e) => {
        e.preventDefault();
        if(text === '') {
            alertContext.setAlert('Please enter something...', 'light');
        } else{
            searchUsers(text)
            setText('');
        }
    }
    const onChange = e => setText(e.target.value)
        return (
            <div>
                <form onSubmit={onSubmit} className='form'>
                    <input type='text' name='text' placeholder='Search Users...' value={text} onChange={onChange}/>
                    <input type='submit' value='Search' className='btn btn-dark btn-block' />
                </form>
                {users.length > 0 && <button className='btn btn-light btn-block' onClick={clearUsers} >Clear</button>}
            </div>
        )
}

Search.propTypes = {
    setAlert: PropTypes.func.isRequired
}

export default Search
