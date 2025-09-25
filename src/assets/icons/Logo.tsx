interface LogoProps {
  className?: string;
}

export const Logo: React.FC<LogoProps> = ({ className }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 500 150"
      className={className ? className : "w-[150px] h-[80px]"} // 👈 conditional
    >
      <text
        x="0"
        y="100"
        fontFamily="Poppins, Arial, sans-serif"
        fontWeight="700"
        fontSize="90"
        fill="#61cb52"
        letterSpacing="2"
      >
        MYTRIP
      </text>
    </svg>
  );
};
