import { useEffect, useRef, useState } from 'react';

import { Ball, Button, Container } from './styles';

export function App() {
  const [ballPosition, setBallPosition] = useState({
    x: 0,
    y: 0,
  });
  const [containerMesures, setContainerMesures] = useState({ height: 0, width: 0 })

  const ballRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const ballComputedStyles = ballRef.current?.getBoundingClientRect();
  const ballMesures = {
    height: ballComputedStyles?.height || 0,
    width: ballComputedStyles?.width || 0,
  };

  const isBallTouchingYAxis = containerMesures.width === 0 ? false :
    ballPosition.x >= containerMesures.width / 2 - ballMesures.width - 5 && 
    ballPosition.x < (containerMesures.width / 2) + 5 + 1;
  const isBallTouchingXAxis = containerMesures.height === 0 ? false :
    ballPosition.y >= containerMesures.height / 2 - ballMesures.height - 5 && 
    ballPosition.y < (containerMesures.height / 2) + 5 + 1;

  const isBallInMiddleYAxis = containerMesures.width === 0 ? false :
    ballPosition.x === Math.ceil((containerMesures.width / 2) - (ballMesures.width / 2))
  const isBallInMiddleXAxis = containerMesures.height === 0 ? false :
    ballPosition.y === Math.ceil((containerMesures.height / 2) - (ballMesures.height / 2))
 

  function mouseMove(props: MouseEvent) {
    setBallPosition((oldPositions) => ({
      x: oldPositions.x + props.movementX,
      y: oldPositions.y + props.movementY,
    }));
  }

  function mouseDownBall() {
    document.addEventListener('mousemove', mouseMove);
  }

  function mouseUp() {
    document.removeEventListener('mousemove', mouseMove);
  }

  function handleSetBallInMiddle() {
    setBallPosition({
      x: Math.ceil((containerMesures.width / 2) - (ballMesures.width / 2)),
      y: Math.ceil((containerMesures.height / 2) - (ballMesures.height / 2))
    })
  }

  useEffect(() => {
    ballRef.current?.addEventListener('mousedown', mouseDownBall)
    document.addEventListener('mouseup', mouseUp)

    return () => {
      ballRef.current?.removeEventListener('mousedown', mouseDownBall)
      document.removeEventListener('mouseup', mouseUp)
    }
  }, [])

  useEffect(() => {
    const containerComputedStyles = containerRef.current?.getBoundingClientRect();
    const containerMesures = {
      height: containerComputedStyles?.height || 0,
      width: containerComputedStyles?.width || 0,
    }

    setContainerMesures(containerMesures)
  }, []);

  return (
    <Container 
      ref={containerRef} 
      isBallTouchingYAxis={isBallInMiddleYAxis} 
      isBallTouchingXAxis={isBallInMiddleXAxis}
      style={{ background: isBallInMiddleXAxis && isBallInMiddleYAxis ? 'green' : '#222' }}
    >
      <Ball ref={ballRef} ballPosition={ballPosition} />
      <Button onClick={handleSetBallInMiddle}>centralizar</Button>
    </Container>
  );
}
