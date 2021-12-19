import React, { useReducer } from 'react'
import axios from 'axios';
import GitHubContext from './gitHubContext';
import GitHubReducer from './githubReducer'
import { CLEAR_USERS, GET_REPOS, GET_USER, SEARCH_USERS, SET_LOADING } from '../types';

const GitHubState = (props) => {
   const initialState = {
       user: {},
       users: [],
       repos: [],
       loading: false
   }
   const [state, dispatch] = useReducer(GitHubReducer, initialState);

   const searchUsers = async (text) => {
    setLoading();
    const result = await axios.get(
      `https://api.github.com/search/users?q=${text}&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
    );
    dispatch({type: SEARCH_USERS, payload: result.data.items});
  };

  const getUser = async (login) => {
    setLoading();
    const result = await axios.get(
      `https://api.github.com/users/${login}?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
    );
    dispatch({type: GET_USER, payload: result.data});
  };

  const getUserRepos = async (userName) => {
    setLoading();
    const result = await axios.get(
      `https://api.github.com/users/${userName}/repos?per_page=5&sort=created:asc&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
    );
    dispatch({type: GET_REPOS, payload: result.data});
  };

  const setLoading = () => {
      dispatch({type: SET_LOADING})
  }

  
  const clearUsers = () => {
    dispatch({type: CLEAR_USERS});
  };

   return <GitHubContext.Provider value={{
       user: state.user,
       users: state.users,
       repos: state.repos,
       loading: state.loading,
       searchUsers,
       getUser,
       getUserRepos,
       clearUsers
   }} >
       {props.children}
   </GitHubContext.Provider>
}


export default GitHubState;
