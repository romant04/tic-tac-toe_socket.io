import React from "react";
import { Grid, Container, useTheme, Typography } from "@mui/material";
import { isWinner } from "../utils/gameLogic";
import { useState } from "react";

function Game() {
    const theme = useTheme();
    const [yourTurn, setYourTurn] = useState(true);
    const [currentBoard, setCurrentBoard] = useState(
        Array.from(Array(9), () => {
            return "";
        })
    );

    let YOU = "X";

    return (
        <Container
            sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                minHeight: "100vh",
            }}
        >
            <Grid
                display="grid"
                container
                width="50%"
                height="max-content"
                margin="0 auto"
                gridTemplateColumns="repeat(3, 1fr)"
                gridTemplateRows="repeat(3, 1fr)"
            >
                {Array.from(Array(9), (e, i) => {
                    return (
                        <Grid
                            item
                            key={i}
                            id={i}
                            onClick={(e) => {
                                if (yourTurn) {
                                    e.target.children[0].innerText = YOU;
                                    let newBoard = currentBoard;
                                    newBoard[e.target.id] = YOU;
                                    setCurrentBoard(newBoard);
                                    console.log(currentBoard);
                                    console.log(isWinner(currentBoard, YOU));
                                    YOU == "X" ? (YOU = "O") : (YOU = "X");
                                }
                            }}
                            sx={{
                                border: "1px solid black",
                                width: "100%",
                                position: "relative",
                                paddingTop: "100%",
                                cursor: "pointer",
                                transition: "all .2s ease-in",
                                "&:hover": {
                                    backgroundColor: yourTurn ? theme.palette.grey[200] : "",
                                },
                            }}
                        >
                            <Typography
                                variant="h4"
                                sx={{
                                    position: "absolute",
                                    top: "50%",
                                    left: "50%",
                                    transform: "translate(-50%, -50%)",
                                }}
                            ></Typography>
                        </Grid>
                    );
                })}
            </Grid>
        </Container>
    );
}

export default Game;
