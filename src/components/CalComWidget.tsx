
import React, { useEffect } from "react";

interface CalComWidgetProps {
  username: string;
}

const CalComWidget: React.FC<CalComWidgetProps> = ({ username }) => {
  useEffect(() => {
    // Load Cal.com embed script
    const script = document.createElement("script");
    script.src = "https://cal.com/embed.js";
    script.async = true;
    document.body.appendChild(script);

    return () => {
      // Cleanup script when component unmounts
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div
      className="rounded-md overflow-hidden"
      style={{ minHeight: "350px", width: "100%", maxWidth: "450px" }}
    >
      <iframe
        src={`https://cal.com/${username}/30min?embed=true`}
        width="100%"
        height="350px"
        frameBorder="0"
        title="Schedule a demo with LeadEnrich"
      ></iframe>
    </div>
  );
};

export default CalComWidget;
