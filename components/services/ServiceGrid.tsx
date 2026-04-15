import ServiceCard from "./ServiceCard";
import type { Service } from "@/lib/services-data";

interface ServiceGridProps {
  services: Service[];
}

export default function ServiceGrid({ services }: ServiceGridProps) {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(360px, 1fr))",
        gap: "1.25rem",
      }}
    >
      {services.map((service, i) => (
        <ServiceCard key={service.slug} service={service} index={i} />
      ))}

      <style>{`
        @media (max-width: 600px) {
          div[style*="auto-fill"] { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}
