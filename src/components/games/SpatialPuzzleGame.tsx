import React, { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Play, Shapes, RotateCw, CheckCircle, RefreshCw } from 'lucide-react';

interface SpatialPuzzleGameProps {
  onComplete: (score: number) => void;
  onBack: () => void;
}

interface Piece {
  id: number;
  shape: number[][];
  color: string;
  rotation: number;
  placed: boolean;
  x?: number;
  y?: number;
}

const SpatialPuzzleGame: React.FC<SpatialPuzzleGameProps> = ({ onComplete, onBack }) => {
  const [gameState, setGameState] = useState<'menu' | 'playing' | 'complete'>('menu');
  const [difficulty, setDifficulty] = useState<'easy' | 'medium' | 'expert'>('easy');
  const [currentPuzzle, setCurrentPuzzle] = useState(0);
  const [pieces, setPieces] = useState<Piece[]>([]);
  const [grid, setGrid] = useState<number[][]>([]);
  const [draggedPiece, setDraggedPiece] = useState<Piece | null>(null);
  const [score, setScore] = useState(0);
  const [puzzleCompleted, setPuzzleCompleted] = useState(false);
  const gridRef = useRef<HTMLDivElement>(null);

  const puzzleTemplates = {
    easy: {
      gridSize: 6,
      puzzles: [
        {
          name: "Simple Square",
          target: [
            [1, 1, 0, 0, 0, 0],
            [1, 1, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0]
          ],
          pieces: [
            { id: 1, shape: [[1, 1], [1, 1]], color: '#3B82F6' }
          ]
        },
        {
          name: "L-Shape",
          target: [
            [1, 0, 0, 0, 0, 0],
            [1, 0, 0, 0, 0, 0],
            [1, 1, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0]
          ],
          pieces: [
            { id: 1, shape: [[1], [1], [1, 1]], color: '#10B981' }
          ]
        }
      ]
    },
    medium: {
      gridSize: 8,
      puzzles: [
        {
          name: "T-Puzzle",
          target: [
            [0, 1, 1, 1, 0, 0, 0, 0],
            [0, 0, 1, 0, 0, 0, 0, 0],
            [0, 0, 1, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0]
          ],
          pieces: [
            { id: 1, shape: [[1, 1, 1], [0, 1, 0], [0, 1, 0]], color: '#8B5CF6' }
          ]
        },
        {
          name: "Cross Pattern",
          target: [
            [0, 0, 1, 0, 0, 0, 0, 0],
            [0, 1, 1, 1, 0, 0, 0, 0],
            [0, 0, 1, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0]
          ],
          pieces: [
            { id: 1, shape: [[0, 1, 0], [1, 1, 1], [0, 1, 0]], color: '#F59E0B' }
          ]
        }
      ]
    },
    expert: {
      gridSize: 10,
      puzzles: [
        {
          name: "Complex Tetris",
          target: [
            [1, 1, 1, 1, 0, 0, 0, 0, 0, 0],
            [0, 0, 1, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 1, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
          ],
          pieces: [
            { id: 1, shape: [[1, 1, 1, 1]], color: '#EF4444' },
            { id: 2, shape: [[1], [1]], color: '#3B82F6' }
          ]
        }
      ]
    }
  };

  const rotatePiece = (piece: Piece): Piece => {
    const rotated = piece.shape[0].map((_, index) =>
      piece.shape.map(row => row[index]).reverse()
    );
    return {
      ...piece,
      shape: rotated,
      rotation: (piece.rotation + 90) % 360
    };
  };

  const startGame = () => {
    const template = puzzleTemplates[difficulty];
    const puzzle = template.puzzles[0];
    
    const initialPieces = puzzle.pieces.map(p => ({
      ...p,
      rotation: 0,
      placed: false
    }));
    
    setPieces(initialPieces);
    setGrid(Array(template.gridSize).fill(null).map(() => Array(template.gridSize).fill(0)));
    setCurrentPuzzle(0);
    setScore(0);
    setPuzzleCompleted(false);
    setGameState('playing');
  };

  const handlePieceRotate = (pieceId: number) => {
    setPieces(prev => prev.map(piece => 
      piece.id === pieceId ? rotatePiece(piece) : piece
    ));
  };

  const checkPlacement = (piece: Piece, gridX: number, gridY: number): boolean => {
    const template = puzzleTemplates[difficulty];
    const puzzle = template.puzzles[currentPuzzle];
    
    for (let y = 0; y < piece.shape.length; y++) {
      for (let x = 0; x < piece.shape[y].length; x++) {
        if (piece.shape[y][x] === 1) {
          const targetX = gridX + x;
          const targetY = gridY + y;
          
          if (targetX >= template.gridSize || targetY >= template.gridSize ||
              targetX < 0 || targetY < 0) {
            return false;
          }
          
          if (puzzle.target[targetY][targetX] !== 1) {
            return false;
          }
        }
      }
    }
    return true;
  };

  const placePiece = (piece: Piece, gridX: number, gridY: number) => {
    if (!checkPlacement(piece, gridX, gridY)) return;
    
    const newGrid = [...grid];
    for (let y = 0; y < piece.shape.length; y++) {
      for (let x = 0; x < piece.shape[y].length; x++) {
        if (piece.shape[y][x] === 1) {
          newGrid[gridY + y][gridX + x] = piece.id;
        }
      }
    }
    
    setGrid(newGrid);
    setPieces(prev => prev.map(p => 
      p.id === piece.id ? { ...p, placed: true, x: gridX, y: gridY } : p
    ));
    
    checkPuzzleCompletion();
  };

  const checkPuzzleCompletion = () => {
    const template = puzzleTemplates[difficulty];
    const puzzle = template.puzzles[currentPuzzle];
    
    let completed = true;
    for (let y = 0; y < template.gridSize; y++) {
      for (let x = 0; x < template.gridSize; x++) {
        if (puzzle.target[y][x] === 1 && grid[y][x] === 0) {
          completed = false;
          break;
        }
      }
      if (!completed) break;
    }
    
    if (completed) {
      setPuzzleCompleted(true);
      setScore(prev => prev + 1);
      
      setTimeout(() => {
        if (currentPuzzle < puzzleTemplates[difficulty].puzzles.length - 1) {
          nextPuzzle();
        } else {
          finishGame();
        }
      }, 2000);
    }
  };

  const nextPuzzle = () => {
    const nextIndex = currentPuzzle + 1;
    const template = puzzleTemplates[difficulty];
    const puzzle = template.puzzles[nextIndex];
    
    const initialPieces = puzzle.pieces.map(p => ({
      ...p,
      rotation: 0,
      placed: false
    }));
    
    setPieces(initialPieces);
    setGrid(Array(template.gridSize).fill(null).map(() => Array(template.gridSize).fill(0)));
    setCurrentPuzzle(nextIndex);
    setPuzzleCompleted(false);
  };

  const resetPuzzle = () => {
    const template = puzzleTemplates[difficulty];
    const puzzle = template.puzzles[currentPuzzle];
    
    const initialPieces = puzzle.pieces.map(p => ({
      ...p,
      rotation: 0,
      placed: false
    }));
    
    setPieces(initialPieces);
    setGrid(Array(template.gridSize).fill(null).map(() => Array(template.gridSize).fill(0)));
    setPuzzleCompleted(false);
  };

  const finishGame = () => {
    setGameState('complete');
    const maxScore = puzzleTemplates[difficulty].puzzles.length;
    const finalScore = Math.round((score / maxScore) * 100);
    onComplete(finalScore);
  };

  const getDifficultyColor = (diff: string) => {
    switch (diff) {
      case 'easy': return 'bg-green-100 text-green-800 border-green-300';
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-300';
      case 'expert': return 'bg-red-100 text-red-800 border-red-300';
      default: return 'bg-gray-100 text-gray-800 border-gray-300';
    }
  };

  if (gameState === 'menu') {
    return (
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center">
              <Shapes className="w-6 h-6 mr-2 text-primary" />
              Spatial Puzzle Explorer
            </CardTitle>
            <Button variant="outline" onClick={onBack}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="text-center">
            <div className="text-6xl mb-4">🧩</div>
            <p className="text-lg text-muted-foreground mb-6">
              Master spatial reasoning with tangram puzzles! Rotate and place pieces to match target patterns.
            </p>
          </div>

          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Choose Difficulty:</h3>
            <div className="grid grid-cols-1 gap-3">
              {(Object.keys(puzzleTemplates) as Array<keyof typeof puzzleTemplates>).map((diff) => (
                <button
                  key={diff}
                  onClick={() => setDifficulty(diff)}
                  className={`p-4 rounded-lg border-2 transition-all text-left ${
                    difficulty === diff 
                      ? getDifficultyColor(diff) + ' border-current' 
                      : 'border-border hover:border-primary/50 bg-card'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-semibold capitalize">{diff}</div>
                      <div className="text-sm text-muted-foreground">
                        {puzzleTemplates[diff].gridSize}×{puzzleTemplates[diff].gridSize} grid • 
                        {puzzleTemplates[diff].puzzles.length} puzzles • 
                        {diff === 'easy' && ' Basic shapes'}
                        {diff === 'medium' && ' Complex patterns'}
                        {diff === 'expert' && ' Multiple pieces & 3D thinking'}
                      </div>
                    </div>
                    <Badge variant="outline" className={getDifficultyColor(diff)}>
                      {diff}
                    </Badge>
                  </div>
                </button>
              ))}
            </div>
          </div>

          <div className="bg-indigo-50 border border-indigo-200 rounded-lg p-4">
            <div className="flex items-center mb-2">
              <Shapes className="w-5 h-5 text-indigo-600 mr-2" />
              <span className="font-semibold text-indigo-800">Skills You'll Develop:</span>
            </div>
            <ul className="text-sm text-indigo-700 space-y-1">
              <li>• Spatial visualization and mental rotation</li>
              <li>• Pattern recognition and analysis</li>
              <li>• Problem-solving through trial and error</li>
              <li>• Geometric thinking and reasoning</li>
            </ul>
          </div>

          <Button onClick={startGame} className="w-full">
            <Play className="w-4 h-4 mr-2" />
            Start Exploring
          </Button>
        </CardContent>
      </Card>
    );
  }

  if (gameState === 'playing') {
    const template = puzzleTemplates[difficulty];
    const puzzle = template.puzzles[currentPuzzle];

    return (
      <div className="max-w-6xl mx-auto space-y-6">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center">
                <Shapes className="w-6 h-6 mr-2 text-primary" />
                {puzzle.name}
              </CardTitle>
              <div className="flex items-center space-x-4">
                <Badge variant="outline" className={getDifficultyColor(difficulty)}>
                  {currentPuzzle + 1}/{template.puzzles.length}
                </Badge>
                <Button onClick={resetPuzzle} variant="outline" size="sm">
                  <RefreshCw className="w-4 h-4 mr-2" />
                  Reset
                </Button>
              </div>
            </div>
            <Progress value={((currentPuzzle + 1) / template.puzzles.length) * 100} className="mt-2" />
          </CardHeader>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Target Pattern */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Target Pattern</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-1 w-fit mx-auto" style={{gridTemplateColumns: `repeat(${template.gridSize}, 1fr)`}}>
                {puzzle.target.map((row, y) =>
                  row.map((cell, x) => (
                    <div
                      key={`${x}-${y}`}
                      className={`w-6 h-6 border border-gray-300 ${
                        cell === 1 ? 'bg-gray-400' : 'bg-white'
                      }`}
                    />
                  ))
                )}
              </div>
            </CardContent>
          </Card>

          {/* Working Grid */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center">
                Your Solution
                {puzzleCompleted && (
                  <CheckCircle className="w-5 h-5 text-green-600 ml-2" />
                )}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div 
                ref={gridRef}
                className="grid gap-1 w-fit mx-auto mb-4" 
                style={{gridTemplateColumns: `repeat(${template.gridSize}, 1fr)`}}
              >
                {grid.map((row, y) =>
                  row.map((cell, x) => {
                    const piece = pieces.find(p => p.id === cell);
                    return (
                      <div
                        key={`${x}-${y}`}
                        className="w-6 h-6 border border-gray-300 cursor-pointer"
                        style={{
                          backgroundColor: cell > 0 && piece ? piece.color : 'white'
                        }}
                        onClick={() => {
                          if (draggedPiece) {
                            placePiece(draggedPiece, x, y);
                            setDraggedPiece(null);
                          }
                        }}
                      />
                    );
                  })
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Pieces Panel */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Available Pieces</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-4">
              {pieces.filter(p => !p.placed).map((piece) => (
                <div key={piece.id} className="text-center space-y-2">
                  <div 
                    className={`inline-grid gap-1 p-2 border-2 rounded-lg cursor-pointer transition-all ${
                      draggedPiece?.id === piece.id ? 'border-primary bg-primary/10' : 'border-gray-300 hover:border-primary/50'
                    }`}
                    onClick={() => setDraggedPiece(draggedPiece?.id === piece.id ? null : piece)}
                  >
                    {piece.shape.map((row, y) => (
                      <div key={y} className="flex">
                        {row.map((cell, x) => (
                          <div
                            key={`${x}-${y}`}
                            className="w-4 h-4"
                            style={{
                              backgroundColor: cell === 1 ? piece.color : 'transparent'
                            }}
                          />
                        ))}
                      </div>
                    ))}
                  </div>
                  <Button
                    onClick={() => handlePieceRotate(piece.id)}
                    variant="outline"
                    size="sm"
                  >
                    <RotateCw className="w-3 h-3" />
                  </Button>
                </div>
              ))}
            </div>
            {draggedPiece && (
              <p className="text-sm text-muted-foreground mt-4">
                Click on the grid to place the selected piece
              </p>
            )}
          </CardContent>
        </Card>

        {puzzleCompleted && (
          <Card className="bg-green-50 border-green-300">
            <CardContent className="text-center py-6">
              <CheckCircle className="w-12 h-12 text-green-600 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-green-800 mb-2">Puzzle Completed!</h3>
              <p className="text-green-700">
                {currentPuzzle < template.puzzles.length - 1 ? 
                  'Moving to next puzzle...' : 
                  'All puzzles completed!'
                }
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    );
  }

  return null;
};

export default SpatialPuzzleGame;