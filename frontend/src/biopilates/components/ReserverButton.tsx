
import { useNavigate } from 'react-router-dom';

export default function ReserverButton({
  text = "Réserver",
  bgColor = "bg-bgColor",
}: {
  text?: string;
  bgColor?: string;
}) {
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate('/login');
  };

  return (
    <div className="rounded-lg">
      <button
        className={`flex overflow-hidden reserver-button ${bgColor} flex-col justify-center text-base leading-6 rounded-lg text-current transition duration-300 ease-in-out transform`}
        onClick={handleNavigate}
      >
        <div className="hover-circle overflow-hidden" />
        {text}
      </button>
    </div>
  );
}
