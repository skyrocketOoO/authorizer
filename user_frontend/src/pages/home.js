import { useNavigate } from "react-router-dom";
import { useEffect } from 'react';


const Home = () => {
    const navigate = useNavigate();
  
    useEffect(() => {
      if (!localStorage.getItem("authToken")) {
        navigate("/login");
      }
    }, []);

    const logout = () => {
        localStorage.removeItem("authToken");
        navigate("/login");
    }
  
    return (
      <>
        <main>
          <h1>Home</h1>
        </main>
        <button style={styles.button} onClick={logout}>Logout</button>
      </>
    );
}

const styles = {
    body: {
      background: 'linear-gradient(to bottom, #282c34, #555)',
      fontFamily: 'Arial, sans-serif',
      textAlign: 'center',
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
    },
    block: {
      backgroundColor: 'white',
      padding: '20px',
      borderRadius: '8px',
      width: '300px',
      minHeight: '300px',
      textAlign: 'center',
      marginLeft: 'auto',
      marginRight: 'auto',
      boxShadow: '0px 0px 10px 0px rgba(0,0,0,0.2)', // Added a subtle box shadow
    },
    heading: {
      color: '#333', // Dark gray text color
      // textShadow: '1px 1px blue'
    },
    input: {
      width: '100%',
      padding: '10px',
      margin: '8px 0',
      boxSizing: 'border-box',
      borderRadius: '4px',
      border: '1px solid #ccc',
    },
    button: {
      backgroundColor: '#4caf50', // Green button color
      color: 'white',
      padding: '10px 15px',
      border: 'none',
      borderRadius: '4px',
      cursor: 'pointer',
    },
    link: {
      textDecoration: 'none',
      color: '#2196F3', // Blue link color
      margin: '0 10px',
    },
  };

export default Home;