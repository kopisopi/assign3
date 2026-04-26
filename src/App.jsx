import * as React from 'react'
import * as ReactBootstrap from 'react-bootstrap'
import { useState } from 'react'

const { Badge, Button, Card } = ReactBootstrap

// //CHORUS-LAPILLI

function Square({value, onSquareClick})
{
  return( 

  <button 
  className="square" 
  onClick={onSquareClick}
>
  {value}
</button>
)
}

function isAdjacent(i, j) {
  if (i === 0) return j === 1 || j === 3 || j === 4;
  if (i === 1) return j === 0 || j === 2 || j === 3 || j === 4 || j === 5;
  if (i === 2) return j === 1 || j === 4 || j === 5;
  if (i === 3) return j === 0 || j === 1 || j === 4 || j === 6 || j === 7;
  if (i === 4) return true; // Center is adjacent to everything
  if (i === 5) return j === 1 || j === 2 || j === 4 || j === 7 || j === 8;
  if (i === 6) return j === 3 || j === 4 || j === 7;
  if (i === 7) return j === 3 || j === 4 || j === 5 || j === 6 || j === 8;
  if (i === 8) return j === 4 || j === 5 || j === 7;
  return false;
}

export default function Board()
{
  const [xIsNext, setXIsNext] = useState(true);
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [xCount, setXCount] = useState(0);
  const [oCount, setOCount] = useState(0);
  const [selectedSquare, setSelectedSquare] = useState(null); // Added for movement

  function handleClick(i)
  {
    const currentPlayer = xIsNext ? "X" : "O";

   
    if (calculateWinner(squares)) return;

    const nextSquares = squares.slice();


    if (xCount < 3 || oCount < 3) {
      if (squares[i]) return;

      if (xIsNext && xCount < 3) {
        nextSquares[i] = "X";
        setXCount(xCount + 1);
      } else if (!xIsNext && oCount < 3) {
        nextSquares[i] = "O";
        setOCount(oCount + 1);
      }
      
      setSquares(nextSquares);
      setXIsNext(!xIsNext);
    } 

    else {

      if (selectedSquare === null) {
        if (squares[i] === currentPlayer) {
          setSelectedSquare(i);
        }
        return;
      }


      if (selectedSquare === i) {
        setSelectedSquare(null);
        return;
      }

      if (!squares[i] && isAdjacent(selectedSquare, i)) {
        
  
        const holdsCenter = squares[4] === currentPlayer;
        const isVacatingCenter = selectedSquare === 4;
        

        const testSquares = nextSquares.slice();
        testSquares[i] = currentPlayer;
        testSquares[selectedSquare] = null;
        const moveWins = calculateWinner(testSquares);


        if (holdsCenter && !isVacatingCenter && !moveWins) {
          return; 
        }


        nextSquares[i] = currentPlayer;
        nextSquares[selectedSquare] = null;
        
        setSquares(nextSquares);
        setSelectedSquare(null);
        setXIsNext(!xIsNext);
      }
    }
  }

  const winner = calculateWinner(squares);
  let status = winner ? "Winner: " + winner : "Next player: " + (xIsNext ? "X" : "O");
 
  return(
    <>
    <div className="status">{status}</div>
    {/*   

    <div className="X count">X count: {xCount}</div>
    <div className="O count">O count: {oCount}</div> 
    
    internal counter to check if updating the count
    
    */}
    <div className="board-row">
       <Square value={squares[0]} onSquareClick={() =>handleClick(0)}/>
       <Square value={squares[1]} onSquareClick={() =>handleClick(1)}/>
       <Square value={squares[2]} onSquareClick={() =>handleClick(2)}/>
    </div>
    <div className="board-row">
        <Square value={squares[3]} onSquareClick={() =>handleClick(3)}/>
        <Square value={squares[4]}onSquareClick={() =>handleClick(4)}/>
        <Square value={squares[5]}  onSquareClick={() =>handleClick(5)}/>
    </div>
    <div className="board-row">
        <Square value={squares[6]}  onSquareClick={() =>handleClick(6)}/>
        <Square value={squares[7]}  onSquareClick={() =>handleClick(7)}/>
        <Square value={squares[8]} onSquareClick={() =>handleClick(8)}/>
    </div>
    </>
);
}

