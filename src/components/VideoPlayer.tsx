const VideoPlayer = () => {
    return (
      <div className="w-full mx-auto my-10">
        <video
         autoPlay
         loop
         muted
         playsInline
          className="w-full rounded-2xl shadow-lg"
        >
          <source src="https://static-landing.fathom.video/c4a93a8c54c38aabe61636bfd7081035d66f2342/vid/ask-fathom@min.mp4" type="video/mp4" />
        </video>
      </div>
    );
  };
  
  export default VideoPlayer;
  