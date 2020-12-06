const GetCurrentChar = (count) => {
    if (count % 2 === 0) {
        return 'X';
    }
    return 'O';
}

export default GetCurrentChar