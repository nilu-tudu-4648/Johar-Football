const players = [
    { 
        name: "Player 1",
        uid: '1',
        score: 10
    },
    {
        name: "Player 2",
        uid: '2',
        score: 20
    },
    {
        name: "Player 3",
        uid: '3',
        score: 30
    },
    {
        name: "Player 4",
        uid: '4',
        score: 60
    },
    {
        name: "Player 5",
        uid: '5',
        score: 60
    },
    
]

const points = {
    captain: 2,
    viceCaptain: 1.5,
    player: 1
}

const user = [
    {name: "User 1", uid: "1"},
    {name: "User 2", uid: "2"},
    {name: "User 3", uid: "3"},
    {name: "User 4", uid: "4"}
]

const leaderboard = [
    { uid: "1", score: 0},
    { uid: "2", score: 0},
    { uid: "3", score: 0},
    { uid: "4", score: 0}
]
const teams = [
    {
        owner: '1',
        players: [
            {type: 'captain', uid: '1'},
            {type: 'player', uid: '2'},
            {type: 'viceCaptain', uid: '3'},
        ],
    },
    {
        owner: '2',
        players: [
            {type: 'captain', uid: '1'},
            {type: 'player', uid: '3'},
            {type: 'viceCaptain', uid: '2'},
        ],
    },
    {
        owner: '3',
        players: [
            {type: 'captain', uid: '2'},
            {type: 'player', uid: '3'},
            {type: 'viceCaptain', uid: '4'},
        ],
    },

]
const tempLeaderBoard = teams.map(team => {
    const tempScores = team.players.map(item => {
        const player = players.find(player => player.uid === item.uid)
        player.score = points[item.type] * player.score
        return player.score
    }).reduce((a, b) => a + b, 0)
    return {
        owner: team.owner,
        score: tempScores
    }
})

console.log(tempLeaderBoard,'tempLeaderBoard')