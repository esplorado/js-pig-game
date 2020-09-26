/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLOBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game
*/

var player_score, dice_score, current_active_player, game_state;

gameInitializer();

document.querySelector('.btn-roll').addEventListener('click', function() {

    if (game_state) {
        var dice_random_number = Math.floor(Math.random() * 6) + 1;
        // Show dice image as per dice random number
        var dice_image = document.querySelector('.dice');
        dice_image.style.display = 'block';
        dice_image.src = 'dice-' + dice_random_number + '.png';

        /*
        Check for dice random number, if it is greater than 1 then continue game with current player 
        if it is 1 then set current active players dice score to 0 and change the current player.
        */
        if (dice_random_number > 1) {

            dice_score += dice_random_number; // Add in current dice score 
            // Set active players' current score as dice score 
            document.querySelector('#current-' + current_active_player).textContent = dice_score;
        } else {
            playerChanger();
        }
    }

});

// New game 
document.querySelector('.btn-new').addEventListener('click', gameInitializer);

// Hold game, add current player's dice score in players score 

document.querySelector('.btn-hold').addEventListener('click', function() {

    if (game_state) {
        player_score[current_active_player] += dice_score;
        document.querySelector('#score-' + current_active_player).textContent = player_score[current_active_player];
    }

    if (player_score[current_active_player] >= 20) {
        document.querySelector('#name-' + current_active_player).textContent = 'Winner';
        game_state = false; // Set game status false once winner is declared.
    } else {
        playerChanger();
    }
});

function playerChanger() {

    dice_score = 0;
    document.querySelector('#current-' + current_active_player).textContent = dice_score;
    document.querySelector('.player-' + current_active_player + '-panel').classList.remove('active');

    current_active_player = current_active_player === 0 ? 1 : 0;

    document.querySelector('.player-' + current_active_player + '-panel').classList.add('active');
}

function gameInitializer() {

    player_score = [0, 0]; // Set players score to default 0 
    dice_score = 0; // Set dice score to 0
    current_active_player = 0; // Initially set active player as first player
    game_state = true;

    // Set both players total score to 0 
    document.getElementById('score-0').textContent = player_score[0];
    document.getElementById('score-1').textContent = player_score[1];

    // Set both players current dice score to 0 
    document.getElementById('current-0').textContent = dice_score;
    document.getElementById('current-1').textContent = dice_score;

    // Hide the dice 
    document.querySelector('.dice').style.display = 'none';

    document.querySelector('#name-0').textContent = 'Player 1';
    document.querySelector('#name-1').textContent = 'Player 2';
    // Make the first player as an active player 
    document.querySelector('.player-1-panel').classList.remove('active');
    document.querySelector('.player-0-panel').classList.add('active');

}