function calculateWinner(squares)
{
  const lines = [
    [0,1,2], [3,4,5], [6,7,8],
    [0,3,6], [1,4,7], [2,5,8],
    [0,4,8], [2,4,6],
  ];
  for (let i=0; i<lines.length; i++)
  {
    const [a,b,c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a]===squares[c])
    {
        return squares[a];
    }
  }
  return null;
}
// function Square({value, onSquareClick})
// {
//   return( 
//   <button className="square" onClick={onSquareClick}>
    
//     {value}
    
//   </button>
// )
// }
// function isAdjacent(i, j) {
//   if (i === 0)
//       return j === 1 || j === 3 || j === 4;
//   else if (i === 1)
//       return j === 0 || j === 2 || j === 4 || j === 3 || j === 5;
//   else if (i === 2)
//       return j === 1 || j === 4 || j === 5;
//   else if (i === 3)
//       return j === 0 || j === 1 || j === 4 || j === 6 || j === 7;
//   else if (i === 4) 
//       return true;
//   else if (i === 5)
//       return j === 1 || j === 2 || j === 4 || j === 7 || j === 8;
//   else if (i === 6)
//       return j === 3 || j === 4 || j === 7;
//   else if (i === 7)
//       return j === 3 || j === 4 || j === 5 || j === 6 || j === 8;
//   else if (i === 8)
//       return j === 4 || j === 5 || j === 7;
// }

// export default function Board()
// {
//   const [xIsNext, setXIsNext] = useState(true);
//   const [squares, setSquares] = useState(Array(9).fill(null));
//   const [xCount, setXCount] = useState(0);
//   const [oCount, setOCount] = useState(0);

//   function handleClick(i)
//   {
//     if (squares[i] ||calculateWinner(squares))
//     {
//       return;
//     }
//     const nextSquares = squares.slice(); //create shallow copy of array
//     if (xIsNext && xCount < 3)
//     {
//       nextSquares[i] = "X";
//       setXCount(xCount+1);

//     } else if (oCount<3) {
//       nextSquares[i] = "O";
//       setOCount(oCount+1);
      
//     }
//     else //update 
//     {
//       const nextMoves = [
//        /*
//        if:
//           0: 1, 3
//           1: 0,2,3,4,5
//           2: 1, 4, 5
//           3: 0,1,4,6,7
//           4: 0,1,2,3,5,6,7,8
//           5: 
//        */
       
//       ];
//       if (xIsNext && square[i] == "X")
//       {
//         isAdjecent(); 
//       }
//       f (!xIsNext && square[i] == "O")
//       {
        
//       }
//       //if X is next turn and the square that it clicks is already X, remove and change squares to be ones near it
//       /* if (xIsNext && is)
//       {
//           //calculate where you can move it to
//       }
//       */
//       return;
//     }
//     setSquares(nextSquares); //tell react to update
//     setXIsNext(!xIsNext);
//   }
 

//   const winner = calculateWinner(squares);
//   let status;
//   if (winner)
//   {
//     status = "Winner: " + winner;

//   } else {
//     status = "Next player: " + (xIsNext ? "X" : "O");
//   }
 
//   return( //<- parantheses MUST be on same line as return
//     <>
//     <div className="status">{status}</div>
//     <div className="X count">X count:{xCount}</div>
//     <div className="X count">O count: {oCount}</div>
//     <div className="board-row">
//        <Square value={squares[0]} onSquareClick={() =>handleClick(0)}/>
//        <Square value={squares[1]} onSquareClick={() =>handleClick(1)}/>
//        <Square value={squares[2]} onSquareClick={() =>handleClick(2)}/>
//     </div>
//     <div className="board-row">
//         <Square value={squares[3]} onSquareClick={() =>handleClick(3)}/>
//         <Square value={squares[4]} onSquareClick={() =>handleClick(4)}/>
//         <Square value={squares[5]} onSquareClick={() =>handleClick(5)}/>
//     </div>
//     <div className="board-row">
//         <Square value={squares[6]} onSquareClick={() =>handleClick(6)}/>
//         <Square value={squares[7]} onSquareClick={() =>handleClick(7)}/>
//         <Square value={squares[8]} onSquareClick={() =>handleClick(8)}/>
//     </div>
//     </>
// );
// }

