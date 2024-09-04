
import "@/assets/styles/circular-text.css";
export default function CallToActionImg() {
  const text = "Le Pilates : force, souplesse, équilibre.";
  return (
    <div className="hidden md:flex items-center justify-center">
      <div className="circular-text">
        <img
          src={require("@/assets/images/stott.jpg")}
          alt="Pilates"
          className="rounded-full object-cover w-[250px] h-[250px]"
        />
      </div>
    </div>
  );
}
