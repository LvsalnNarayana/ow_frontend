// import React, { useState, useEffect, useCallback } from "react";
// // import { generatePosts } from "../../scripts/GeneratePost.script";
// import {
//   Stack,
//   Box,
//   Typography,
//   Avatar,
//   IconButton,
//   Dialog,
//   LinearProgress,
//   Fade,
// } from "@mui/material";
// import {
//   Close as CloseIcon,
//   NavigateBefore,
//   NavigateNext,
// } from "@mui/icons-material";
// import type { Story } from "../../types/story/story.types";
// const StoryViewer = ({
//   selectedStory,
//   handleCloseStory,
// }: {
//   selectedStory: Story | null;
//   handleCloseStory: () => void;
// }) => (
//   <Dialog
//     open={!!selectedStory}
//     onClose={handleCloseStory}
//     maxWidth={false}
//     TransitionComponent={Fade} // Add smooth transition
//     TransitionProps={{ timeout: 200 }}
//     PaperProps={{
//       sx: {
//         width: "100vw",
//         height: "100vh",
//         maxWidth: "none",
//         maxHeight: "none",
//         margin: 0,
//         backgroundColor: "black",
//         display: "flex",
//         alignItems: "center",
//         justifyContent: "center",
//       },
//     }}
//   >
//     {selectedStory && (
//       <Box sx={{ position: "relative", width: "100%", height: "100%" }}>
//         {/* Progress bars */}
//         <Box
//           sx={{
//             position: "absolute",
//             top: 20,
//             left: 20,
//             right: 20,
//             zIndex: 10,
//             display: "flex",
//             gap: 1,
//           }}
//         >
//           {stories.map((_, index) => (
//             <LinearProgress
//               key={index}
//               variant="determinate"
//               value={
//                 index < currentStoryIndex
//                   ? 100
//                   : index === currentStoryIndex
//                   ? storyProgress
//                   : 0
//               }
//               sx={{
//                 flex: 1,
//                 height: 3,
//                 borderRadius: 1.5,
//                 backgroundColor: "rgba(255,255,255,0.3)",
//                 "& .MuiLinearProgress-bar": {
//                   backgroundColor: "white",
//                   transition: "width 0.1s linear", // Smooth progress transition
//                 },
//               }}
//             />
//           ))}
//         </Box>

//         {/* Story header */}
//         <Box
//           sx={{
//             position: "absolute",
//             top: 40,
//             left: 20,
//             right: 20,
//             zIndex: 10,
//             display: "flex",
//             alignItems: "center",
//             justifyContent: "space-between",
//             mt: 2,
//           }}
//         >
//           <Stack direction="row" alignItems="center" spacing={2}>
//             <Avatar
//               src={selectedStory.userAvatar}
//               sx={{ width: 40, height: 40 }}
//             />
//             <Stack>
//               <Typography
//                 variant="subtitle2"
//                 sx={{ color: "white", fontWeight: 600 }}
//               >
//                 {selectedStory.userName}
//               </Typography>
//               <Typography
//                 variant="caption"
//                 sx={{ color: "rgba(255,255,255,0.7)" }}
//               >
//                 {new Date(selectedStory.timestamp).toLocaleTimeString([], {
//                   hour: "2-digit",
//                   minute: "2-digit",
//                 })}
//               </Typography>
//             </Stack>
//           </Stack>
//           <IconButton onClick={handleCloseStory} sx={{ color: "white" }}>
//             <CloseIcon />
//           </IconButton>
//         </Box>

//         {/* Story content with transition */}
//         <Box
//           sx={{
//             width: "100%",
//             height: "100%",
//             display: "flex",
//             alignItems: "center",
//             justifyContent: "center",
//             position: "relative",
//             overflow: "hidden",
//           }}
//         >
//           <Box
//             sx={{
//               width: "100%",
//               height: "100%",
//               position: "absolute",
//               opacity: 1,
//               transition: "opacity 02s ease-in-out", // Smooth media transition
//             }}
//             key={selectedStory.id} // Key to trigger transition
//           >
//             {selectedStory.mediaType === "image" ? (
//               <img
//                 src={selectedStory.mediaUrl}
//                 alt="Story"
//                 style={{
//                   width: "100%",
//                   height: "100%",
//                   objectFit: "contain",
//                 }}
//               />
//             ) : (
//               <video
//                 src={selectedStory.mediaUrl}
//                 autoPlay
//                 muted
//                 playsInline
//                 style={{
//                   width: "100%",
//                   height: "100%",
//                   objectFit: "contain",
//                 }}
//               />
//             )}
//           </Box>
//         </Box>

//         {/* Navigation areas */}
//         <Box
//           sx={{
//             position: "absolute",
//             left: 0,
//             top: 0,
//             width: "30%",
//             height: "100%",
//             cursor: "pointer",
//             zIndex: 5,
//           }}
//           onClick={handlePrevStory}
//         />
//         <Box
//           sx={{
//             position: "absolute",
//             right: 0,
//             top: 0,
//             width: "30%",
//             height: "100%",
//             cursor: "pointer",
//             zIndex: 5,
//           }}
//           onClick={handleNextStory}
//         />

//         {/* Navigation buttons */}
//         {currentStoryIndex > 0 && (
//           <IconButton
//             onClick={handlePrevStory}
//             sx={{
//               position: "absolute",
//               left: 20,
//               top: "50%",
//               transform: "translateY(-50%)",
//               color: "white",
//               backgroundColor: "rgba(0,0,0,0.5)",
//               "&:hover": {
//                 backgroundColor: "rgba(0,0,0,0.7)",
//               },
//             }}
//           >
//             <NavigateBefore />
//           </IconButton>
//         )}
//         {currentStoryIndex < stories.length - 1 && (
//           <IconButton
//             onClick={handleNextStory}
//             sx={{
//               position: "absolute",
//               right: 20,
//               top: "50%",
//               transform: "translateY(-50%)",
//               color: "white",
//               backgroundColor: "rgba(0,0,0,0.5)",
//               "&:hover": {
//                 backgroundColor: "rgba(0,0,0,0.7)",
//               },
//             }}
//           >
//             <NavigateNext />
//           </IconButton>
//         )}
//       </Box>
//     )}
//   </Dialog>
// );
