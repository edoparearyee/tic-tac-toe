import { AppPage } from './app.po';

describe('tic-tac-toe App', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
    page.navigateTo();
  });

  it('should place an "X" in the tile', () => {
    page.clickTile(0, 1);
    page.getTileText(0, 1).then((result) => {
      expect(result).toEqual('X');
    });

    page.getCurrentPlayerText().then(result => {
      expect(result).toEqual('Turn: Player 2');
    });
  });

  it('should place an "O" in the tile', () => {
    page.clickTile(0, 1);
    page.clickTile(1, 2);
    page.getTileText(1, 2).then((result) => {
      expect(result).toEqual('O');
    });
    page.getCurrentPlayerText().then(result => {
      expect(result).toEqual('Turn: Player 1');
    });
  });

  it('should NOT replace tile and not change turns', () => {
    page.clickTile(0, 1);
    page.getTileText(0, 1).then((result) => {
      expect(result).toEqual('X');
    });
    page.clickTile(0, 1);
    page.getTileText(0, 1).then((result) => {
      expect(result).toEqual('X');
    });

    page.getCurrentPlayerText().then(result => {
      expect(result).toEqual('Turn: Player 2');
    });
  });

  it('should declare player 1 the winner', () => {
    page.clickTile(0, 0);
    page.clickTile(1, 0);
    page.clickTile(0, 1);
    page.clickTile(1, 1);
    page.clickTile(0, 2);

    page.getWinnerText().then(result => {
      expect(result).toEqual('Player 1 has won!');
    });
  });

  it('should declare player 2 the winner', () => {
    page.clickTile(0, 0);
    page.clickTile(0, 1);
    page.clickTile(0, 2);
    page.clickTile(1, 1);
    page.clickTile(2, 0);
    page.clickTile(2, 1);

    page.getWinnerText().then(result => {
      expect(result).toEqual('Player 2 has won!');
    });
  });

  it('should declare a draw', () => {
    page.clickTile(0, 0);
    page.clickTile(1, 1);
    page.clickTile(0, 2);
    page.clickTile(0, 1);
    page.clickTile(2, 1);
    page.clickTile(1, 0);
    page.clickTile(1, 2);
    page.clickTile(2, 2);
    page.clickTile(2, 0);

    page.getDrawText().then(result => {
      expect(result).toEqual('Match is a draw');
    });
  });

  it('should win if all letters in row is the same', () => {
    page.clickTile(0, 0);
    page.clickTile(1, 0);
    page.clickTile(0, 1);
    page.clickTile(1, 1);
    page.clickTile(0, 2);

    page.getWinnerText().then(result => {
      expect(result).toEqual('Player 1 has won!');
    });
  });

  it('should win if all letters in column is the same', () => {
    page.clickTile(0, 0);
    page.clickTile(0, 1);
    page.clickTile(1, 0);
    page.clickTile(1, 1);
    page.clickTile(2, 0);

    page.getWinnerText().then(result => {
      expect(result).toEqual('Player 1 has won!');
    });
  });

  it('should win if all letters in diagonal line the same', () => {
    page.clickTile(0, 0);
    page.clickTile(0, 1);
    page.clickTile(1, 1);
    page.clickTile(2, 1);
    page.clickTile(2, 2);

    page.getWinnerText().then(result => {
      expect(result).toEqual('Player 1 has won!');
    });

    page.reset();

    page.clickTile(0, 2);
    page.clickTile(0, 1);
    page.clickTile(1, 1);
    page.clickTile(2, 1);
    page.clickTile(2, 0);

    page.getWinnerText().then(result => {
      expect(result).toEqual('Player 1 has won!');
    });
  });

  it('should reset game', () => {
    page.clickTile(0, 0);
    page.clickTile(0, 1);
    page.clickTile(1, 1);
    page.clickTile(2, 1);
    page.clickTile(2, 2);

    page.getWinnerText().then(result => {
      expect(result).toEqual('Player 1 has won!');
    });

    page.reset();

    page.getCurrentPlayerText().then(result => {
      expect(result).toEqual('Turn: Player 1');
    });
  });
});
