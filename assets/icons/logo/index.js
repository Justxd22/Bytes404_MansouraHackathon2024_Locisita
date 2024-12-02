const Logo = () => {
  return (
    <img 
      src="/images/logg.svg" 
      alt="" 
      style={{ 
        marginRight: '10px',
        width: '50px',  // Set a specific width
        height: 'auto',  // Maintain aspect ratio
        maxWidth: '100%' // Ensure it doesn't overflow its container
      }} 
    />
  )
};

export default Logo;