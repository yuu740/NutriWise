import React from "react";

export const Register = () => {
  return(
    <div style={styles.page}>
    <h1 style={styles.title}>NutriWise</h1>
    <div style={styles.formContainer}>
      <label style={styles.name}>Name</label>
      <input type="name" style={styles.inputname} />
      
      <label style={styles.email}>Email</label>
      <input type="email" style={styles.inputemail} />

      <label style={styles.password}>Password</label>
      <input type="password" style={styles.inputpassword} />
      
      <button style={styles.button}>Join</button>
    </div>
  </div>
  );
};

  const styles: { [key: string]: React.CSSProperties } = {
    
    page: {
      height: '100vh',
      backgroundColor: '#fdf0b7',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
    },

    title: {
      color: '#cc6600', 
      fontFamily: '"Playfair Display SC", serif',
      fontWeight: 'bold',
      marginBottom: '20px',
    },

    formContainer: {
      backgroundColor: '#FFB35C', 
      padding: '40px',
      display: 'flex',
      flexDirection: 'column',
      gap: '15px',
      minWidth: '300px',
      height: '300px',
      borderRadius: '15px',
      position: 'relative',
    },

    name: {
      fontFamily: '"Playfair Display", serif',
      position: 'relative',
      fontSize: '20px',
      bottom: '10px',
      textAlign: 'left',
      left: '5px',
      marginBottom: '-10px',
    },

    email: {
      fontFamily: '"Playfair Display", serif',
      position: 'relative',
      fontSize: '20px',
      textAlign: 'left',
      left: '5px',
    },

    password: {
      fontFamily: '"Playfair Display", serif',
      marginBottom: '-5px',
      position: 'relative',
      fontSize: '20px',
      textAlign: 'left',
      left: '5px',
    },

    inputname: {
      padding: '10px',
      borderRadius: '15px',
      border: 'none',
      backgroundColor: '#FFB1B1', 
      fontSize: '16px',
      height: '27px',
    },

    inputemail: {
      padding: '10px',
      borderRadius: '15px',
      border: 'none',
      backgroundColor: '#FFB1B1', 
      fontSize: '16px',
      height: '27px',
    },

    inputpassword: {
      padding: '10px',
      borderRadius: '15px',
      border: 'none',
      backgroundColor: '#FFB1B1',
      height: '27px', 
      fontSize: '16px',
    },

    button: {
      marginTop: '78px',
      marginLeft: '200px',
      padding: '10px',
      backgroundColor: '#F7E255', 
      border: 'none',
      borderRadius: '15px',
      cursor: 'pointer',
      width: '64px',
      fontFamily: '"Playfair Display", serif',
      height: '30px',
      display: 'flex',              
      alignItems: 'center',        
      justifyContent: 'center',    
      textAlign: 'center',
      position: 'absolute',
      bottom: '14px',         
      right: '24px',  
    },
  
  };

