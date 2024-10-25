export default function ReserverButton({
  text = "Réserver",
  bgColor = "bg-bgColor",
}: {
  text?: string;
  bgColor?: string;
}) {
  return (
    <div className="rounded-lg">
      <button
        className={`flex overflow-hidden reserver-button ${bgColor} flex-col justify-center text-base leading-6 rounded-lg text-current transition duration-300 ease-in-out transform`}
        onClick={() => {
          window.open(
            "https://backoffice.bsport.io/m/Studio%20Biopilates%20Paris/878/calendar/?isPreview=true&tabSelected=0",
            "_blank"
          );
        }}
      >
        <div className="hover-circle overflow-hidden" />
        {text}
      </button>
    </div>
  );
}
