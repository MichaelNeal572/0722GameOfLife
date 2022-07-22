import { GameOfLife, Node } from "@/game-of-life";

describe("GameOfLife", () => {
  describe("cells with less than two neighbours", () => {
    it("cell with no neighbours dies", () => {
      //Arrange
      const thisGeneration = [
        [0, 0, 0],
        [0, 1, 0],
        [0, 0, 0],
      ];

      const expectedGeneration = [
        [0, 0, 0],
        [0, 0, 0],
        [0, 0, 0],
      ];

      const sut = createSut();

      //Act
      const result = sut.nextGeneration(makeNodeArray(thisGeneration));

      //Assert
      expect(result).toEqual(
        expect.arrayContaining(makeNodeArray(expectedGeneration))
      );
    });

    for (const thisGeneration of [
      [
        [0, 0, 0],
        [0, 1, 1],
        [0, 0, 0],
      ],
      [
        [0, 0, 1],
        [0, 1, 0],
        [0, 0, 0],
      ],
      [
        [0, 1, 0],
        [0, 1, 0],
        [0, 0, 0],
      ],
      [
        [1, 0, 0],
        [0, 1, 0],
        [0, 0, 0],
      ],
      [
        [0, 0, 0],
        [1, 1, 0],
        [0, 0, 0],
      ],
      [
        [0, 0, 0],
        [0, 1, 0],
        [1, 0, 0],
      ],
      [
        [0, 0, 0],
        [0, 1, 0],
        [0, 1, 0],
      ],
      [
        [0, 0, 0],
        [0, 1, 0],
        [0, 0, 1],
      ],
    ]) {
      it("cell with one neighbour dies", () => {
        //Arrange
        const sut = createSut();

        //Act
        const result = sut.nextGeneration(makeNodeArray(thisGeneration));

        //Assert
        expect(result).toEqual([]);
      });
    }
  });

  describe("Each cell with four or more neighbors dies", () => {});
  describe("Each cell with two or three neighbors survives", () => {});

  describe.skip("cells with three neighbours", () => {
    const testCases = [
      {
        name: "1",
        thisGeneration: [
          [1, 1, 1],
          [0, 0, 0],
          [0, 0, 0],
        ],
        expectedGeneration: [
          [0, 1, 0],
          [0, 1, 0],
          [0, 0, 0],
        ],
      },
      {
        name: "2",
        thisGeneration: [
          [0, 0, 0],
          [1, 1, 1],
          [0, 0, 0],
        ],
        expectedGeneration: [
          [0, 1, 0],
          [0, 1, 0],
          [0, 1, 0],
        ],
      },
      {
        name: "3",
        thisGeneration: [
          [0, 1, 0],
          [0, 1, 0],
          [0, 1, 0],
        ],
        expectedGeneration: [
          [0, 0, 0],
          [1, 1, 1],
          [0, 0, 0],
        ],
      },
    ];
    for (const { name, thisGeneration, expectedGeneration } of testCases) {
      it(`Each empty cell with three neighbors becomes populated ${name}`, () => {
        //Arrange

        const sut = createSut();

        //Act
        const result = sut.nextGeneration(makeNodeArray(thisGeneration));

        //Assert
        expect(result).toEqual(
          expect.arrayContaining(makeNodeArray(expectedGeneration))
        );
      });
    }
  });

  function createSut() {
    return new GameOfLife();
  }

  function makeNodeArray(array: number[][]): Node[] {
    const result = [] as Node[];
    for (let y = 0; y < array.length; y++) {
      for (let x = 0; x < array[0].length; x++) {
        if (array[x][y] === 1) {
          result.push({ x, y });
        }
      }
    }
    return result;
  }
});
