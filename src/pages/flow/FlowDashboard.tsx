import React, { useState, useRef, useCallback } from "react";
import {
  Box,
  Paper,
  Toolbar,
  IconButton,
  Typography,
  Divider,
  ButtonGroup,
  Tooltip,
  MenuItem,
  Chip,
  Stack,
  Drawer,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  TextField,
  Select,
  FormControl,
  InputLabel,
  Slider,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Grid,
  Card,
  CardContent,
} from "@mui/material";
import {
  PanTool,
  Rectangle,
  Circle,
  Timeline,
  TextFields,
  Image,
  StickyNote2,
  Undo,
  Redo,
  ZoomIn,
  ZoomOut,
  FitScreen,
  Share,
  ExpandMore,
  Upload,
  Star,
  ArrowForward,
  CallMade,
  TrendingUp,
  AccountTree,
  Schema,
  BubbleChart,
  Timeline as TimelineIcon,
  FormatAlignLeft,
  FormatAlignCenter,
  FormatAlignRight,
  Hexagon,
  Pentagon, // Substitute for Pentagon
} from "@mui/icons-material";
import ChangeHistoryIcon from "@mui/icons-material/ChangeHistory";
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
        { id: "rectangle", icon: <Rectangle />, label: "Rectangle" },
        { id: "circle", icon: <Circle />, label: "Circle" },
        { id: "triangle", icon: <ChangeHistoryIcon />, label: "Triangle" },
        { id: "hexagon", icon: <Hexagon />, label: "Hexagon" },
        { id: "star", icon: <Star />, label: "Star" },
      ],
    },
    {
      title: "Arrows & Lines",
      shapes: [
        { id: "line", icon: <Timeline />, label: "Line" },
        { id: "arrow", icon: <ArrowForward />, label: "Arrow" },
        { id: "curved-arrow", icon: <CallMade />, label: "Curved Arrow" },
        { id: "trend-line", icon: <TrendingUp />, label: "Trend Line" },
      ],
    },
    {
      title: "Flowchart",
      shapes: [
        { id: "process", icon: <Rectangle />, label: "Process" },
        { id: "decision", icon: <Pentagon />, label: "Decision" },
        { id: "start-end", icon: <Circle />, label: "Start/End" },
        { id: "connector", icon: <AccountTree />, label: "Connector" },
      ],
    },
    {
      title: "Diagrams",
      shapes: [
        { id: "flowchart", icon: <></>, label: "Flowchart" },
        { id: "org-chart", icon: <Schema />, label: "Org Chart" },
        { id: "mind-map", icon: <BubbleChart />, label: "Mind Map" },
        { id: "timeline", icon: <TimelineIcon />, label: "Timeline" },
      ],
    },
    {
      title: "Text & Media",
      shapes: [
        { id: "text", icon: <TextFields />, label: "Text" },
        { id: "sticky", icon: <StickyNote2 />, label: "Sticky Note" },
        { id: "image", icon: <Image />, label: "Image" },
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
        id: Date.now().toString(),
        type: selectedTool as any,
        x,
        y,
        width: selectedTool === "text" ? 200 : 100,
        height: selectedTool === "text" ? 40 : 100,
        content:
          selectedTool === "text"
            ? "Double click to edit"
            : selectedTool === "sticky"
            ? "Sticky note"
            : undefined,
        color: "#1976d2",
        backgroundColor:
          selectedTool === "sticky"
            ? "#fff59d"
            : selectedTool === "text"
            ? "transparent"
            : "#e3f2fd",
        fontSize: 14,
        fontWeight: "normal",
        opacity: 1,
        rotation: 0,
        borderWidth: 2,
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
      position: "absolute" as const,
      left: element.x,
      top: element.y,
      width: element.width,
      height: element.height,
      cursor: "pointer",
      border: `${element.borderWidth || 2}px solid ${element.color}`,
      borderRadius:
        element.type === "circle"
          ? "50%"
          : element.type === "sticky"
          ? "8px"
          : "4px",
      backgroundColor: element.backgroundColor,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontSize: element.fontSize,
      fontWeight: element.fontWeight,
      color: element.type === "text" ? element.color : "#333",
      padding:
        element.type === "text" || element.type === "sticky" ? "8px" : "0",
      boxShadow:
        element.type === "sticky"
          ? "0 2px 8px rgba(0,0,0,0.1)"
          : isSelected
          ? "0 0 0 2px #1976d2"
          : "none",
      transform: `scale(${zoomLevel / 100}) rotate(${
        element.rotation || 0
      }deg)`,
      transformOrigin: "top left",
      opacity: element.opacity || 1,
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
              fontSize: element.fontSize,
              fontWeight: element.fontWeight,
              color: element.type === "text" ? element.color : "#333",
              textAlign: "center",
              wordBreak: "break-word",
              width: "100%",
            }}
          >
            {element.content}
          </Typography>
        )}
      </Box>
    );
  };

  return (
    <Box sx={{ height: "100%", display: "flex", gap: 2 }}>
      {/* Left Sidebar - Shapes */}
      <Drawer
        variant="permanent"
        sx={{
          width: SIDEBAR_WIDTH,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: SIDEBAR_WIDTH,
            boxSizing: "border-box",
            position: "relative",
            height: "100%",
          },
        }}
      >
        <Box sx={{ p: 2, borderBottom: 1, borderColor: "divider" }}>
          <Typography variant="h6" sx={{ fontWeight: 600 }}>
            Shapes
          </Typography>
        </Box>

        <Box sx={{ overflow: "auto", flex: 1 }}>
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
                          cursor: "pointer",
                          minHeight: 60,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          bgcolor:
                            selectedTool === shape.id
                              ? "primary.light"
                              : "background.paper",
                          "&:hover": {
                            bgcolor: "action.hover",
                          },
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
          flexDirection: "column",
          bgcolor: "#f5f5f5",
        }}
      >
        {/* Top Toolbar */}
        <Paper elevation={1} sx={{ zIndex: 10 }}>
          <Toolbar sx={{ minHeight: "48px !important", gap: 1 }}>
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
                    bgcolor:
                      selectedTool === "select" ? "#1976d2" : "transparent",
                    color: selectedTool === "select" ? "white" : "#666",
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
                sx={{ cursor: "pointer", minWidth: "60px" }}
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
                  bgcolor: "#1976d2",
                  color: "white",
                  "&:hover": { bgcolor: "#1565c0" },
                }}
              >
                <Share />
              </IconButton>
            </Tooltip>
          </Toolbar>
        </Paper>

        {/* Canvas Area */}
        <Box sx={{ flex: 1, position: "relative", overflow: "hidden" }}>
          <Box
            ref={canvasRef}
            onClick={handleCanvasClick}
            sx={{
              width: "100%",
              height: "100%",
              position: "relative",
              cursor: selectedTool === "select" ? "default" : "crosshair",
              backgroundImage: `
                radial-gradient(circle, #ddd 1px, transparent 1px)
              `,
              backgroundSize: "20px 20px",
              backgroundPosition: `${canvasOffset.x}px ${canvasOffset.y}px`,
              overflow: "hidden",
            }}
          >
            {/* Grid overlay */}
            <Box
              sx={{
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundImage: `
                  linear-gradient(rgba(0,0,0,0.1) 1px, transparent 1px),
                  linear-gradient(90deg, rgba(0,0,0,0.1) 1px, transparent 1px)
                `,
                backgroundSize: `${20 * (zoomLevel / 100)}px ${
                  20 * (zoomLevel / 100)
                }px`,
                backgroundPosition: `${canvasOffset.x}px ${canvasOffset.y}px`,
                pointerEvents: "none",
                opacity: 0.3,
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
            boxSizing: "border-box",
            position: "relative",
            height: "100%",
          },
        }}
      >
        <Box sx={{ p: 2, borderBottom: 1, borderColor: "divider" }}>
          <Typography variant="h6" sx={{ fontWeight: 600 }}>
            Properties
          </Typography>
        </Box>

        <Box sx={{ overflow: "auto", flex: 1 }}>
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
                          display: "grid",
                          gridTemplateColumns: "repeat(4, 1fr)",
                          gap: 1,
                          mt: 1,
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
                              backgroundColor: color,
                              borderRadius: 1,
                              cursor: "pointer",
                              border:
                                selectedElement.backgroundColor === color
                                  ? "2px solid #333"
                                  : "1px solid #ddd",
                              "&:hover": {
                                transform: "scale(1.1)",
                              },
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
                          display: "grid",
                          gridTemplateColumns: "repeat(4, 1fr)",
                          gap: 1,
                          mt: 1,
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
                              backgroundColor: color,
                              borderRadius: 1,
                              cursor: "pointer",
                              border:
                                selectedElement.color === color
                                  ? "2px solid #333"
                                  : "1px solid #ddd",
                              "&:hover": {
                                transform: "scale(1.1)",
                              },
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
              textAlign: "center",
              border: "2px dashed #ccc",
              borderRadius: 2,
              mt: 2,
            }}
          >
            <Upload sx={{ fontSize: 48, color: "#ccc", mb: 2 }} />
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
