

export default function ReserverButton({
  text = "Réserver",
  bgColor = "bg-bgColor",
  link ="",
}: {
  text?: string;
  bgColor?: string;
  link: string; // Dynamic link passed as a prop
}) {
  // Fallback to default link if no link is provided
  const defaultLink = "https://backoffice.bsport.io/m/Studio%20Biopilates%20Paris/878/calendar/?isPreview=true&tabSelected=0";
  const buttonLink = link || defaultLink;

  return (
    <div className="rounded-lg">
      <button
        className={`flex overflow-hidden reserver-button cursor-pointer ${bgColor} flex-col justify-center text-base leading-6 rounded-lg text-current transition duration-300 ease-in-out transform`}
        onClick={() => {
          window.open(buttonLink, "_blank");
        }}
      >
        <div className="hover-circle overflow-hidden" />
        {text}
      </button>
    </div>
  );
}
