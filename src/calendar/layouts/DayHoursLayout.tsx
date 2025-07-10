import { Stack, Divider, Typography } from "@mui/material";
import { type TimeSlot } from "../../types/base/hours.types";
import { useEffect, useRef } from "react";

const DayHoursLayout = ({
  children,
  slots,
}: {
  children?: React.ReactNode;
  slots?: TimeSlot[];
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const nineAmRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (nineAmRef.current) {
      nineAmRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, []);

  return (
    <Stack
      ref={containerRef}
      width="100%"
      sx={{
        pt: 1,
        pr: 1,
        height: "100%",
        overflowY: "auto",
        overflowX: "hidden",
        position: "relative",
      }}
    >
      {slots?.map((hour, index) => {
        const isNineAm = hour?.label === "9 AM";
        return (
          <Stack
            key={index}
            gap={0}
            flexShrink={0}
            component="div"
            onClick={(event) => {
              const target = event.currentTarget;
              const rect = target.getBoundingClientRect();
              const yPosition = event.clientY - rect.top;
              let hourInt = parseInt(hour?.label?.split(" ")[0], 10);
              if (hour?.label?.split(" ")[1].toLowerCase() === "pm") {
                hourInt += 12;
              }
              let startMinutes = 0;
              if (yPosition < 12) {
                startMinutes = 0;
              } else if (yPosition < 24) {
                startMinutes = 15;
              } else if (yPosition < 36) {
                startMinutes = 30;
              } else if (yPosition < 48) {
                startMinutes = 45;
              }
            }}
            direction="row"
            justifyContent="flex-start"
            alignItems="flex-start"
            width="100%"
            sx={{ userSelect: "none", position: "relative" }}
            ref={isNineAm ? nineAmRef : null}
          >
            <Typography
              variant="body1"
              sx={{
                flexShrink: 0,
                width: 53,
                fontWeight: 600,
                display: "flex",
                fontSize: "10px",
                textAlign: "right",
                alignItems: "center",
                justifyContent: "flex-end",
                mt: index === (slots.length + 1 || 0) - 1 ? 0 : -1,
              }}
            >
              {hour?.label}
            </Typography>
            {index !== (slots.length || 0) - 1 && (
              <Divider orientation="vertical" sx={{ ml: 3, height: "48px" }} />
            )}
            <Divider
              sx={{
                ml: index === (slots?.length - 1 || 0) ? 0.5 : -2.5,
                flexGrow: 1,
              }}
            />
          </Stack>
        );
      })}
      {children}
    </Stack>
  );
};

export default DayHoursLayout;