// function calculateWinner(squares)
// {
//   const lines = [
//     [0,1,2],
//     [3,4,5],
//     [6,7,8],
//     [0,3,6],
//     [1,4,7],
//     [2,5,8],
//     [0,4,8],
//     [2,4,6],
//   ];
//   for (let i=0; i<lines.length; i++)
//   {
//     const [a,b,c] = lines[i];
//     if (squares[a] && squares[a] === squares[b] && squares[a]===squares[c])
//     {
//         return squares[a];
//     }
//   }
//   return null;
// }


//***
/* TIC-TAC-TOE
function Square({value, onSquareClick})
{
  return( 
  <button className="square" onClick={onSquareClick}>
    
    {value}
    
  </button>

)
}


export default function Board()
{
  const [xIsNext, setXIsNext] = useState(true);
  const [squares, setSquares] = useState(Array(9).fill(null));
  function handleClick(i)
  {
    if (squares[i] ||calculateWinner(squares))
    {
      return;
    }
    const nextSquares = squares.slice();
    if (xIsNext)
    {
      nextSquares[i] = "X";
    } else {
      nextSquares[i] = "O";
    }
    setSquares(nextSquares);
    setXIsNext(!xIsNext);
  }
 
  const winner = calculateWinner(squares);
  let status;
  if (winner)
  {
    status = "Winner: " + winner;

  } else {
    status = "Next player: " + (xIsNext ? "X" : "O");
  }
 
  return( //<- parantheses MUST be on same line as return
    <>
    <div className="status">{status}</div>
    <div className="board-row">
       <Square value={squares[0]} onSquareClick={() =>handleClick(0)}/>
       <Square value={squares[1]} onSquareClick={() =>handleClick(1)}/>
       <Square value={squares[2]} onSquareClick={() =>handleClick(2)}/>
    </div>
    <div className="board-row">
        <Square value={squares[3]} onSquareClick={() =>handleClick(3)}/>
        <Square value={squares[4]} onSquareClick={() =>handleClick(4)}/>
        <Square value={squares[5]} onSquareClick={() =>handleClick(5)}/>
    </div>
    <div className="board-row">
        <Square value={squares[6]} onSquareClick={() =>handleClick(6)}/>
        <Square value={squares[7]} onSquareClick={() =>handleClick(7)}/>
        <Square value={squares[8]} onSquareClick={() =>handleClick(8)}/>
    </div>
    </>
);
}

function calculateWinner(squares)
{
  const lines = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6],
  ];
  for (let i=0; i<lines.length; i++)
  {
    const [a,b,c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a]===squares[c])
    {
        return squares[a];
    }
  }
  return null;
}

*/


// export default function App() {
//   const [name, setName] = React.useState('World')

//   return (
//     <div className="container py-4">
//       <Card className="starter-card shadow-sm">
//         <Card.Body className="p-4">
//           <h1 className="greeting display-6 fw-bold">Hello, {name}!</h1>
//           <p className="mb-3 text-secondary">
//             This starter is set up to match the React Essentials notes more closely.
//             For the assignment, build the tic-tac-toe tutorial in this file and leave
//             mounting to <code>src/main.jsx</code>.
//           </p>
//           <div className="d-flex gap-2 flex-wrap align-items-center">
//             <Button variant="primary" onClick={() => setName('CS 35L')}>
//               Set example name
//             </Button>
//             <Badge bg="secondary" pill>
//               ReactBootstrap ready
//             </Badge>
//           </div>
//         </Card.Body>
//       </Card>
//     </div>
//   )
// }
