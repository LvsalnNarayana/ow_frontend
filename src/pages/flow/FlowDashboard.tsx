// External
import React, { useRef, useState, useCallback } from "react";


// MUI
import ChangeHistoryIcon from "@mui/icons-material/ChangeHistory";
import {
  Box,
  Chip,
  Grid,
  Card,
  Paper,
  Stack,
  Drawer,
  Select,
  Slider,
  Button,
  Dialog,
  Toolbar,
  Divider,
  Tooltip,
  MenuItem,
  Accordion,
  TextField,
  IconButton,
  Typography,
  InputLabel,
  ButtonGroup,
  FormControl,
  DialogTitle,
  CardContent,
  DialogContent,
  DialogActions,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material";
import {
  Undo,
  Redo,
  Star,
  Image,
  Share,
  Circle,
  ZoomIn,
  Upload,
  Schema,
  PanTool,
  ZoomOut,
  Hexagon,
  Timeline,
  CallMade,
  Pentagon, // Substitute for Pentagon
  Rectangle,
  FitScreen,
  TextFields,
  ExpandMore,
  TrendingUp,
  StickyNote2,
  AccountTree,
  BubbleChart,
  ArrowForward,
  FormatAlignLeft,
  FormatAlignRight,
  FormatAlignCenter,
  Timeline as TimelineIcon,
} from "@mui/icons-material";
interface CanvasElement {
  id: string;
  type:
    | "rectangle"
    | "circle"
    | "text"
    | "sticky"
    | "line"
    | "image"
    | "triangle"
    | "hexagon"
    | "star"
    | "arrow";
  x: number;
  y: number;
  width: number;
  height: number;
  content?: string;
  color: string;
  backgroundColor?: string;
  fontSize?: number;
  fontWeight?: string;
  opacity?: number;
  rotation?: number;
  borderWidth?: number;
}

const SIDEBAR_WIDTH = 280;

const FlowDashboard: React.FC = () => {
  const [selectedTool, setSelectedTool] = useState<string>("select");

  const [elements, setElements] = useState<CanvasElement[]>([]);

  const [selectedElement, setSelectedElement] = useState<CanvasElement | null>(
    null
  );

  const [zoomLevel, setZoomLevel] = useState(100);

  const [canvasOffset, setCanvasOffset] = useState({ x: 0, y: 0 });

  const [uploadDialogOpen, setUploadDialogOpen] = useState(false);

  const canvasRef = useRef<HTMLDivElement>(null);

  // Shape categories for left sidebar
  const shapeCategories = [
    {
      title: "Basic Shapes",
      shapes: [
        { id: "rectangle", label: "Rectangle", icon: <Rectangle /> },
        { id: "circle", label: "Circle", icon: <Circle /> },
        { id: "triangle", label: "Triangle", icon: <ChangeHistoryIcon /> },
        { id: "hexagon", label: "Hexagon", icon: <Hexagon /> },
        { id: "star", label: "Star", icon: <Star /> },
      ],
    },
    {
      title: "Arrows & Lines",
      shapes: [
        { id: "line", label: "Line", icon: <Timeline /> },
        { id: "arrow", label: "Arrow", icon: <ArrowForward /> },
        { id: "curved-arrow", icon: <CallMade />, label: "Curved Arrow" },
        { id: "trend-line", label: "Trend Line", icon: <TrendingUp /> },
      ],
    },
    {
      title: "Flowchart",
      shapes: [
        { id: "process", label: "Process", icon: <Rectangle /> },
        { id: "decision", label: "Decision", icon: <Pentagon /> },
        { id: "start-end", icon: <Circle />, label: "Start/End" },
        { id: "connector", label: "Connector", icon: <AccountTree /> },
      ],
    },
    {
      title: "Diagrams",
      shapes: [
        { id: "flowchart", icon: <></>, label: "Flowchart" },
        { id: "org-chart", icon: <Schema />, label: "Org Chart" },
        { id: "mind-map", label: "Mind Map", icon: <BubbleChart /> },
        { id: "timeline", label: "Timeline", icon: <TimelineIcon /> },
      ],
    },
    {
      title: "Text & Media",
      shapes: [
        { id: "text", label: "Text", icon: <TextFields /> },
        { id: "sticky", label: "Sticky Note", icon: <StickyNote2 /> },
        { id: "image", label: "Image", icon: <Image /> },
      ],
    },
  ];

  const colors = [
    "#1976d2",
    "#d32f2f",
    "#388e3c",
    "#f57c00",
    "#7b1fa2",
    "#00796b",
    "#5d4037",
    "#616161",
    "#e91e63",
    "#ff5722",
    "#795548",
    "#607d8b",
  ];

  const handleToolSelect = (toolId: string) => {
    setSelectedTool(toolId);
  };

  const handleZoomIn = () => {
    setZoomLevel((prev) => Math.min(prev + 25, 500));
  };

  const handleZoomOut = () => {
    setZoomLevel((prev) => Math.max(prev - 25, 25));
  };

  const handleFitScreen = () => {
    setZoomLevel(100);
    setCanvasOffset({ x: 0, y: 0 });
  };

  const handleCanvasClick = useCallback(
    (event: React.MouseEvent) => {
      if (selectedTool === "select") return;

      const rect = canvasRef.current?.getBoundingClientRect();
      if (!rect) return;

      const x =
        (event.clientX - rect.left - canvasOffset.x) / (zoomLevel / 100);

      const y = (event.clientY - rect.top - canvasOffset.y) / (zoomLevel / 100);

      const newElement: CanvasElement = {
        borderWidth: 2,
        id: Date.now().toString(),
        width: selectedTool === "text" ? 200 : 100,
        x,
        y,
        opacity: 1,
        rotation: 0,
        fontSize: 14,
        color: "#1976d2",
        fontWeight: "normal",
        type: selectedTool as any,
        height: selectedTool === "text" ? 40 : 100,
        backgroundColor:
          selectedTool === "sticky"
            ? "#fff59d"
            : selectedTool === "text"
            ? "transparent"
            : "#e3f2fd",
        content:
          selectedTool === "text"
            ? "Double click to edit"
            : selectedTool === "sticky"
            ? "Sticky note"
            : undefined,
      };

      setElements((prev) => [...prev, newElement]);
      setSelectedElement(newElement);
    },
    [selectedTool, canvasOffset, zoomLevel]
  );

  const handleElementClick = (element: CanvasElement) => {
    setSelectedElement(element);
  };

  const updateSelectedElement = (updates: Partial<CanvasElement>) => {
    if (!selectedElement) return;

    const updatedElement = { ...selectedElement, ...updates };
    setElements((prev) =>
      prev.map((el) => (el.id === selectedElement.id ? updatedElement : el))
    );
    setSelectedElement(updatedElement);
  };

  const renderCanvasElement = (element: CanvasElement) => {
    const isSelected = selectedElement?.id === element.id;

    const commonStyles = {
      width: element.width,
      top: element.y,
      left: element.x,
      display: "flex",
      cursor: "pointer",
      alignItems: "center",
      height: element.height,
      justifyContent: "center",
      fontSize: element.fontSize,
      transformOrigin: "top left",
      position: "absolute" as const,
      opacity: element.opacity || 1,
      fontWeight: element.fontWeight,
      backgroundColor: element.backgroundColor,
      color: element.type === "text" ? element.color : "#333",
      border: `${element.borderWidth || 2}px solid ${element.color}`,
      padding:
        element.type === "text" || element.type === "sticky" ? "8px" : "0",
      transform: `scale(${zoomLevel / 100}) rotate(${
        element.rotation || 0
      }deg)`,
      borderRadius:
        element.type === "circle"
          ? "50%"
          : element.type === "sticky"
          ? "8px"
          : "4px",
      boxShadow:
        element.type === "sticky"
          ? "0 2px 8px rgba(0,0,0,0.1)"
          : isSelected
          ? "0 0 0 2px #1976d2"
          : "none",
    };

    return (
      <Box
        key={element.id}
        sx={commonStyles}
        onClick={() => handleElementClick(element)}
      >
        {element.content && (
          <Typography
            variant="body2"
            sx={{
              width: "100%",
              textAlign: "center",
              wordBreak: "break-word",
              fontSize: element.fontSize,
              fontWeight: element.fontWeight,
              color: element.type === "text" ? element.color : "#333",
            }}
          >
            {element.content}
          </Typography>
        )}
      </Box>
    );
  };

  return (
    <Box sx={{ gap: 2, height: "100%", display: "flex" }}>
      {/* Left Sidebar - Shapes */}
      <Drawer
        variant="permanent"
        sx={{
          width: SIDEBAR_WIDTH,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: SIDEBAR_WIDTH,
            height: "100%",
            position: "relative",
            boxSizing: "border-box",
          },
        }}
      >
        <Box sx={{ p: 2, borderBottom: 1, borderColor: "divider" }}>
          <Typography variant="h6" sx={{ fontWeight: 600 }}>
            Shapes
          </Typography>
        </Box>

        <Box sx={{ flex: 1, overflow: "auto" }}>
          {shapeCategories.map((category) => (
            <Accordion key={category.title} defaultExpanded>
              <AccordionSummary expandIcon={<ExpandMore />}>
                <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                  {category.title}
                </Typography>
              </AccordionSummary>
              <AccordionDetails sx={{ p: 1 }}>
                <Grid container spacing={1}>
                  {category.shapes.map((shape) => (
                    <Grid
                      size={{
                        xs: 6,
                      }}
                      key={shape.id}
                    >
                      <Card
                        sx={{
                          minHeight: 60,
                          display: "flex",
                          cursor: "pointer",
                          alignItems: "center",
                          justifyContent: "center",
                          "&:hover": {
                            bgcolor: "action.hover",
                          },
                          bgcolor:
                            selectedTool === shape.id
                              ? "primary.light"
                              : "background.paper",
                        }}
                        onClick={() => handleToolSelect(shape.id)}
                      >
                        <CardContent sx={{ p: 1, textAlign: "center" }}>
                          {shape.icon}
                          <Typography
                            variant="caption"
                            display="block"
                            sx={{ mt: 0.5 }}
                          >
                            {shape.label}
                          </Typography>
                        </CardContent>
                      </Card>
                    </Grid>
                  ))}
                </Grid>
              </AccordionDetails>
            </Accordion>
          ))}

          {/* Upload Custom Shapes */}
          <Box sx={{ p: 2 }}>
            <Button
              variant="outlined"
              fullWidth
              startIcon={<Upload />}
              onClick={() => setUploadDialogOpen(true)}
            >
              Upload Custom Shape
            </Button>
          </Box>
        </Box>
      </Drawer>

      {/* Main Content */}
      <Box
        sx={{
          flex: 1,
          display: "flex",
          bgcolor: "#f5f5f5",
          flexDirection: "column",
        }}
      >
        {/* Top Toolbar */}
        <Paper elevation={1} sx={{ zIndex: 10 }}>
          <Toolbar sx={{ gap: 1, minHeight: "48px !important" }}>
            <Typography variant="h6" sx={{ fontWeight: 600, color: "#1976d2" }}>
              DrawBoard
            </Typography>

            <Divider orientation="vertical" flexItem sx={{ mx: 1 }} />

            {/* Basic Tools */}
            <ButtonGroup variant="outlined" size="small">
              <Tooltip title="Select">
                <IconButton
                  onClick={() => handleToolSelect("select")}
                  sx={{
                    color: selectedTool === "select" ? "white" : "#666",
                    bgcolor:
                      selectedTool === "select" ? "#1976d2" : "transparent",
                  }}
                >
                  <PanTool />
                </IconButton>
              </Tooltip>
            </ButtonGroup>

            <Divider orientation="vertical" flexItem sx={{ mx: 1 }} />

            {/* History */}
            <ButtonGroup variant="outlined" size="small">
              <Tooltip title="Undo">
                <IconButton size="small">
                  <Undo />
                </IconButton>
              </Tooltip>
              <Tooltip title="Redo">
                <IconButton size="small">
                  <Redo />
                </IconButton>
              </Tooltip>
            </ButtonGroup>

            <Box sx={{ flexGrow: 1 }} />

            {/* Zoom Controls */}
            <ButtonGroup variant="outlined" size="small">
              <Tooltip title="Zoom Out">
                <IconButton onClick={handleZoomOut}>
                  <ZoomOut />
                </IconButton>
              </Tooltip>
              <Chip
                label={`${zoomLevel}%`}
                size="small"
                variant="outlined"
                sx={{ minWidth: "60px", cursor: "pointer" }}
              />
              <Tooltip title="Zoom In">
                <IconButton onClick={handleZoomIn}>
                  <ZoomIn />
                </IconButton>
              </Tooltip>
              <Tooltip title="Fit Screen">
                <IconButton onClick={handleFitScreen}>
                  <FitScreen />
                </IconButton>
              </Tooltip>
            </ButtonGroup>

            <Divider orientation="vertical" flexItem sx={{ mx: 1 }} />

            <Tooltip title="Share">
              <IconButton
                sx={{
                  color: "white",
                  bgcolor: "#1976d2",
                  "&:hover": { bgcolor: "#1565c0" },
                }}
              >
                <Share />
              </IconButton>
            </Tooltip>
          </Toolbar>
        </Paper>

        {/* Canvas Area */}
        <Box sx={{ flex: 1, overflow: "hidden", position: "relative" }}>
          <Box
            ref={canvasRef}
            onClick={handleCanvasClick}
            sx={{
              width: "100%",
              height: "100%",
              overflow: "hidden",
              position: "relative",
              backgroundSize: "20px 20px",
              cursor: selectedTool === "select" ? "default" : "crosshair",
              backgroundPosition: `${canvasOffset.x}px ${canvasOffset.y}px`,
              backgroundImage: `
                radial-gradient(circle, #ddd 1px, transparent 1px)
              `,
            }}
          >
            {/* Grid overlay */}
            <Box
              sx={{
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                opacity: 0.3,
                position: "absolute",
                pointerEvents: "none",
                backgroundPosition: `${canvasOffset.x}px ${canvasOffset.y}px`,
                backgroundSize: `${20 * (zoomLevel / 100)}px ${
                  20 * (zoomLevel / 100)
                }px`,
                backgroundImage: `
                  linear-gradient(rgba(0,0,0,0.1) 1px, transparent 1px),
                  linear-gradient(90deg, rgba(0,0,0,0.1) 1px, transparent 1px)
                `,
              }}
            />

            {/* Canvas Elements */}
            {elements.map(renderCanvasElement)}
          </Box>
        </Box>
      </Box>

      {/* Right Sidebar - Properties */}
      <Drawer
        variant="permanent"
        anchor="right"
        sx={{
          width: SIDEBAR_WIDTH,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: SIDEBAR_WIDTH,
            height: "100%",
            position: "relative",
            boxSizing: "border-box",
          },
        }}
      >
        <Box sx={{ p: 2, borderBottom: 1, borderColor: "divider" }}>
          <Typography variant="h6" sx={{ fontWeight: 600 }}>
            Properties
          </Typography>
        </Box>

        <Box sx={{ flex: 1, overflow: "auto" }}>
          {selectedElement ? (
            <>
              {/* Arrange Section */}
              <Accordion defaultExpanded>
                <AccordionSummary expandIcon={<ExpandMore />}>
                  <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                    Arrange
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Stack spacing={2}>
                    <Box>
                      <Typography variant="caption" color="text.secondary">
                        Position
                      </Typography>
                      <Stack direction="row" spacing={1}>
                        <TextField
                          size="small"
                          label="X"
                          type="number"
                          value={selectedElement.x}
                          onChange={(e) =>
                            updateSelectedElement({ x: Number(e.target.value) })
                          }
                          sx={{ width: "50%" }}
                        />
                        <TextField
                          size="small"
                          label="Y"
                          type="number"
                          value={selectedElement.y}
                          onChange={(e) =>
                            updateSelectedElement({ y: Number(e.target.value) })
                          }
                          sx={{ width: "50%" }}
                        />
                      </Stack>
                    </Box>

                    <Box>
                      <Typography variant="caption" color="text.secondary">
                        Size
                      </Typography>
                      <Stack direction="row" spacing={1}>
                        <TextField
                          size="small"
                          label="Width"
                          type="number"
                          value={selectedElement.width}
                          onChange={(e) =>
                            updateSelectedElement({
                              width: Number(e.target.value),
                            })
                          }
                          sx={{ width: "50%" }}
                        />
                        <TextField
                          size="small"
                          label="Height"
                          type="number"
                          value={selectedElement.height}
                          onChange={(e) =>
                            updateSelectedElement({
                              height: Number(e.target.value),
                            })
                          }
                          sx={{ width: "50%" }}
                        />
                      </Stack>
                    </Box>

                    <Box>
                      <Typography variant="caption" color="text.secondary">
                        Layer Order
                      </Typography>
                      <ButtonGroup variant="outlined" size="small" fullWidth>
                        <Button>Front</Button>
                        <Button>Back</Button>
                      </ButtonGroup>
                    </Box>

                    <Box>
                      <Typography variant="caption" color="text.secondary">
                        Transform
                      </Typography>
                      <ButtonGroup variant="outlined" size="small" fullWidth>
                        <Button>Flip H</Button>
                        <Button>Flip V</Button>
                      </ButtonGroup>
                    </Box>

                    <Box>
                      <Typography variant="caption" color="text.secondary">
                        Rotation: {selectedElement.rotation || 0}°
                      </Typography>
                      <Slider
                        value={selectedElement.rotation || 0}
                        onChange={(_, value) =>
                          updateSelectedElement({ rotation: value as number })
                        }
                        min={0}
                        max={360}
                        step={15}
                        marks
                        valueLabelDisplay="auto"
                      />
                    </Box>
                  </Stack>
                </AccordionDetails>
              </Accordion>

              {/* Fill & Stroke Section */}
              <Accordion defaultExpanded>
                <AccordionSummary expandIcon={<ExpandMore />}>
                  <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                    Fill & Stroke
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Stack spacing={2}>
                    <Box>
                      <Typography variant="caption" color="text.secondary">
                        Fill Color
                      </Typography>
                      <Box
                        sx={{
                          gridTemplateColumns: "repeat(4, 1fr)",
                          mt: 1,
                          gap: 1,
                          display: "grid",
                        }}
                      >
                        {colors.map((color) => (
                          <Box
                            key={color}
                            onClick={() =>
                              updateSelectedElement({ backgroundColor: color })
                            }
                            sx={{
                              width: 32,
                              height: 32,
                              borderRadius: 1,
                              cursor: "pointer",
                              backgroundColor: color,
                              "&:hover": {
                                transform: "scale(1.1)",
                              },
                              border:
                                selectedElement.backgroundColor === color
                                  ? "2px solid #333"
                                  : "1px solid #ddd",
                            }}
                          />
                        ))}
                      </Box>
                    </Box>

                    <Box>
                      <Typography variant="caption" color="text.secondary">
                        Stroke Color
                      </Typography>
                      <Box
                        sx={{
                          gridTemplateColumns: "repeat(4, 1fr)",
                          mt: 1,
                          gap: 1,
                          display: "grid",
                        }}
                      >
                        {colors.map((color) => (
                          <Box
                            key={color}
                            onClick={() =>
                              updateSelectedElement({ color: color })
                            }
                            sx={{
                              width: 32,
                              height: 32,
                              borderRadius: 1,
                              cursor: "pointer",
                              backgroundColor: color,
                              "&:hover": {
                                transform: "scale(1.1)",
                              },
                              border:
                                selectedElement.color === color
                                  ? "2px solid #333"
                                  : "1px solid #ddd",
                            }}
                          />
                        ))}
                      </Box>
                    </Box>

                    <Box>
                      <Typography variant="caption" color="text.secondary">
                        Stroke Width: {selectedElement.borderWidth || 2}px
                      </Typography>
                      <Slider
                        value={selectedElement.borderWidth || 2}
                        onChange={(_, value) =>
                          updateSelectedElement({
                            borderWidth: value as number,
                          })
                        }
                        min={0}
                        max={10}
                        step={1}
                        marks
                        valueLabelDisplay="auto"
                      />
                    </Box>

                    <Box>
                      <Typography variant="caption" color="text.secondary">
                        Opacity:{" "}
                        {Math.round((selectedElement.opacity || 1) * 100)}%
                      </Typography>
                      <Slider
                        value={selectedElement.opacity || 1}
                        onChange={(_, value) =>
                          updateSelectedElement({ opacity: value as number })
                        }
                        min={0}
                        max={1}
                        step={0.1}
                        valueLabelDisplay="auto"
                        valueLabelFormat={(value) =>
                          `${Math.round(value * 100)}%`
                        }
                      />
                    </Box>
                  </Stack>
                </AccordionDetails>
              </Accordion>

              {/* Text Settings */}
              {(selectedElement.type === "text" ||
                selectedElement.type === "sticky") && (
                <Accordion defaultExpanded>
                  <AccordionSummary expandIcon={<ExpandMore />}>
                    <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                      Text
                    </Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Stack spacing={2}>
                      <TextField
                        size="small"
                        label="Text Content"
                        multiline
                        rows={3}
                        value={selectedElement.content || ""}
                        onChange={(e) =>
                          updateSelectedElement({ content: e.target.value })
                        }
                        fullWidth
                      />

                      <Box>
                        <Typography variant="caption" color="text.secondary">
                          Font Size: {selectedElement.fontSize || 14}px
                        </Typography>
                        <Slider
                          value={selectedElement.fontSize || 14}
                          onChange={(_, value) =>
                            updateSelectedElement({ fontSize: value as number })
                          }
                          min={8}
                          max={72}
                          step={2}
                          marks
                          valueLabelDisplay="auto"
                        />
                      </Box>

                      <FormControl size="small" fullWidth>
                        <InputLabel>Font Weight</InputLabel>
                        <Select
                          value={selectedElement.fontWeight || "normal"}
                          onChange={(e) =>
                            updateSelectedElement({
                              fontWeight: e.target.value,
                            })
                          }
                          label="Font Weight"
                        >
                          <MenuItem value="normal">Normal</MenuItem>
                          <MenuItem value="bold">Bold</MenuItem>
                          <MenuItem value="lighter">Light</MenuItem>
                        </Select>
                      </FormControl>

                      <Box>
                        <Typography variant="caption" color="text.secondary">
                          Text Alignment
                        </Typography>
                        <ButtonGroup variant="outlined" size="small" fullWidth>
                          <Button startIcon={<FormatAlignLeft />}>Left</Button>
                          <Button startIcon={<FormatAlignCenter />}>
                            Center
                          </Button>
                          <Button startIcon={<FormatAlignRight />}>
                            Right
                          </Button>
                        </ButtonGroup>
                      </Box>
                    </Stack>
                  </AccordionDetails>
                </Accordion>
              )}

              {/* Effects Section */}
              <Accordion>
                <AccordionSummary expandIcon={<ExpandMore />}>
                  <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                    Effects
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Stack spacing={2}>
                    <Button variant="outlined" fullWidth>
                      Add Shadow
                    </Button>
                    <Button variant="outlined" fullWidth>
                      Add Glow
                    </Button>
                    <Button variant="outlined" fullWidth>
                      Add Border Radius
                    </Button>
                  </Stack>
                </AccordionDetails>
              </Accordion>
            </>
          ) : (
            <Box sx={{ p: 3, textAlign: "center" }}>
              <Typography variant="body2" color="text.secondary">
                Select an element to edit its properties
              </Typography>
            </Box>
          )}
        </Box>
      </Drawer>

      {/* Upload Dialog */}
      <Dialog
        open={uploadDialogOpen}
        onClose={() => setUploadDialogOpen(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>Upload Custom Shape</DialogTitle>
        <DialogContent>
          <Box
            sx={{
              p: 2,
              mt: 2,
              borderRadius: 2,
              textAlign: "center",
              border: "2px dashed #ccc",
            }}
          >
            <Upload sx={{ mb: 2, fontSize: 48, color: "#ccc" }} />
            <Typography variant="body2" color="text.secondary">
              Drag and drop your image here or click to browse
            </Typography>
            <Typography
              variant="caption"
              color="text.secondary"
              display="block"
              sx={{ mt: 1 }}
            >
              Supported formats: PNG, JPG, SVG
            </Typography>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setUploadDialogOpen(false)}>Cancel</Button>
          <Button variant="contained">Upload</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default FlowDashboard;
