import { styled } from "@mui/material/styles";
import { Zoom, Tooltip, tooltipClasses } from "@mui/material";
import type { JSX, ReactNode } from "react";

const CustomTooltip = styled(
  ({
    open,
    onClose,
    onOpen,
    margin,
    padding,
    title,
    className,
    position = "top",
    children,
    ...props
  }: {
    open?: boolean;
    onClose?: () => void;
    onOpen?: () => void;
    margin?: string | number;
    padding?: string | number;
    title?: string | ReactNode;
    position?: "top" | "bottom" | "left" | "right";
    children: JSX.Element;
    className?: string;
  }) => {
    return (
      <Tooltip
        {...props}
        arrow
        title={title}
        open={open}
        onClose={onClose}
        onOpen={onOpen}
        placement={position}
        TransitionComponent={Zoom}
        classes={{ popper: className }}
        PopperProps={{
          modifiers: [
            {
              name: "flip",
              enabled: true,
            },
            {
              enabled: true,
              name: "preventOverflow",
              options: {
                boundary: "viewport",
              },
            },
          ],
        }}
      >
        {children}
      </Tooltip>
    );
  }
)(({ theme, margin, padding }) => {
  return {
    [`& .${tooltipClasses.tooltip}`]: {
      width: "auto",
      borderRadius: "5px",
      padding: padding || 7,
      color: theme?.palette?.text?.primary,
      backgroundColor: theme?.palette?.background?.paper,
      maxWidth: "100% !important",
      border: `1px solid ${theme?.palette?.divider}`,
      fontSize: theme.typography.pxToRem(12),
      "& .MuiTooltip-arrow:before": {
        color: theme?.palette?.background?.paper,
        border: `1px solid ${theme?.palette?.divider}`,
      },
      "&.MuiTooltip-tooltip": {
        marginTop: margin || "7px",
        marginBottom: margin || "7px",
      },
    },
  };
});

export default CustomTooltip;
