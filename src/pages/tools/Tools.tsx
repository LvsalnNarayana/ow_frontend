// External
import { useState } from "react";


// MUI
import {
  Box,
  Tab,
  Grid,
  Card,
  Chip,
  Tabs,
  Stack,
  Paper,
  Button,
  Avatar,
  useTheme,
  TextField,
  Typography,
  IconButton,
  CardContent,
  CardActions,
  InputAdornment,
} from "@mui/material";
import {
  Code,
  Star,
  Image,
  Search,
  QrCode,
  Launch,
  Palette,
  Compress,
  Security,
  Schedule,
  Language,
  Transform,
  ColorLens,
  VideoFile,
  AudioFile,
  Calculate,
  BugReport,
  FormatSize,
  DataObject,
  Straighten,
  StarBorder,
  Description,
  PictureAsPdf,
  CropOriginal,
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
    { id: "all", count: 45, label: "All Tools" },
    { id: "converters", count: 12, label: "Converters" },
    { id: "image", count: 8, label: "Image Tools" },
    { id: "text", count: 6, label: "Text Tools" },
    { id: "code", count: 9, label: "Code Tools" },
    { id: "design", count: 5, label: "Design Tools" },
    { id: "utilities", count: 5, label: "Utilities" },
  ];

  const tools: Tool[] = [
    // Image Converters & Tools
    {
      id: "png-to-jpg",
      rating: 4.8,
      icon: <Image />,
      usageCount: 1250,
      category: "converters",
      name: "PNG to JPG Converter",
      tags: ["png", "jpg", "image", "convert"],
      description: "Convert PNG images to JPG format with quality control",
    },
    {
      id: "jpg-to-png",
      rating: 4.7,
      icon: <Image />,
      usageCount: 980,
      category: "converters",
      name: "JPG to PNG Converter",
      tags: ["jpg", "png", "image", "convert"],
      description: "Convert JPG images to PNG format with transparency support",
    },
    {
      id: "image-compressor",
      isNew: true,
      rating: 4.9,
      usageCount: 2100,
      category: "image",
      icon: <Compress />,
      name: "Image Compressor",
      tags: ["compress", "optimize", "image", "size"],
      description: "Compress images without losing quality",
    },
    {
      id: "image-resizer",
      rating: 4.6,
      usageCount: 1800,
      category: "image",
      name: "Image Resizer",
      icon: <CropOriginal />,
      tags: ["resize", "dimensions", "image", "scale"],
      description: "Resize images to specific dimensions or percentages",
    },
    {
      id: "background-remover",
      isPro: true,
      rating: 4.8,
      usageCount: 1500,
      category: "image",
      icon: <Transform />,
      name: "Background Remover",
      tags: ["background", "remove", "transparent", "ai"],
      description: "Remove backgrounds from images automatically",
    },

    // Document Converters
    {
      id: "pdf-to-word",
      rating: 4.5,
      usageCount: 3200,
      category: "converters",
      icon: <PictureAsPdf />,
      name: "PDF to Word Converter",
      tags: ["pdf", "word", "doc", "convert"],
      description: "Convert PDF documents to editable Word format",
    },
    {
      id: "word-to-pdf",
      rating: 4.7,
      usageCount: 2800,
      icon: <Description />,
      category: "converters",
      name: "Word to PDF Converter",
      tags: ["word", "pdf", "doc", "convert"],
      description: "Convert Word documents to PDF format",
    },
    {
      id: "excel-to-csv",
      rating: 4.4,
      usageCount: 1100,
      icon: <DataObject />,
      category: "converters",
      name: "Excel to CSV Converter",
      tags: ["excel", "csv", "spreadsheet", "convert"],
      description: "Convert Excel spreadsheets to CSV format",
    },

    // Code Tools
    {
      id: "json-formatter",
      rating: 4.9,
      icon: <Code />,
      category: "code",
      usageCount: 5600,
      name: "JSON Formatter",
      tags: ["json", "format", "validate", "syntax"],
      description: "Format and validate JSON data with syntax highlighting",
    },
    {
      id: "base64-encoder",
      rating: 4.6,
      category: "code",
      usageCount: 2400,
      icon: <Security />,
      name: "Base64 Encoder/Decoder",
      description: "Encode and decode Base64 strings",
      tags: ["base64", "encode", "decode", "security"],
    },
    {
      id: "url-encoder",
      rating: 4.5,
      category: "code",
      usageCount: 1900,
      icon: <Language />,
      name: "URL Encoder/Decoder",
      tags: ["url", "encode", "decode", "web"],
      description: "Encode and decode URLs for web development",
    },
    {
      id: "html-formatter",
      rating: 4.7,
      icon: <Code />,
      category: "code",
      usageCount: 1600,
      name: "HTML Formatter",
      description: "Format and beautify HTML code",
      tags: ["html", "format", "beautify", "code"],
    },
    {
      id: "css-minifier",
      rating: 4.6,
      category: "code",
      usageCount: 1300,
      icon: <Compress />,
      name: "CSS Minifier",
      tags: ["css", "minify", "compress", "optimize"],
      description: "Minify CSS code to reduce file size",
    },
    {
      id: "regex-tester",
      rating: 4.8,
      category: "code",
      usageCount: 2200,
      icon: <BugReport />,
      name: "Regex Tester",
      tags: ["regex", "test", "debug", "pattern"],
      description: "Test and debug regular expressions",
    },

    // Design Tools
    {
      id: "color-picker",
      rating: 4.7,
      usageCount: 3100,
      category: "design",
      icon: <ColorLens />,
      name: "Color Picker",
      tags: ["color", "picker", "palette", "design"],
      description: "Pick colors from images or generate color palettes",
    },
    {
      id: "gradient-generator",
      rating: 4.8,
      usageCount: 2500,
      icon: <Palette />,
      category: "design",
      name: "Gradient Generator",
      tags: ["gradient", "css", "design", "color"],
      description: "Create beautiful CSS gradients",
    },
    {
      id: "font-tester",
      rating: 4.5,
      usageCount: 1400,
      category: "design",
      name: "Font Tester",
      icon: <FormatSize />,
      description: "Test and preview different fonts",
      tags: ["font", "typography", "preview", "design"],
    },

    // Text Tools
    {
      id: "word-counter",
      rating: 4.6,
      category: "text",
      usageCount: 2800,
      icon: <Calculate />,
      name: "Word Counter",
      tags: ["word", "count", "character", "text"],
      description: "Count words, characters, and paragraphs",
    },
    {
      id: "text-case-converter",
      rating: 4.4,
      category: "text",
      usageCount: 1700,
      icon: <Transform />,
      name: "Text Case Converter",
      tags: ["text", "case", "upper", "lower", "title"],
      description: "Convert text to different cases (upper, lower, title)",
    },
    {
      id: "lorem-generator",
      rating: 4.3,
      category: "text",
      usageCount: 1200,
      icon: <Description />,
      name: "Lorem Ipsum Generator",
      tags: ["lorem", "ipsum", "placeholder", "text"],
      description: "Generate placeholder text for designs",
    },

    // Utilities
    {
      id: "qr-generator",
      rating: 4.7,
      icon: <QrCode />,
      usageCount: 3500,
      category: "utilities",
      name: "QR Code Generator",
      tags: ["qr", "code", "generate", "url"],
      description: "Generate QR codes for text, URLs, and more",
    },
    {
      id: "password-generator",
      rating: 4.8,
      usageCount: 4200,
      icon: <Security />,
      category: "utilities",
      name: "Password Generator",
      tags: ["password", "generate", "secure", "random"],
      description: "Generate secure passwords with custom options",
    },
    {
      id: "timestamp-converter",
      rating: 4.5,
      usageCount: 1800,
      icon: <Schedule />,
      category: "utilities",
      name: "Timestamp Converter",
      tags: ["timestamp", "date", "convert", "unix"],
      description: "Convert between timestamps and human-readable dates",
    },
    {
      id: "unit-converter",
      rating: 4.6,
      usageCount: 2100,
      icon: <Straighten />,
      category: "utilities",
      name: "Unit Converter",
      tags: ["unit", "convert", "measurement", "calculator"],
      description: "Convert between different units of measurement",
    },

    // Video & Audio
    {
      id: "video-converter",
      isPro: true,
      rating: 4.7,
      usageCount: 1900,
      icon: <VideoFile />,
      category: "converters",
      name: "Video Converter",
      tags: ["video", "convert", "format", "mp4"],
      description: "Convert videos between different formats",
    },
    {
      id: "audio-converter",
      rating: 4.5,
      usageCount: 1400,
      icon: <AudioFile />,
      category: "converters",
      name: "Audio Converter",
      tags: ["audio", "convert", "format", "mp3"],
      description: "Convert audio files between formats",
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
    _event: React.SyntheticEvent,
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
                <Box sx={{ gap: 1, display: "flex", alignItems: "center" }}>
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
              sm: 6,
              md: 4,
              lg: 3,
              xs: 12,
            }}
          >
            <Card
              sx={{
                height: "100%",
                display: "flex",
                position: "relative",
                transition: "all 0.2s",
                flexDirection: "column",
                "&:hover": {
                  boxShadow: theme.shadows[8],
                  transform: "translateY(-4px)",
                },
              }}
            >
              {/* Tool Status Badges */}
              <Box sx={{ top: 8, right: 8, zIndex: 1, position: "absolute" }}>
                <Stack direction="row" spacing={0.5}>
                  {tool.isNew && (
                    <Chip size="small" label="New" color="success" />
                  )}
                  {tool.isPro && (
                    <Chip size="small" label="Pro" color="warning" />
                  )}
                </Stack>
              </Box>

              <CardContent sx={{ pb: 1, flexGrow: 1 }}>
                {/* Tool Icon & Title */}
                <Box
                  sx={{
                    mb: 2,
                    gap: 2,
                    display: "flex",
                    alignItems: "flex-start",
                  }}
                >
                  <Avatar
                    sx={{
                      width: 48,
                      height: 48,
                      bgcolor: theme.palette.primary.main,
                    }}
                  >
                    {tool.icon}
                  </Avatar>
                  <Box sx={{ minWidth: 0, flex: 1 }}>
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
                        sx={{ height: 20, fontSize: "0.7rem" }}
                      />
                    ))}
                    {tool.tags.length > 3 && (
                      <Chip
                        size="small"
                        label={`+${tool.tags.length - 3}`}
                        variant="outlined"
                        sx={{ height: 20, fontSize: "0.7rem" }}
                      />
                    )}
                  </Stack>
                </Box>

                {/* Stats */}
                <Box
                  sx={{ mb: 1, gap: 2, display: "flex", alignItems: "center" }}
                >
                  {tool.rating && (
                    <Box
                      sx={{ gap: 0.5, display: "flex", alignItems: "center" }}
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
        <Box sx={{ py: 8, textAlign: "center" }}>
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
          p: 3,
          mt: 6,
          borderRadius: 2,
          backgroundColor: theme.palette.background.paper,
        }}
      >
        <Grid container spacing={4} textAlign="center">
          <Grid
            size={{
              sm: 3,
              xs: 12,
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
              sm: 3,
              xs: 12,
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
              sm: 3,
              xs: 12,
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
              sm: 3,
              xs: 12,
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
