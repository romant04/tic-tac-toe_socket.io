export function isWinner(board, player) {
    // Check rows
    if (board[0] === player && board[1] === player && board[2] === player) return true;
    if (board[3] === player && board[4] === player && board[5] === player) return true;
    if (board[6] === player && board[7] === player && board[8] === player) return true;

    // Check columns
    if (board[0] === player && board[3] === player && board[6] === player) return true;
    if (board[1] === player && board[4] === player && board[7] === player) return true;
    if (board[2] === player && board[5] === player && board[8] === player) return true;

    // Check diagonals
    if (board[0] === player && board[4] === player && board[8] === player) return true;
    if (board[2] === player && board[4] === player && board[6] === player) return true;

    // Check draw
    if (
        board[0] !== "" &&
        board[1] !== "" &&
        board[2] !== "" &&
        board[3] !== "" &&
        board[4] !== "" &&
        board[5] !== "" &&
        board[6] !== "" &&
        board[7] !== "" &&
        board[8] !== ""
    )
        return "draw";

    return false;
}
