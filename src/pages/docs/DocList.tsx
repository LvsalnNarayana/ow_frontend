import {
  Divider,
  Stack,
  Typography,
  Box,
  TextField,
  InputAdornment,
  Chip,
  IconButton,
  Menu,
  MenuItem,
  Fab,
  Tooltip,
  Paper,
  Collapse,
} from "@mui/material";
import {
  Search as SearchIcon,
  FilterList as FilterIcon,
  ViewModule as GridViewIcon,
  ViewList as ListViewIcon,
  Add as AddIcon,
  Sort as SortIcon,
  Clear as ClearIcon,
} from "@mui/icons-material";
import { useState } from "react";
import MiniDoc from "../../docs/components/MiniDoc";

const DocList = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [filterAnchor, setFilterAnchor] = useState<null | HTMLElement>(null);
  const [sortAnchor, setSortAnchor] = useState<null | HTMLElement>(null);
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [selectedSort, setSelectedSort] = useState("recent");

  const filters = [
    { key: "all", label: "All Documents", count: 24 },
    { key: "recent", label: "Recent", count: 8 },
    { key: "shared", label: "Shared with me", count: 5 },
    { key: "starred", label: "Starred", count: 3 },
  ];

  const sortOptions = [
    { key: "recent", label: "Last modified" },
    { key: "name", label: "Name" },
    { key: "created", label: "Created date" },
  ];

  // Mock search results
  const mockDocResults = [
    { id: 1, title: "Project Proposal", type: "document" },
    { id: 2, title: "Marketing Strategy", type: "document" },
    { id: 3, title: "Budget Planning", type: "document" },
  ];

  const mockUserResults = [
    {
      id: 1,
      username: "john_doe",
      sharedDocs: ["Project Proposal", "Team Meeting Notes"],
    },
    { id: 2, username: "sarah_wilson", sharedDocs: ["Marketing Strategy"] },
  ];

  const hasSearchResults = searchQuery.length > 0;
  const showDocResults =
    hasSearchResults &&
    mockDocResults.some((doc) =>
      doc.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
  const showUserResults =
    hasSearchResults &&
    mockUserResults.some((user) =>
      user.username.toLowerCase().includes(searchQuery.toLowerCase())
    );

  const clearSearch = () => {
    setSearchQuery("");
  };

  return (
    <Stack sx={{ width: "100%", height: "100%", px: 1, py: 1 }}>
      {/* Header */}
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        mb={2}
      >
        <Typography variant="h2" fontWeight={600}>
          Documents
        </Typography>

        {/* Controls Group */}
        <Stack direction="row" spacing={1} alignItems="center">
          {/* View Mode Toggle */}
          <Paper
            elevation={0}
            sx={{
              display: "flex",
              border: 1,
              borderColor: "divider",
              borderRadius: 1,
              overflow: "hidden",
            }}
          >
            <Tooltip title="Grid view">
              <IconButton
                onClick={() => setViewMode("grid")}
                sx={{
                  borderRadius: 0,
                  backgroundColor:
                    viewMode === "grid" ? "primary.main" : "transparent",
                  color:
                    viewMode === "grid"
                      ? "primary.contrastText"
                      : "text.primary",
                  "&:hover": {
                    backgroundColor:
                      viewMode === "grid" ? "primary.dark" : "action.hover",
                  },
                }}
              >
                <GridViewIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title="List view">
              <IconButton
                onClick={() => setViewMode("list")}
                sx={{
                  borderRadius: 0,
                  backgroundColor:
                    viewMode === "list" ? "primary.main" : "transparent",
                  color:
                    viewMode === "list"
                      ? "primary.contrastText"
                      : "text.primary",
                  "&:hover": {
                    backgroundColor:
                      viewMode === "list" ? "primary.dark" : "action.hover",
                  },
                }}
              >
                <ListViewIcon />
              </IconButton>
            </Tooltip>
          </Paper>

          {/* Filter and Sort Group */}
          <Paper
            elevation={0}
            sx={{
              display: "flex",
              border: 1,
              borderColor: "divider",
              borderRadius: 1,
              overflow: "hidden",
            }}
          >
            <Tooltip title="Sort">
              <IconButton
                onClick={(e) => setSortAnchor(e.currentTarget)}
                sx={{ borderRadius: 0 }}
              >
                <SortIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title="Filter">
              <IconButton
                onClick={(e) => setFilterAnchor(e.currentTarget)}
                sx={{ borderRadius: 0 }}
              >
                <FilterIcon />
              </IconButton>
            </Tooltip>
          </Paper>
        </Stack>
      </Stack>
      <Divider
        sx={{
          mb: 1,
        }}
      />

      {/* Universal Search */}
      <Stack alignItems="center" mb={3}>
        <TextField
          placeholder="Search documents, people, and shared content..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          size="medium"
          sx={{
            width: "100%",
            maxWidth: 600,
            "& .MuiOutlinedInput-root": {
              borderRadius: 3,
              backgroundColor: "background.paper",
            },
          }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon color="action" />
              </InputAdornment>
            ),
            endAdornment: searchQuery && (
              <InputAdornment position="end">
                <IconButton size="small" onClick={clearSearch}>
                  <ClearIcon />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </Stack>

      {/* Search Results */}
      <Collapse in={hasSearchResults}>
        <Stack spacing={3} mb={3}>
          {/* Document Results */}
          {showDocResults && (
            <Box>
              <Typography
                variant="h6"
                fontWeight={600}
                mb={2}
                color="text.primary"
              >
                Documents
              </Typography>
              <Box
                sx={{
                  display: "grid",
                  gridTemplateColumns:
                    viewMode === "grid"
                      ? "repeat(auto-fill, minmax(220px, 1fr))"
                      : "1fr",
                  gridAutoRows:
                    viewMode === "grid" ? "minmax(280px, auto)" : "auto",
                  gap: viewMode === "grid" ? 3 : 2,
                  p: 2,
                  backgroundColor: "background.paper",
                  borderRadius: 2,
                  border: `1px solid`,
                  borderColor: "divider",
                  mb: 2,
                }}
              >
                {mockDocResults
                  .filter((doc) =>
                    doc.title.toLowerCase().includes(searchQuery.toLowerCase())
                  )
                  .slice(0, 6)
                  .map((_, index) => (
                    <MiniDoc
                      key={`doc-${index}`}
                      viewMode={viewMode}
                      isRecent={index < 2}
                      isShared={index % 3 === 0}
                      isStarred={index % 5 === 0}
                    />
                  ))}
              </Box>
            </Box>
          )}

          {/* User-based Shared Documents */}
          {showUserResults && (
            <Box>
              <Typography
                variant="h6"
                fontWeight={600}
                mb={2}
                color="text.primary"
              >
                Shared by People
              </Typography>
              <Stack spacing={2}>
                {mockUserResults
                  .filter((user) =>
                    user.username
                      .toLowerCase()
                      .includes(searchQuery.toLowerCase())
                  )
                  .map((user) => (
                    <Paper
                      key={user.id}
                      elevation={0}
                      sx={{ p: 2, border: 1, borderColor: "divider" }}
                    >
                      <Typography variant="subtitle1" fontWeight={600} mb={1}>
                        @{user.username}
                      </Typography>
                      <Typography variant="body2" color="text.secondary" mb={2}>
                        {user.sharedDocs.length} shared documents
                      </Typography>
                      <Box
                        sx={{
                          display: "grid",
                          gridTemplateColumns:
                            viewMode === "grid"
                              ? "repeat(auto-fill, minmax(220px, 1fr))"
                              : "1fr",
                          gridAutoRows:
                            viewMode === "grid"
                              ? "minmax(280px, auto)"
                              : "auto",
                          gap: viewMode === "grid" ? 2 : 1,
                        }}
                      >
                        {user.sharedDocs.slice(0, 3).map((_, docIndex) => (
                          <MiniDoc
                            key={`user-${user.id}-doc-${docIndex}`}
                            viewMode={viewMode}
                            isShared={true}
                            isStarred={docIndex === 0}
                          />
                        ))}
                      </Box>
                    </Paper>
                  ))}
              </Stack>
            </Box>
          )}

          <Divider />
        </Stack>
      </Collapse>

      {/* Filter Chips - Only show when not searching */}
      {!hasSearchResults && (
        <Stack
          flexShrink={0}
          direction="row"
          spacing={1}
          mb={2}
          sx={{ overflowX: "auto", pb: 1 }}
        >
          {filters.map((filter) => (
            <Chip
              key={filter.key}
              label={`${filter.label} (${filter.count})`}
              variant={selectedFilter === filter.key ? "filled" : "outlined"}
              color={selectedFilter === filter.key ? "primary" : "default"}
              onClick={() => setSelectedFilter(filter.key)}
              size="small"
            />
          ))}
        </Stack>
      )}

      {!hasSearchResults && <Divider sx={{ mb: 2 }} />}

      {/* Documents Grid/List - Only show when not searching */}
      {!hasSearchResults && (
        <Stack
          flex={1}
          sx={{
            overflowY: "auto",
          }}
        >
          <Stack
            display={"grid"}
            flexShrink={0}
            sx={{
              height: "fit-content",
              gridTemplateColumns: viewMode === "grid" ? "repeat(auto-fill, minmax(250px, 1fr))" : "1fr",
              gap: 4,
              overflowX:"hidden"
            }}
          >
            {Array.from({ length: 11 }).map((_, index) => (
              <MiniDoc
                key={index}
                viewMode={viewMode}
                isRecent={index < 3}
                isShared={index % 4 === 0}
                isStarred={index % 7 === 0}
              />
            ))}
          </Stack>
        </Stack>
      )}

      {/* Sort Menu */}
      <Menu
        anchorEl={sortAnchor}
        open={Boolean(sortAnchor)}
        onClose={() => setSortAnchor(null)}
      >
        {sortOptions.map((option) => (
          <MenuItem
            key={option.key}
            selected={selectedSort === option.key}
            onClick={() => {
              setSelectedSort(option.key);
              setSortAnchor(null);
            }}
          >
            {option.label}
          </MenuItem>
        ))}
      </Menu>

      {/* Filter Menu */}
      <Menu
        anchorEl={filterAnchor}
        open={Boolean(filterAnchor)}
        onClose={() => setFilterAnchor(null)}
      >
        {filters.map((filter) => (
          <MenuItem
            key={filter.key}
            selected={selectedFilter === filter.key}
            onClick={() => {
              setSelectedFilter(filter.key);
              setFilterAnchor(null);
            }}
          >
            {filter.label} ({filter.count})
          </MenuItem>
        ))}
      </Menu>

      {/* Floating Action Button */}
      <Fab
        color="primary"
        sx={{
          position: "fixed",
          bottom: 24,
          right: 24,
        }}
        onClick={() => console.log("Create new document")}
      >
        <AddIcon />
      </Fab>
    </Stack>
  );
};

export default DocList;
