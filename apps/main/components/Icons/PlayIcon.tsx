const PlayIcon: React.FC<{ className?: string }> = (props) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 27 33"
      fill="none"
      {...props}
    >
      <path
        d="M0 30.3173V2.46889C0 0.92823 1.66874 -0.0338877 3.00207 0.738041L25.6787 13.8666C26.9703 14.6144 27.0174 16.4624 25.7655 17.275L3.08894 31.9949C1.75837 32.8586 0 31.9037 0 30.3173Z"
        fill="inherit"
      />
    </svg>
  );
};

export default PlayIcon;
