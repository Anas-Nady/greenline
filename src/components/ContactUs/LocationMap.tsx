import { COMPANY_LOCATION } from "@/constants/data";

export default function LocationMap() {
  return (
    <div className="location-map">
      <iframe
        src={COMPANY_LOCATION}
        width="100%"
        height="400"
        style={{ border: "0" }}
        allowFullScreen
        loading="lazy"
      />
    </div>
  );
}
