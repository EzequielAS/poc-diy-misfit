import styled from 'styled-components';

interface ContainerProps {
  isBallTouchingYAxis: boolean;
  isBallTouchingXAxis: boolean;
}

interface BallProps {
  ballPosition: {
    x: number;
    y: number;
  };
}

export const Container = styled.div<ContainerProps>`
  height: 100vh;
  background: #222222;
  position: fixed;
  top: 0;
  right: 0;
  left: 0;

  :before, :after {
    content: '';
    background: #fff;
    position: absolute;
    transition: opacity 0.3s;
  }

  :before {
    height: 100%;
    width: 10px;
    left: 50%;
    transform: translateX(-50%);
    opacity: ${(props) => (props.isBallTouchingYAxis ? 1 : 0)};
  }

  :after {
    height: 10px;
    width: 100%;
    top: 50%;
    transform: translateY(-50%);
    opacity: ${(props) => (props.isBallTouchingXAxis ? 1 : 0)};
  }
`;

export const Ball = styled.div<BallProps>`
  height: 100px;
  width: 100px;
  background: #f7f7f7;
  border-radius: 50%;
  z-index: 9;

  position: absolute;
  top: ${(props) => props.ballPosition.y}px;
  left: ${(props) => props.ballPosition.x}px;

  :hover {
    cursor: grab;
  }
`;

export const Button = styled.button`
  position: absolute;
  right: 0;
`;
