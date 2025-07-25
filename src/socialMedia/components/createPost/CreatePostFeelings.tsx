/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable max-lines */

import React, { useState, useEffect } from "react";

import { Stack, TextField, Typography } from "@mui/material";

import { feelings } from "../../../data/feelings";
import type { Feeling } from "../../../types/base/feelings.type";
import { useCreatePostContext } from "../../context/CreatePostContext";

const CreatePostFeelings = () => {
  const {
    actions: { setFeeling, setCreatePostScreen },
  } = useCreatePostContext();
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredFeelings, setFilteredFeelings] = useState<
    {
      feeling: Feeling;
      image: string;
    }[]
  >([]);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value.toLowerCase());
  };

  useEffect(() => {
    setFilteredFeelings(
      feelings?.filter((feelingItem: { feeling: Feeling; image: string }) => {
        return feelingItem?.feeling?.toLowerCase()?.includes(searchTerm);
      })
    );
  }, [feelings, searchTerm]);

  const handleFeelingClick = (feelingItem: {
    feeling: Feeling;
    image: string;
  }) => {
    setFeeling(feelingItem);
    setCreatePostScreen("draft");
  };

  return (
    <Stack
      direction="column"
      justifyContent="fleex-start"
      alignItems="flex-start"
      sx={{ p: 2, width: "100%" }}
    >
      <TextField
        size="small"
        placeholder="Search a feeling"
        value={searchTerm}
        onChange={handleSearchChange}
        sx={{
          width: "100%",
          border: "none",
          outline: "none",
          "& .MuiInputBase-root": {
            fontSize: "14px",
          },
          "& .MuiInputBase-input::placeholder": {
            fontSize: "14px",
          },
          "& .MuiInputBase-root:focus": {
            border: 0,
            outline: "none",
          },
          "& .MuiInputBase-root:focusVisible": {
            border: 0,
            outline: "none",
          },
          "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
            {
              border: 1,
              borderColor: "dodgerblue",
            },
        }}
      />

      <Stack
        direction="row"
        justifyContent="flex-start"
        alignItems="flex-start"
        alignContent="flex-start"
        gap={1}
        flexWrap="wrap"
        sx={{
          p: 1,
          mt: 2,
          width: "100%",
          height: "50vh",
          maxHeight: "50vh",
          overflowY: "auto",
          border: "1px solid #ccc",
        }}
      >
        {filteredFeelings?.map((feeling, index) => {
          return (
            <Stack
              // eslint-disable-next-line react/no-array-index-key
              key={index}
              direction="row"
              component="div"
              justifyContent="flex-start"
              alignItems="center"
              sx={{
                p: 1,
                width: "48%",
                borderRadius: 2,
                cursor: "pointer",
                "&:hover": { backgroundColor: "#00000010" },
              }}
              gap={1}
              onClick={() => {
                return handleFeelingClick(feeling);
              }}
            >
              <img
                alt={feeling?.feeling}
                src={feeling?.image}
                style={{
                  width: "20px",
                  height: "20px",
                  maxWidth: "100%",
                }}
              />
              <Typography variant="body1" sx={{ fontSize: "14px" }}>
                {feeling?.feeling}
              </Typography>
            </Stack>
          );
        })}
      </Stack>
    </Stack>
  );
};

export default CreatePostFeelings;
