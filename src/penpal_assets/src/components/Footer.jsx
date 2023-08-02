import React from "react";

function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer>
      <h1>
     
     PenPal
     <p>Copyright ⓒ {year}</p>
   </h1>
      
    </footer>
  );
}

export default Footer;
