let divElement = document.querySelector('div');
let tableElement = document.querySelector('table');

let Game = {
    start(){
        this.field = [
            ['','',''],
            ['','',''],
            ['','',''],
        ];

        this.currentPlayer = "X";
        this.isFinished = false;
        this.round = 0;
        this.render();
    },
    nextPlayer(){
        this.currentPlayer = this.currentPlayer === 'X' ? 'O' : 'X';
    },
    setField(line, column){
        if(!this.isFinished && this.field[line][column] === ''){
            this.field[line][column] = this.currentPlayer;
            this.nextPlayer();
            this.round++;
            this.render();
        };
    },
    isGameOver(){
        let field = this.field,
            rows = 3;
            column = 3,
            totalRow = 0,
            totalCol = 0;
        for(let i = 0; i < rows; i++){
            totalRow = 0;
            totalCol = 0;
            for(let j = 0; j < column; j++){
                if(field[i][j] === 'X'){
                    totalRow++;
                }
                if(field[i][j] === 'O'){
                    totalRow--;
                }
                if(field[j][i] === 'X'){
                    totalCol++;
                }
                if(field[j][i] === 'O'){
                    totalCol--;
                }
            }
            if(totalRow === 3 || totalCol === 3){
                return 'X';
            } 
            
            if(totalRow === -3 || totalCol === -3){
                return 'O';
            }

        }
        if(field[0][0] !== '' && field[0][0] ===  field[1][1] && field[1][1] === field[2][2]){
            return field[0][0];
        }
        if(field[0][2] !== '' && field[0][2] ===  field[1][1] && field[1][1] === field[2][0]){
            return field[0][2];
        }
        if(this.round === 9){
            return 'Nobody';
        }
    },
    render(){
        let winner = this.isGameOver();
        divElement.textContent = winner ? `Winner: ${winner}` : `Current Player: ${this.currentPlayer}`;

        if(winner){
            this.isFinished = true;
        }

        let template = '';
        this.field.forEach((line, lineIndex) => {
            template += '<tr>'
            line.forEach((column, columnIndex) =>{
                template += `<td onclick="Game.setField(${lineIndex},${columnIndex})" >${column}</td>`;
            });
            template += '</tr>'
        });

        tableElement.innerHTML = template;
    }
};

Game.start();