export default function ReserverButton() {
  return (
    <div className="rounded-lg">
      <button
        className="flex overflow-hidden reserver-button flex-col justify-center text-base leading-6 rounded-lg text-current transition duration-300 ease-in-out transform"
        onClick={() => {
          window.open(
            "https://www.backoffice.bsport.io/m/Studio%20Biopilates%20Paris",
            "_blank"
          );
        }}
      >
        <div className="hover-circle overflow-hidden" />
        Réserver
      </button>
    </div>
  );
}
