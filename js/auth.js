document.addEventListener('DOMContentLoaded', () => {
    const adminLink = document.getElementById('admin-link');
    const proposalButton = document.getElementById('proposal-button');
  
    // Obtener el token del local storage
    const token = localStorage.getItem('token');
  
    if (token) {
      try {
        const decodedToken = jwt_decode(token);
        const userRole = decodedToken.role;
  
        // Verificar el rol del usuario
        if (userRole !== 'admin') {
          adminLink.style.display = 'none';
        }
        if (userRole !== null ){
          proposalButton.style.display = 'inline-block';

        }
      } catch (error) {
        console.error('Error decoding token:', error);
        adminLink.style.display = 'none';
        proposalButton.style.display = 'none';
      }
    } else {
      adminLink.style.display = 'none';
      proposalButton.style.display = 'none';
    }
  });
  