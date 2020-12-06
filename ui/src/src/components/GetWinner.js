const GetWinner = (storeChar) => {
    for (let i = 0; i < 3; i++) {
        let s = ""
        const winnerL = []
        for (let j = i; j < 9; j = j + 3) {
            s = s + storeChar[j];
            winnerL.push(j + 1);
        }
        if (s === 'XXX' || s === 'OOO') {
            return winnerL
        }
        s = ""
        const winnerH = []
        for (let j = 3 * i; j < (i + 1) * 3; j = j + 1) {
            s = s + storeChar[j];
            winnerH.push(j + 1);
        }
        if (s === 'XXX' || s === 'OOO') {
            return winnerH
        }
    }
    let s = ""
    const winnerD1 = []
    for (let i = 0; i < 9; i = i + 4) {
        s = s + storeChar[i]
        winnerD1.push(i + 1)
    }
    if (s === 'XXX' || s === 'OOO') {
        return winnerD1
    }
    s = ""
    const winnerD2 = []
    for (let i = 2; i < 8; i = i + 2) {
        s = s + storeChar[i]
        winnerD2.push(i + 1)
    }
    if (s === 'XXX' || s === 'OOO') {
        return winnerD2
    }
    return []
}

export default GetWinner