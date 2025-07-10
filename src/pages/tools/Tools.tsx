import React, { useState } from "react";
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  CardActions,
  Button,
  Chip,
  TextField,
  InputAdornment,
  IconButton,
  Tabs,
  Tab,
  Avatar,
  Stack,
  Paper,
  useTheme,
  Tooltip,
} from "@mui/material";
import {
  Search,
  Image,
  PictureAsPdf,
  Description,
  Code,
  Palette,
  Transform,
  QrCode,
  Compress,
  ColorLens,
  FormatSize,
  CropOriginal,
  VideoFile,
  AudioFile,
  DataObject,
  Security,
  Calculate,
  Schedule,
  Language,
  Straighten,
  Tune,
  BugReport,
  CloudUpload,
  Star,
  StarBorder,
  Launch,
} from "@mui/icons-material";

interface Tool {
  id: string;
  name: string;
  description: string;
  category: string;
  icon: React.ReactNode;
  tags: string[];
  isPro?: boolean;
  isNew?: boolean;
  isFavorite?: boolean;
  rating?: number;
  usageCount?: number;
}

const Tools: React.FC = () => {
  const theme = useTheme();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [favorites, setFavorites] = useState<string[]>([]);

  const categories = [
    { id: "all", label: "All Tools", count: 45 },
    { id: "converters", label: "Converters", count: 12 },
    { id: "image", label: "Image Tools", count: 8 },
    { id: "text", label: "Text Tools", count: 6 },
    { id: "code", label: "Code Tools", count: 9 },
    { id: "design", label: "Design Tools", count: 5 },
    { id: "utilities", label: "Utilities", count: 5 },
  ];

  const tools: Tool[] = [
    // Image Converters & Tools
    {
      id: "png-to-jpg",
      name: "PNG to JPG Converter",
      description: "Convert PNG images to JPG format with quality control",
      category: "converters",
      icon: <Image />,
      tags: ["png", "jpg", "image", "convert"],
      rating: 4.8,
      usageCount: 1250,
    },
    {
      id: "jpg-to-png",
      name: "JPG to PNG Converter",
      description: "Convert JPG images to PNG format with transparency support",
      category: "converters",
      icon: <Image />,
      tags: ["jpg", "png", "image", "convert"],
      rating: 4.7,
      usageCount: 980,
    },
    {
      id: "image-compressor",
      name: "Image Compressor",
      description: "Compress images without losing quality",
      category: "image",
      icon: <Compress />,
      tags: ["compress", "optimize", "image", "size"],
      isNew: true,
      rating: 4.9,
      usageCount: 2100,
    },
    {
      id: "image-resizer",
      name: "Image Resizer",
      description: "Resize images to specific dimensions or percentages",
      category: "image",
      icon: <CropOriginal />,
      tags: ["resize", "dimensions", "image", "scale"],
      rating: 4.6,
      usageCount: 1800,
    },
    {
      id: "background-remover",
      name: "Background Remover",
      description: "Remove backgrounds from images automatically",
      category: "image",
      icon: <Transform />,
      tags: ["background", "remove", "transparent", "ai"],
      isPro: true,
      rating: 4.8,
      usageCount: 1500,
    },

    // Document Converters
    {
      id: "pdf-to-word",
      name: "PDF to Word Converter",
      description: "Convert PDF documents to editable Word format",
      category: "converters",
      icon: <PictureAsPdf />,
      tags: ["pdf", "word", "doc", "convert"],
      rating: 4.5,
      usageCount: 3200,
    },
    {
      id: "word-to-pdf",
      name: "Word to PDF Converter",
      description: "Convert Word documents to PDF format",
      category: "converters",
      icon: <Description />,
      tags: ["word", "pdf", "doc", "convert"],
      rating: 4.7,
      usageCount: 2800,
    },
    {
      id: "excel-to-csv",
      name: "Excel to CSV Converter",
      description: "Convert Excel spreadsheets to CSV format",
      category: "converters",
      icon: <DataObject />,
      tags: ["excel", "csv", "spreadsheet", "convert"],
      rating: 4.4,
      usageCount: 1100,
    },

    // Code Tools
    {
      id: "json-formatter",
      name: "JSON Formatter",
      description: "Format and validate JSON data with syntax highlighting",
      category: "code",
      icon: <Code />,
      tags: ["json", "format", "validate", "syntax"],
      rating: 4.9,
      usageCount: 5600,
    },
    {
      id: "base64-encoder",
      name: "Base64 Encoder/Decoder",
      description: "Encode and decode Base64 strings",
      category: "code",
      icon: <Security />,
      tags: ["base64", "encode", "decode", "security"],
      rating: 4.6,
      usageCount: 2400,
    },
    {
      id: "url-encoder",
      name: "URL Encoder/Decoder",
      description: "Encode and decode URLs for web development",
      category: "code",
      icon: <Language />,
      tags: ["url", "encode", "decode", "web"],
      rating: 4.5,
      usageCount: 1900,
    },
    {
      id: "html-formatter",
      name: "HTML Formatter",
      description: "Format and beautify HTML code",
      category: "code",
      icon: <Code />,
      tags: ["html", "format", "beautify", "code"],
      rating: 4.7,
      usageCount: 1600,
    },
    {
      id: "css-minifier",
      name: "CSS Minifier",
      description: "Minify CSS code to reduce file size",
      category: "code",
      icon: <Compress />,
      tags: ["css", "minify", "compress", "optimize"],
      rating: 4.6,
      usageCount: 1300,
    },
    {
      id: "regex-tester",
      name: "Regex Tester",
      description: "Test and debug regular expressions",
      category: "code",
      icon: <BugReport />,
      tags: ["regex", "test", "debug", "pattern"],
      rating: 4.8,
      usageCount: 2200,
    },

    // Design Tools
    {
      id: "color-picker",
      name: "Color Picker",
      description: "Pick colors from images or generate color palettes",
      category: "design",
      icon: <ColorLens />,
      tags: ["color", "picker", "palette", "design"],
      rating: 4.7,
      usageCount: 3100,
    },
    {
      id: "gradient-generator",
      name: "Gradient Generator",
      description: "Create beautiful CSS gradients",
      category: "design",
      icon: <Palette />,
      tags: ["gradient", "css", "design", "color"],
      rating: 4.8,
      usageCount: 2500,
    },
    {
      id: "font-tester",
      name: "Font Tester",
      description: "Test and preview different fonts",
      category: "design",
      icon: <FormatSize />,
      tags: ["font", "typography", "preview", "design"],
      rating: 4.5,
      usageCount: 1400,
    },

    // Text Tools
    {
      id: "word-counter",
      name: "Word Counter",
      description: "Count words, characters, and paragraphs",
      category: "text",
      icon: <Calculate />,
      tags: ["word", "count", "character", "text"],
      rating: 4.6,
      usageCount: 2800,
    },
    {
      id: "text-case-converter",
      name: "Text Case Converter",
      description: "Convert text to different cases (upper, lower, title)",
      category: "text",
      icon: <Transform />,
      tags: ["text", "case", "upper", "lower", "title"],
      rating: 4.4,
      usageCount: 1700,
    },
    {
      id: "lorem-generator",
      name: "Lorem Ipsum Generator",
      description: "Generate placeholder text for designs",
      category: "text",
      icon: <Description />,
      tags: ["lorem", "ipsum", "placeholder", "text"],
      rating: 4.3,
      usageCount: 1200,
    },

    // Utilities
    {
      id: "qr-generator",
      name: "QR Code Generator",
      description: "Generate QR codes for text, URLs, and more",
      category: "utilities",
      icon: <QrCode />,
      tags: ["qr", "code", "generate", "url"],
      rating: 4.7,
      usageCount: 3500,
    },
    {
      id: "password-generator",
      name: "Password Generator",
      description: "Generate secure passwords with custom options",
      category: "utilities",
      icon: <Security />,
      tags: ["password", "generate", "secure", "random"],
      rating: 4.8,
      usageCount: 4200,
    },
    {
      id: "timestamp-converter",
      name: "Timestamp Converter",
      description: "Convert between timestamps and human-readable dates",
      category: "utilities",
      icon: <Schedule />,
      tags: ["timestamp", "date", "convert", "unix"],
      rating: 4.5,
      usageCount: 1800,
    },
    {
      id: "unit-converter",
      name: "Unit Converter",
      description: "Convert between different units of measurement",
      category: "utilities",
      icon: <Straighten />,
      tags: ["unit", "convert", "measurement", "calculator"],
      rating: 4.6,
      usageCount: 2100,
    },

    // Video & Audio
    {
      id: "video-converter",
      name: "Video Converter",
      description: "Convert videos between different formats",
      category: "converters",
      icon: <VideoFile />,
      tags: ["video", "convert", "format", "mp4"],
      isPro: true,
      rating: 4.7,
      usageCount: 1900,
    },
    {
      id: "audio-converter",
      name: "Audio Converter",
      description: "Convert audio files between formats",
      category: "converters",
      icon: <AudioFile />,
      tags: ["audio", "convert", "format", "mp3"],
      rating: 4.5,
      usageCount: 1400,
    },
  ];

  const toggleFavorite = (toolId: string) => {
    setFavorites((prev) =>
      prev.includes(toolId)
        ? prev.filter((id) => id !== toolId)
        : [...prev, toolId]
    );
  };

  const filteredTools = tools.filter((tool) => {
    const matchesSearch =
      tool.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tool.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tool.tags.some((tag) =>
        tag.toLowerCase().includes(searchQuery.toLowerCase())
      );

    const matchesCategory =
      selectedCategory === "all" || tool.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  const handleCategoryChange = (
    event: React.SyntheticEvent,
    newValue: string
  ) => {
    setSelectedCategory(newValue);
  };

  return (
    <Box sx={{ p: 3, minHeight: "100vh" }}>
      {/* Header */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" fontWeight="bold" gutterBottom>
          Developer & Designer Tools
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
          A comprehensive collection of tools and utilities for developers and
          designers
        </Typography>

        {/* Search Bar */}
        <TextField
          fullWidth
          placeholder="Search tools..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Search />
              </InputAdornment>
            ),
          }}
          sx={{
            maxWidth: 600,
          }}
        />
      </Box>

      {/* Category Tabs */}
      <Paper elevation={0} sx={{ mb: 3 }}>
        <Tabs
          value={selectedCategory}
          onChange={handleCategoryChange}
          variant="scrollable"
          scrollButtons="auto"
          sx={{ px: 2 }}
        >
          {categories.map((category) => (
            <Tab
              key={category.id}
              value={category.id}
              label={
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  {category.label}
                  <Chip size="small" label={category.count} />
                </Box>
              }
            />
          ))}
        </Tabs>
      </Paper>

      {/* Tools Grid */}
      <Grid container spacing={3}>
        {filteredTools.map((tool) => (
          <Grid
            key={tool.id}
            size={{
              xs: 12,
              sm: 6,
              md: 4,
              lg: 3,
            }}
          >
            <Card
              sx={{
                height: "100%",
                display: "flex",
                flexDirection: "column",
                transition: "all 0.2s",
                "&:hover": {
                  transform: "translateY(-4px)",
                  boxShadow: theme.shadows[8],
                },
                position: "relative",
              }}
            >
              {/* Tool Status Badges */}
              <Box sx={{ position: "absolute", top: 8, right: 8, zIndex: 1 }}>
                <Stack direction="row" spacing={0.5}>
                  {tool.isNew && (
                    <Chip size="small" label="New" color="success" />
                  )}
                  {tool.isPro && (
                    <Chip size="small" label="Pro" color="warning" />
                  )}
                </Stack>
              </Box>

              <CardContent sx={{ flexGrow: 1, pb: 1 }}>
                {/* Tool Icon & Title */}
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "flex-start",
                    gap: 2,
                    mb: 2,
                  }}
                >
                  <Avatar
                    sx={{
                      bgcolor: theme.palette.primary.main,
                      width: 48,
                      height: 48,
                    }}
                  >
                    {tool.icon}
                  </Avatar>
                  <Box sx={{ flex: 1, minWidth: 0 }}>
                    <Typography variant="h6" fontWeight="bold" noWrap>
                      {tool.name}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{ mt: 0.5 }}
                    >
                      {tool.description}
                    </Typography>
                  </Box>
                </Box>

                {/* Tags */}
                <Box sx={{ mb: 2 }}>
                  <Stack
                    direction="row"
                    spacing={0.5}
                    flexWrap="wrap"
                    useFlexGap
                  >
                    {tool.tags.slice(0, 3).map((tag) => (
                      <Chip
                        key={tag}
                        size="small"
                        label={tag}
                        variant="outlined"
                        sx={{ fontSize: "0.7rem", height: 20 }}
                      />
                    ))}
                    {tool.tags.length > 3 && (
                      <Chip
                        size="small"
                        label={`+${tool.tags.length - 3}`}
                        variant="outlined"
                        sx={{ fontSize: "0.7rem", height: 20 }}
                      />
                    )}
                  </Stack>
                </Box>

                {/* Stats */}
                <Box
                  sx={{ display: "flex", alignItems: "center", gap: 2, mb: 1 }}
                >
                  {tool.rating && (
                    <Box
                      sx={{ display: "flex", alignItems: "center", gap: 0.5 }}
                    >
                      <Star sx={{ fontSize: 16, color: "#ffc107" }} />
                      <Typography variant="caption" color="text.secondary">
                        {tool.rating}
                      </Typography>
                    </Box>
                  )}
                  {tool.usageCount && (
                    <Typography variant="caption" color="text.secondary">
                      {tool.usageCount.toLocaleString()} uses
                    </Typography>
                  )}
                </Box>
              </CardContent>

              <CardActions sx={{ px: 2, pb: 2, pt: 0 }}>
                <Button
                  variant="contained"
                  fullWidth
                  endIcon={<Launch />}
                  sx={{ borderRadius: 2 }}
                >
                  Use Tool
                </Button>
                <IconButton
                  onClick={() => toggleFavorite(tool.id)}
                  sx={{ ml: 1 }}
                >
                  {favorites.includes(tool.id) ? (
                    <Star sx={{ color: "#ffc107" }} />
                  ) : (
                    <StarBorder />
                  )}
                </IconButton>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* No Results */}
      {filteredTools.length === 0 && (
        <Box sx={{ textAlign: "center", py: 8 }}>
          <Typography variant="h6" color="text.secondary" gutterBottom>
            No tools found
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Try adjusting your search or category filter
          </Typography>
        </Box>
      )}

      {/* Stats Footer */}
      <Paper
        elevation={0}
        sx={{
          mt: 6,
          p: 3,
          backgroundColor: theme.palette.background.paper,
          borderRadius: 2,
        }}
      >
        <Grid container spacing={4} textAlign="center">
          <Grid
            size={{
              xs: 12,
              sm: 3,
            }}
          >
            <Typography variant="h4" fontWeight="bold" color="primary">
              {tools.length}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Total Tools
            </Typography>
          </Grid>
          <Grid
            size={{
              xs: 12,
              sm: 3,
            }}
          >
            <Typography variant="h4" fontWeight="bold" color="primary">
              {categories.length - 1}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Categories
            </Typography>
          </Grid>
          <Grid
            size={{
              xs: 12,
              sm: 3,
            }}
          >
            <Typography variant="h4" fontWeight="bold" color="primary">
              {tools
                .reduce((sum, tool) => sum + (tool.usageCount || 0), 0)
                .toLocaleString()}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Total Uses
            </Typography>
          </Grid>
          <Grid
            size={{
              xs: 12,
              sm: 3,
            }}
          >
            <Typography variant="h4" fontWeight="bold" color="primary">
              {tools.filter((tool) => tool.isNew).length}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              New Tools
            </Typography>
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
};

export default Tools;
