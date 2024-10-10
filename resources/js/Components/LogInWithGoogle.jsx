
function isMobile() {
  return /Mobi|Android|iPhone|iPad|iPod|BlackBerry|Windows Phone/i.test(navigator.userAgent);
}

export const LogInWithGoogle = ({ text }) => {

  const handleGoogleLogin = (e) => {
    if(isMobile()) {
      return window.location = "/auth/google";
    };
    
    const width = 600;
    const height = 600;
    const left = (window.innerWidth - width) / 2;
    const top = (window.innerHeight - height) / 2;
    const url = '/auth/google';
    const options = `width=${width},height=${height},top=${top},left=${left}`;

    window.open(url, 'GoogleLogin', options);
  };

  return(
    <button
      type="button"
      onClick={handleGoogleLogin}
      className="w-full flex flex-row text-center mt-5 h-12 font-bold border border-gray-800 bg-white rounded-md cursor-pointer"
    >
      <div 
        className="w-12 h-full flex justify-center items-center bg-white rounded-md"
      >
        <img
            src="/imagenes/google.png"
        />
      </div>
      <p className="w-full h-full flex justify-center items-center text-gray-950">{text}</p>
    </button>
  );
}