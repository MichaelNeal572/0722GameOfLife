export class GameOfLife {
  nextGeneration(thisGeneration: Node[]): Node[] {
    for (const node of thisGeneration) {
      const countNeighbours = this.neighbourCount(node, thisGeneration);
      if (countNeighbours < 2) {
        thisGeneration = thisGeneration.filter(
          (k) => k.x !== node.x && k.y !== node.y
        );
      }
    }
    return thisGeneration;
  }

  neighbourCount(node: Node, thisGeneration: Node[]): number {
    const result = thisGeneration.filter(
      (generationNode) =>
        Math.abs(generationNode.x - node.x) <= 1 &&
        Math.abs(generationNode.y - node.y) <= 1 &&
        !(generationNode.x === node.x && generationNode.y === node.y)
    ).length;
    console.log(node.x, node.y, "neighbours: ", result);
    return result;
  }
}

export interface Node {
  x: number;
  y: number;
}
