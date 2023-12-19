import React, { useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../Context/AuthContext';
import { useContext } from "react";
import { UrlContext } from "../App";

const Home = () => {
  const { baseUrl } = useContext(UrlContext);
  const navigate = useNavigate();
  const { user, isLoggedin } = useAuth();

  useEffect(() => {
    // Use the navigate function to redirect based on login status
    console.log("Home - isLoggedin:", isLoggedin);

    // Adiciona um atraso de 0.5 segundo (500 milissegundos)
    const delay = 500;

    const redirectToPage = () => {
      if (isLoggedin && user && user.id !== null) {
        navigate(`/addresses/${user.id}`);
      } else {
        navigate('/login');
      }
    };

    const timeoutId = setTimeout(redirectToPage, delay);

    // Limpa o timeout quando o componente é desmontado
    return () => clearTimeout(timeoutId);
  }, [isLoggedin, navigate, user]);

  // Renderiza um conteúdo enquanto espera
  return <div>Carregando...</div>;
};

export default Home;
